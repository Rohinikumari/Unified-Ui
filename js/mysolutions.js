var roleName;
var resource;
var solList;
var siteList;
var deviceList;

$(document).ready(function(){     

	    solList = $('#solutionlist').dataTable( {bFilter: false, bInfo: false, "bLengthChange": false,
		      "aoColumnDefs": [
			  { 'bSortable': false, 'aTargets': [ 1,2 ] }
		      ]
		  });	  
	    getroleNameForsolutionlist();  // get solution list
});

$(document).ready(function(){     

	    siteList = $('#sitelist').dataTable( {bFilter: false, bInfo: false, "bLengthChange": false,
		      "aoColumnDefs": [
			  { 'bSortable': false, 'aTargets': [ 1,2 ] }
		      ]
		  });	  
	    getroleNameForsitelist();  // get site list
});

$(document).ready(function(){     

	    deviceList = $('#devicelist').dataTable( {bFilter: false, bInfo: false, "bLengthChange": false,
		      "aoColumnDefs": [
			  { 'bSortable': false, 'aTargets': [ 1,2 ] }
		      ]
		  });	  
	    getroleNameFordevicelist();  // get device list
});

$(document).ready(function(){     

    roleName = $('#rolename').dataTable( {bFilter: false, bInfo: false, "bLengthChange": false,
              "aoColumnDefs": [
                  { 'bSortable': false, 'aTargets': [ 1,1 ] }
              ]
          });    
});

$(document).ready(function(){     

    resource = $('#resourcelist').dataTable( {bFilter: false, bInfo: false, "bLengthChange": false,
              "aoColumnDefs": [
                  { 'bSortable': false, 'aTargets': [ 1,2 ] }
              ]
          });    
}); 

var realm = localStorage.getItem('realm');         // getting realm from web storage (local storage)
var token = localStorage.getItem('accessToken');  // getting access token from web storage (local storage)
var refreshToken = localStorage.getItem('refreshToken');  // getting refreshToken from web storage (local storage)
var userId = localStorage.getItem('userId');         // getting user id from web storage (local storage)
var resourcety;
var resty;
var solid;
//helps to get the role name
function getrolenameofUser(){
	
   console.log("inside get role of a user....");
   var userId         = $("#userId").val();
   console.log("user id.... "+userId);
   $.ajax({
     type: "GET",
     url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/getUserRole/'+realm+'/'+userId,
     contentType:'text/xml',
     crossDomin: true,
     processData: false,
     headers: {
          'Authorization': 'Bearer '+token
	},
     success: function (xml) {
	$(xml).find("rolename").each(function() {
	$(this).find("role").each(function(){
	var rolename =  $(this).text();
	console.log("rolename.... "+rolename);
	 roleName.fnClearTable();        
            roleName.fnAddData([	      
	      	rolename             
           ]);
	});
	});                   
       },
       }).done(function(xml) {
	console.log("get role of a user response.... "+xml);	
	}).error(function() {
        console.log("get role of a user response failed....");
      }).complete(function() {
        console.log("get role of a user response completed....");
      });
}

//helps to get the user resources (based upon role)
function getuserresources(){
	
   console.log("inside get user resources based upon rolename....");
   var partnerId           = $("#partnerId").val();
   var rolenm              = $("#rolenm").val();
   console.log("partner id.... "+partnerId);
   console.log("role name.... "+rolenm);
	
   $.ajax({
     type: "GET",
     url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/getUserResources/'+realm+'/'+partnerId+'/'+rolenm,
     contentType:'text/xml',
     crossDomin: true,
     processData: false,
     headers: {
          'Authorization': 'Bearer '+token
	},
     success: function (xml){	
	var restype;	
	var resid;
	var read;
	var execute;
	var write;
	$(xml).find("resources").each(function() {
	$(this).find("resourcetype").each(function(){
	restype =  $(this).text();	
	console.log("resourcetype.... "+restype);	
	});
	$(this).find("resourceid").each(function(){
	resid =  $(this).text();
	console.log("resourceid.... "+resid);
	});	
	$(this).find("readpermission").each(function(){
	read   =  $(this).text();
	console.log("readpermission.... "+read);
	if(read == 'true')
	read= '<button id="start" type="button" class="btn btn-primary">true</button>';
	else
	read= '<button id="stop" type="button" class="btn btn-danger">false</button>';
	});
	$(this).find("executepermission").each(function(){
	execute   =  $(this).text();
	console.log("executepermission.... "+execute);
	});
	$(this).find("writepermissions").each(function(){
	write   =  $(this).text();
	console.log("writepermissions.... "+write);
        resource.fnAddData([
	        restype,
	        resid,
	        read,
		execute,
	        write		
           ]);		
	}); 	
	});	
       },
       }).done(function() {
	console.log("get user resources based upon rolename response.... ");   
	}).error(function() {
        console.log("get user resources based upon rolename response failed.... ");
      }).complete(function() {
        console.log("get user resources based upon rolename response completed....");
      });
}

