var clisttable;
var contentlist;

$(document).ready(function(){     

	    clisttable = $('#cist').dataTable( {bFilter: false, bInfo: false, "bLengthChange": false,
		      "aoColumnDefs": [
			  { 'bSortable': false, 'aTargets': [ 1,2 ] }
		      ]
		  });	  
}); 

$(document).ready(function(){     

	    contentlist = $('#contentlist').dataTable( {bFilter: false, bInfo: false, "bLengthChange": false,
		      "aoColumnDefs": [
			  { 'bSortable': false, 'aTargets': [ 4,5 ] }
		      ]
		  });	  
}); 

var realm = localStorage.getItem('realm');         // getting realm from web storage (local storage)
var token = localStorage.getItem('accessToken');  // getting access token from web storage (local storage)

//get all cloud connectors
function getcategorylist(){  
		var type         = $("#type").val();
                var sId          = $("#sId").val();
                console.log("inside get category list(type).... "+type);
	        console.log("inside get category list(sId).... "+sId);	        
	$.ajax({
		type: "GET",
		url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/'+type+'/infoMasterIndex/'+realm+'/'+sId+'/sip:'+sId+'@unaas.com',
		ContentType:'text/xml',
		crossDomain: true,
		processData: false,
		headers: {
			'Authorization': 'Bearer '+token
		},
		success: function (xml){
		var id;
	        var type;
	        var url;		
		$(xml).find("ibook\\:service").each(function(){
		$(this).find("N1\\:serviceId").each(function(){
		id = $(this).text();
		console.log("inside success(id).... "+id);		
		});
		$(this).find("N1\\:serviceType").each(function(){
		type = $(this).text();
		console.log("inside success(type).... "+type);		
		});
		$(this).find("N1\\:serviceUrl").each(function(){
		url = $(this).text();
		console.log("inside success(url).... "+url);
		clisttable.fnClearTable();
	        clisttable.fnAddData([	      
			id,
			type,
			url
		]);		
		});
		});
	},
        }).done(function(res){        
		console.log("inside get category list(done)....  "+res);
	}).error(function(){
		console.log("inside get category list(error).... ");
        }).complete(function(){
		console.log("inside get category list(completely).... ");
        });
        }
	
	//get all cloud connectors
function getallcontent(){  
		var solsiteId         = $("#solsId").val();
                var categoryId        = $("#ctgy").val();
                console.log("inside get all content list(solution&site id).... "+solsiteId);
	        console.log("inside get all content list(category id).... "+categoryId);
	        var caId = categoryId.toLowerCase();
		console.log("category Id.... "+caId);
                /*var body = "<?xml version=\"1.0\"?>"+
			   "<u:actGetWebAppList xmlns:u=\"urn:schemas:u-naas-com:service:info-service-"+caId+":1\">"+
			   "</u:actGetWebAppList>";*/
	$.ajax({
		type: "POST",
		url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/'+realm+'/sip:'+solsiteId+'@unaas.com/'+solsiteId+'/'+categoryId+'/getContentList',
		ContentType:'text/xml',
		crossDomain: true,
		processData: false,
		//data: body,
		headers: {
			'Authorization': 'Bearer '+token
		},
		success: function (xml){
		var id;
	        var nm;
	        var txturl;
	        var iconurl;
	        var url;
	        var mtype;
	        var pic;
		contentlist.fnClearTable();
		$(xml).find("web").each(function(){
		$(this).find("id").each(function(){
		id = $(this).text();
		console.log("inside success(id).... "+id);
		});
		$(this).find("name").each(function(){
		nm = $(this).text();
		console.log("inside success(name).... "+type);
		});
		$(this).find("textUrl").each(function(){
		txturl = $(this).text();
		console.log("inside success(textUrl).... "+type);
		});
		$(this).find("iconUrl").each(function(){
		iconurl = $(this).text();
		console.log("inside success(iconurl).... "+iconurl);
		/*url = atob(iconurl);
		pic = new Image();
                pic.src = ''+url;*/
	        pic = "<img title=\'"+nm+ "\' height =\'150\' width = \'150\' id='base64image' src='data:" +mType+ ";base64," +iconurl+ "\'></a><br>";
		//document.body.appendChild(pic);
		/*url = base64image(url);*/
		});
		$(this).find("mimeType").each(function(){
		mtype = $(this).text();
		console.log("inside success(mimeType).... "+mtype);
	        contentlist.fnAddData([	      
			id,
			nm,
			pic,
			txturl,
			mtype,
		'<button id="play" type="button" class="btn btn-primary">Play</button> &nbsp;'
	        ]);		
		});
		});
	},
        }).done(function(res){        
		console.log("inside get all content list(done)....  "+res);
	}).error(function(){
		console.log("inside get all content list(error).... ");
        }).complete(function(){
		console.log("inside get all content list(completely).... ");
        });
        }
	
	// to play
        $(document).on('click','#play',function(){
		var caName, curRow;
		curRow = $(this).parents('tr');
	        contenturl = $.trim($(curRow).find('td:nth-child(4)').text());
		console.log('contenturl.... '+contenturl);
	        play(contenturl);		
        })
	
	// to stop
        $(document).on('click','#stop',function(){
		var caName, curRow;
		curRow = $(this).parents('tr');
	        console.log('content url not found.... ');	        
        })
	
	function play(contenturl) {
		window.location = contenturl;     
	}