// to access the registered solution
$(document).on('click','#start',function(){
		var caName, curRow;
		curRow = $(this).parents('tr');
	        resourceType = $.trim($(curRow).find('td:nth-child(1)').text());
		resourceId = $.trim($(curRow).find('td:nth-child(2)').text());
	        console.log('resourceType.... '+resourceType);
		console.log('resourceId.... '+resourceId);
	        if(resourceType == "SOLUTION"){
		console.log("inside solution.... ");
		accessmobilewebsiteSolutiontrue(resourceId);
		}else if (resourceType == "SITE"){
		console.log("inside site.... ");
		accessmobilewebsiteSitetrue(resourceId);
		}else{
		console.log("resource type not found.... ");	
		}
})


// to access mobile website of solution
function accessmobilewebsiteSolutiontrue(resourceId){
	   
	   console.log("inside access mobile website of solutiom (true).... ");	   
	   var privateid = resourceId.toLowerCase();
	   console.log("privateid client====> "+privateid); 
	   window.location.href = pmwPath+"/MW/"+resourceId+"/"+privateid+"personalise/index.html";
}

// to get the parent id of the site mobile website of site
function accessmobilewebsiteSitetrue(resourceId){
	   
	console.log("inside access mobile website of site (true).... ");
	// get parent id
	$.ajax({
				type: "GET",
				url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/getParent/'+realm+'/'+resourceId,
				contentType: "text/xml",
				crossDomain: true,
				processData: false,
				headers: {
				  'Authorization': 'Bearer '+token
				},
				}).done(function(respData) {
				
				console.log("solution registration for registration (done).... "+respData);
				$(respData).find("parent").each(function() {
				$(this).find("parentId").each(function(){
				var solutionId = $(this).text();
				accessmobilewebsitetrue(solutionId, resourceId);
				}); });				
				}).error(function() {
				console.log("solution registration for registration (error).... ");
				}).complete(function() {
				console.log("solution registration for registration (completed).... ");
				});
		}


// to access mobile website of site
function accessmobilewebsitetrue(solutionId, resourceId){
	   
	   console.log("inside access mobile website of site (true).... ");
	   var privateid = resourceId.toLowerCase();
	   console.log("privateid client====> "+privateid); 
	   window.location.href = pmwPath+"/MW/"+solutionId+"/"+privateid+"personalise/index.html";
}
      
//helps to get the role name
function getroleNameForsolutionlist(){
	
		console.log("inside get role of a user....");
      $.ajax({
		     type: "GET",
		     url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/getUserRole/'+realm+'/'+userId,
		     contentType:'text/xml',
		     crossDomin: true,
		     processData: false,
		     headers: {
			  'Authorization': 'Bearer '+token
			},
		     success: function (xml) {
			$(xml).find("rolename").each(function() {
			$(this).find("role").each(function(){
			var rolename =  $(this).text();
			console.log("rolename.... "+rolename);
		        getsolutionlist(rolename);		
			});
			});                   
		       },
       }).done(function(xml) {
	console.log("get role of a user response.... "+xml);	
	}).error(function() {
        console.log("get role of a user response failed....");
      }).complete(function() {
        console.log("get role of a user response completed....");
      });
}

//helps to get the user resources (based upon role)
function getsolutionlist(rolename){
	
   console.log("inside get user resources based upon rolename....");	
   $.ajax({
     type: "GET",
     url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/getUserResources/'+realm+'/'+realm+'/'+rolename,
     contentType:'text/xml',
     crossDomin: true,
     processData: false,
     headers: {
          'Authorization': 'Bearer '+token
	},
     success: function (xml){	
	var resid;
	var read;
	var execute;
	var write;
	$(xml).find("resources").each(function() {
	$(this).find("resourcetype").each(function(){
	resourcety =  $(this).text();	
	console.log("resourcetype.... "+resourcety);	
	});
	if(resourcety == 'SOLUTION'){
	$(this).find("resourceid").each(function(){
	resid =  $(this).text();
	console.log("resourceid.... "+resid);
	});	
	$(this).find("readpermission").each(function(){
	read   =  $(this).text();
	console.log("readpermission.... "+read);
	if(read == 'true')
	read= '<button id="true" type="button" class="btn btn-primary">true</button>';
	else
	read= '<button id="false" type="button" class="btn btn-danger">false</button>';
	});
	$(this).find("executepermission").each(function(){
	execute   =  $(this).text();
	console.log("executepermission.... "+execute);
	});
	$(this).find("writepermissions").each(function(){
	write   =  $(this).text();
	console.log("writepermissions.... "+write);
        solList.fnAddData([
	        resid,
	        read,
		execute,
	        write		
           ]);		
	}); 	
        }else{
	console.log("not found.... ");
	}});	
       },
       }).done(function() {
	console.log("get user resources based upon rolename response.... ");   
	}).error(function() {
        console.log("get user resources based upon rolename response failed.... ");
      }).complete(function() {
        console.log("get user resources based upon rolename response completed....");
      });
}

// to access the registered solution
$(document).on('click','#true',function(){
		var caName, curRow, sId;
		curRow = $(this).parents('tr');
	       	sId = $.trim($(curRow).find('td:nth-child(1)').text());
	        console.log('solutionId.... '+sId);
	        accessmobilewebsiteSolutiontrue(sId);                	
})


// to access mobile website of solution
function accessmobilewebsiteSolutiontrue(sId){
	   
	   console.log("inside access mobile website of solutiom (true).... ");	   
	   var privateid = sId.toLowerCase();
	   console.log("privateid client====> "+privateid); 
	   window.location.href = pmwPath+"/MW/"+sId+"/"+privateid+"personalise/index.html";
}


//helps to get the role name
function getroleNameForsitelist(){
	
		console.log("inside get role of a user....");
      $.ajax({
		     type: "GET",
		     url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/getUserRole/'+realm+'/'+userId,
		     contentType:'text/xml',
		     crossDomin: true,
		     processData: false,
		     headers: {
			  'Authorization': 'Bearer '+token
			},
		     success: function (xml) {
			$(xml).find("rolename").each(function() {
			$(this).find("role").each(function(){
			var rolename =  $(this).text();
			console.log("rolename.... "+rolename);
		        getsitelist(rolename);		
			});
			});                   
		       },
       }).done(function(xml) {
	console.log("get role of a user response.... "+xml);	
	}).error(function() {
        console.log("get role of a user response failed....");
      }).complete(function() {
        console.log("get role of a user response completed....");
      });
}

//helps to get the user resources (based upon role)
function getsitelist(rolename){
	
   console.log("inside get user resources based upon rolename....");	
   $.ajax({
     type: "GET",
     url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/getUserResources/'+realm+'/'+realm+'/'+rolename,
     contentType:'text/xml',
     crossDomin: true,
     processData: false,
     headers: {
          'Authorization': 'Bearer '+token
	},
     success: function (xml){	
	var resid;
	//var solid;
	var read;
	var execute;
	var write;
	$(xml).find("resources").each(function() {
	$(this).find("resourcetype").each(function(){
	resty =  $(this).text();	
	console.log("resourcetype.... "+resty);	
	});	
	if(resty == "SITE"){
		console.log("inside site.... ");
		$(this).find("resourceid").each(function(){
			resid =  $(this).text();
			console.log("resourceid.... "+resid);
			});	
			$(this).find("readpermission").each(function(){
			read   =  $(this).text();
			console.log("readpermission.... "+read);
			if(read == 'true')
			read= '<button id="access" type="button" class="btn btn-primary">true</button>';
			else
			read= '<button id="noaccess" type="button" class="btn btn-danger">false</button>';
			});
			$(this).find("executepermission").each(function(){
			execute   =  $(this).text();
			console.log("executepermission.... "+execute);
			});
			$(this).find("writepermissions").each(function(){
			write   =  $(this).text();
			console.log("writepermissions.... "+write);
			siteList.fnAddData([
				resid,
				read,
				execute,
				write		
			   ]);		
			}); 	
			
	}else if(resty == "SOLUTION"){
		console.log("inside solution.... ");
		$(this).find("resourceid").each(function(){
			solid =  $(this).text();
			console.log("resourceid of solution.... "+solid);
			});			
	}else{
	console.log("type not found.... ");	
	}});		
       },
       }).done(function() {
	console.log("get user resources based upon rolename response.... ");   
	}).error(function() {
        console.log("get user resources based upon rolename response failed.... ");
      }).complete(function() {
        console.log("get user resources based upon rolename response completed....");
      });
}

// to access the registered solution
$(document).on('click','#access',function(){
		var caName, curRow, siteId;
		curRow = $(this).parents('tr');
	       	siteId = $.trim($(curRow).find('td:nth-child(1)').text());
	        console.log('siteId.... '+siteId);
	        accessmbwbsite(siteId);                	
})

function accessmbwbsite(siteId){
	   
	   console.log("inside access mobile website of site (true).... ");
	$.ajax({
				type: "GET",
				url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/getParent/'+realm+'/'+siteId,
				contentType: "text/xml",
				crossDomain: true,
				processData: false,
				headers: {
				  'Authorization': 'Bearer '+token
				},
				}).done(function(respData) {				
				console.log("solution registration for registration (done).... "+respData);
				$(respData).find("parent").each(function() {
				$(this).find("parentId").each(function(){
				var solutionId = $(this).text();
				accessmobwbst(solid, siteId);
				}); });				
				}).error(function() {
				console.log("solution registration for registration (error).... ");
				}).complete(function() {
				console.log("solution registration for registration (completed).... ");
				});
}

// to access mobile website of site
function accessmobwbst(solid, siteId){
	   
	   console.log("inside access mobile website of site (true).... "+solid);
	   var privateid = siteId.toLowerCase();
	   console.log("privateid client====> "+privateid); 
	   window.location.href = pmwPath+"/MW/"+solid+"/"+privateid+"personalise/index.html";
}

//helps to get the role name
function getroleNameFordevicelist(){
	
		console.log("inside get role of a user....");
      $.ajax({
		     type: "GET",
		     url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/getUserRole/'+realm+'/'+userId,
		     contentType:'text/xml',
		     crossDomin: true,
		     processData: false,
		     headers: {
			  'Authorization': 'Bearer '+token
			},
		     success: function (xml) {
			$(xml).find("rolename").each(function() {
			$(this).find("role").each(function(){
			var rolename =  $(this).text();
			console.log("rolename.... "+rolename);
		        getdevicelist(rolename);		
			});
			});                   
		       },
       }).done(function(xml) {
	console.log("get role of a user response.... "+xml);	
	}).error(function() {
        console.log("get role of a user response failed....");
      }).complete(function() {
        console.log("get role of a user response completed....");
      });
}

//helps to get the user resources (based upon role)
function getdevicelist(rolename){
	
   console.log("inside get user resources based upon rolename....");	
   $.ajax({
     type: "GET",
     url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/getUserResources/'+realm+'/'+realm+'/'+rolename,
     contentType:'text/xml',
     crossDomin: true,
     processData: false,
     headers: {
          'Authorization': 'Bearer '+token
	},
     success: function (xml){	
	var did;
	var rsty;
	var read;
	var execute;
	var write;
	$(xml).find("resources").each(function() {
	$(this).find("resourcetype").each(function(){
	rsty =  $(this).text();	
	console.log("resourcetype.... "+rsty);	
	});	
	if(rsty == "DEVICE"){
		console.log("inside device.... ");
		$(this).find("resourceid").each(function(){
			did =  $(this).text();
			console.log("resourceid.... "+did);
			});	
			$(this).find("readpermission").each(function(){
			read   =  $(this).text();
			console.log("readpermission.... "+read);
			if(read == 'true')
			read= '<button id="access" type="button" class="btn btn-primary">true</button>';
			else
			read= '<button id="noaccess" type="button" class="btn btn-danger">false</button>';
			});
			$(this).find("executepermission").each(function(){
			execute   =  $(this).text();
			console.log("executepermission.... "+execute);
			});
			$(this).find("writepermissions").each(function(){
			write   =  $(this).text();
			console.log("writepermissions.... "+write);
			deviceList.fnAddData([
				did,
				read,
				execute,
				write		
			   ]);		
			}); 	
			
	}else{
	console.log("type not found.... ");	
	}});		
       },
       }).done(function() {
	console.log("get user resources based upon rolename response.... ");   
	}).error(function() {
        console.log("get user resources based upon rolename response failed.... ");
      }).complete(function() {
        console.log("get user resources based upon rolename response completed....");
      });
}

// to access the registered solution
$(document).on('click','#access',function(){
		var caName, curRow, siteId;
		curRow = $(this).parents('tr');
	       	siteId = $.trim($(curRow).find('td:nth-child(1)').text());
	        console.log('siteId.... '+siteId);
	        accessmbwbsite(siteId);                	
})