var nodetable;
var deviceList;
var deviceAllList;
var getSpts;
var getSiteSp;
var getAllSp;

$(document).ready(function(){
  nodetable = $('#nodelist').dataTable( {bFilter: false, bInfo: false, "bLengthChange": false,
              "aoColumnDefs": [
                  { 'bSortable': false, 'aTargets': [ 4,5 ] }
              ]
          });
});

$(document).ready(function(){
  deviceList = $('#devicelist').dataTable( {bFilter: false, bInfo: false, "bLengthChange": false,
              "aoColumnDefs": [
                  { 'bSortable': false, 'aTargets': [ 4,5 ] }
              ]
          });
});

$(document).ready(function(){
  deviceAllList = $('#devicealllist').dataTable( {bFilter: false, bInfo: false, "bLengthChange": false,
              "aoColumnDefs": [
                  { 'bSortable': false, 'aTargets': [ 4,5 ] }
              ]
          });
});

$(document).ready(function(){
  getSpts = $('#getSptslist').dataTable( {bFilter: false, bInfo: false, "bLengthChange": false,
              "aoColumnDefs": [
                  { 'bSortable': false, 'aTargets': [ 0,1 ] }
              ]
          });
});

$(document).ready(function(){
  getSiteSp = $('#getSiteSpotlist').dataTable( {bFilter: false, bInfo: false, "bLengthChange": false,
              "aoColumnDefs": [
                  { 'bSortable': false, 'aTargets': [ 2,3 ] }
              ]
          });
});

$(document).ready(function(){
  getAllSp = $('#getAllSpotlist').dataTable( {bFilter: false, bInfo: false, "bLengthChange": false,
              "aoColumnDefs": [
                  { 'bSortable': false, 'aTargets': [ 2,3 ] }
              ]
          });
});


var realm = localStorage.getItem('realm');         // getting realm from web storage (local storage)
var token = localStorage.getItem('accessToken');  // getting access token from web storage (local storage)

function getSolutionDeviceInfo(){
   var deviceid         = $("#deviceid").val();
   var solutionid       = $("#solutionid").val();
   var category         = $("#type").val();
   $.ajax({
     type: "GET",
     url: 'http://'+dmbackendAddr+'/DMBackEndGw/DMDevice/solutionDeviceInfo/'+realm+'/'+solutionid+'/'+deviceid+'/'+category,
     contentType:'application/json',
     crossDomin: true,
     processData: false,
     headers: {
          'Authorization': 'Bearer '+token
	},
     success: function (json) {
            nodetable.fnClearTable();        
            nodetable.fnAddData([	      
	      json.nodes.nodeId,
	      json.nodes.nodeType, 
	      json.nodes.category, 
	      json.nodes.udn, 
	      json.nodes.friendlyName,            
             '<span class=""></span> &nbsp;',
           ]);         
       }, 
       }).done(function(json) {
	var data = JSON.stringify(json);                      // getting json data
	console.log("INVENTORY DEVICES ... "+data);   
	})
      .error(function() {
        console.log("FAIL IN GETTING INVENTORY DEVICES :");
      })
      .complete(function() {
        console.log("STATUS UPDATE COMPLETED:");
      });
}

function getDevices(){
	
   var solid       = $("#solid").val();
     $.ajax({
     type: "GET",
     url: 'http://'+dmbackendAddr+'/DMBackEndGw/DMDevice/getSolutionDevices/'+realm+'/'+solid,
     contentType:'application/json', 
     crossDomain: true,
     processData: false,
     headers: {
          'Authorization': 'Bearer '+token
	},  
     success: function (json) {
	     console.log(json.nodes.length);
             deviceList.fnClearTable();
    for(i = 0; i<json.nodes.length; i++){  
	      deviceList.fnAddData([
	      json.nodes[i].nodeId,
	      json.nodes[i].category,	     
	     '<span class=""></span> &nbsp;',
           ]);
        }        
       },       
     }).done(function(json) {
	var data = JSON.stringify(json);                      // getting json data
	console.log("solution devices ... "+data);
      }).error(function() {
       console.log("FAIL IN GETTING solution devices... ");      
       }).complete(function() {
       console.log("STATUS UPDATE COMPLETED:");
      });
} 

function getAllDeviceInfo(){
   var solutnId       = $("#solutnId").val();
     $.ajax({
     type: "GET",
     url:  'http://'+dmbackendAddr+'/DMBackEndGw/DMDevice/allSolutionDevicesInfo/'+realm+'/'+solutnId,
     contentType:'application/json', 
     crossDomain: true,
     processData: false,
     headers: {
          'Authorization': 'Bearer '+token
	},
     success: function (json) {
	     console.log(json.nodes.length);
              deviceAllList.fnClearTable();
           for(i = 0; i<json.nodes.length; i++){	     
	      deviceAllList.fnAddData([
	     json.nodes[i].nodeId,		   
	     json.nodes[i].nodeType,
             json.nodes[i].category,
	     json.nodes[i].udn,		   
	     json.nodes[i].friendlyName,          	     
	     '<span class=""></span> &nbsp;',
           ]);
        }         
       },       
     }).done(function(json) {
	var data = JSON.stringify(json);                      // getting json data
	console.log("ALL INVENTORY DEVICES INFO ... "+data);
      }).error(function() {
       console.log("FAIL IN GETTING ALL INVENTORY DEVICES INFO :");      
       }).complete(function() {
       console.log("STATUS UPDATE COMPLETED:");
      });
}

function mapDevice(){
    var pId        = $('#pId').val();
    var sId        = $('#sId').val();
    var category   = $('#typ').val()
    var did        = $("#did").val();   

    console.log("Category...... ==> "+category);
   var body = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+
		"<device>"+	
			"<partnerid>"+pId+"</partnerid>"+
			"<solutionid>"+sId+"</solutionid>"+
			"<siteid>null</siteid>"+
			"<deviceid>"+did+"</deviceid>"+
			"<catname>"+category+"</catname>"+
			"<modelId>null</modelId>"+
		"</device>";
   $.ajax({
     type: "POST",
     url: 'http://'+dmbackendAddr+'/DMBackEndGw/DMDevice/mapdevice/'+realm+'/'+pId+'/'+sId+'/'+did+'/'+category,
     contentType:'text/xml',
     data:body,
     crossDomain: true,
     processData: false,
     headers: {
          'Authorization': 'Bearer '+token
	},
     success: function () {
        console.log('STATUS UPDATE SUCCESS:');
       },
     }).done(function(plain) {
	alert("INVENTORY DEVICE MAPPED.... "+plain);
        console.log("INVENTORY DEVICE MAPPED : "+plain);
      }).error(function() {
        console.log("INVENTORY DEVICE MAPPING FAILED:");
      }).complete(function() {
        console.log("STATUS UPDATE COMPLETED:");
      });      
}

function unmapDevice(){
    var partnId          = $('#partnId').val();
    var solnId           = $('#solnId').val();
    var category         = $('#tpe').val();
    var devid            = $("#devid").val();   
    console.log("category.... "+category);
     $.ajax({
     type: "POST",
     url: 'http://'+dmbackendAddr+'/DMBackEndGw/DMDevice/unmapdevice/'+realm+'/'+partnId+'/'+solnId+'/'+devid+'/'+category,
     contentType:'text/plain',
     data:'',
     crossDomain: true,
     processData: false,
     headers: {
          'Authorization': 'Bearer '+token
	},
       success: function (plain) {
        console.log('STATUS UPDATE SUCCESS:' +plain);
       },
     }).done(function(plain) {
	alert("INVENTORY DEVICE UNMAPPED.... "+plain);
        console.log("INVENTORY DEVICE UNMAPPED : "+plain);
      }).error(function() {
        console.log("INVENTORY DEVICE UNMAPPING FAILED:");
      }).complete(function() {
        console.log("STATUSUPDATE COMPLETED:");
      });      
}

/* ................................       SPOT   API's     .......................................*/

function addSpot(){
    var siteId                           = $('#siteId').val();
    var spotId                           = $("#spotId").val();
    var spotfriendlyname                 = $("#spotfriendlyname").val();
    var spotownername                    = $("#spotownername").val();
    var latitude                         = $("#latitude").val();
    var violations                       = $("#violations").val();
    var usetime                          = $("#usetime").val();
    var altitude                         = $("#altitude").val();
    var cost                             = $("#cost").val();
    var longitude                        = $("#longitude").val();
    var usagetime                        = $("#usagetime").val();
    var lot                              = $("#lot").val();
    var layoutname                       = $("#layoutname").val();
    var zone                             = $("#zone").val();
    
    var body = "<?xml version=\"1.0\"?>"+
		"<spot>"+	
			"<siteid>"+siteId+"</siteid>"+
			"<layoutGrp>"+
					"<numLevels>2</numLevels>"+
					"<l1>"+layoutname+"</l1>"+
					"<l2>"+zone+"</l2>"+
			"</layoutGrp>"+
			"<spotId>"+spotId+"</spotId>"+
			"<cost>"+cost+"</cost>"+
			"<mimetype>null</mimetype>"+
			"<width>null</width>"+
			"<height>null</height>"+
			"<depth>null</depth>"+
			"<url>null</url>"+
			"<imagedata>null</imagedata>"+
			"<latitude>"+latitude+"</latitude>"+
			"<longitude>"+longitude+"</longitude>"+
			"<altitude>"+altitude+"</altitude>"+
			"<usagetime>"+usagetime+"</usagetime>"+
			"<usetime>"+usetime+"</usetime>"+
			"<violations>"+violations+"</violations>"+
			"<lot>"+lot+"</lot>"+
			"<spotOwnerName>"+spotownername+"</spotOwnerName>"+
			"<spotFriendlyName>"+spotfriendlyname+"</spotFriendlyName>"+
		"</spot>";

   $.ajax({
     type: "POST",
     url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/addSpot/'+realm+'/'+siteId+'/'+spotId,
     contentType:'text/xml',
     crossDomain: true,
     processData: false,
     headers: {
          'Authorization': 'Bearer '+token
	},
     data: body,
     success: function() {
        console.log('STATUS UPDATE SUCCESS:');
       },
     }).done(function(plain) {
        console.log("SPOT ADDED: "+plain);
      })
      .error(function() {
         console.log("SPOT ADDITION FAILED:");
      })
      .complete(function() {
        console.log("SPOT STATUS UPDATE COMPLETED:");
      });
}

function getSpotInfo(){  
   var spotId         = $("#sptId").val();
   $.ajax({
     type: "GET",
     url:  'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/spotInfo/'+realm+'/'+spotId,
     contentType:'application/json',
     crossDomain: true,
     processData: false,
     headers: {
          'Authorization': 'Bearer '+token
	},
     success: function (json) {
     nodetable.fnClearTable();        
            nodetable.fnAddData([
	      json.spot.spotId,
	      json.spot.spotOwnerName, 
	      json.spot.spotfriendlyName, 
	      json.spot.latitude, 
	      json.spot.longitude,            
	      json.spot.altitude,            
             '<span class=""></span> &nbsp;',
           ]);         
       },
     }).done(function(json) {
	var data = JSON.stringify(json);             // getting json data
        console.log("SPOT INFO ... "+data); 
      })
      .error(function() {
        console.log("FAIL IN GETTING SPOT INFO :");
      })
      .complete(function() {
        console.log("STATUS UPDATE COMPLETED:");
      })   
}


function getSiteSpotInfo(){
  
  var steId         = $("#steId").val();   
  var spId         = $("#spId").val();
  console.log(steId);
  console.log(spId);
   $.ajax({
     type: "GET",
     url:  'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/siteSpotInfo/'+realm+'/'+steId+'/'+spId,
     contentType:'application/json',
     crossDomain: true,
     processData: false,
     headers: {
          'Authorization': 'Bearer '+token
	},
     success: function (json) {
     getSiteSp.fnClearTable();        
            getSiteSp.fnAddData([
	      json.spot.spotId,
	      json.spot.spotfriendlyName, 
	      json.spot.spotOwnerName,	                
             '<span class=""></span> &nbsp;',
           ]);         
       },
     }).done(function(json) {
	var data = JSON.stringify(json);             // getting json data
        console.log("SPOT INFO ... "+data); 
      })
      .error(function() {
        console.log("FAIL IN GETTING SPOT INFO :");
      })
      .complete(function() {
        console.log("STATUS UPDATE COMPLETED:");
      }) 
}


function getSpots(){
   var siteId       = $("#stid").val();
     $.ajax({
     type: "GET",
     url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/getSpots/'+realm+'/'+siteId,
     contentType:'application/json', 
     crossDomain: true,
     processData: false,
     headers: {
          'Authorization': 'Bearer '+token
	}, 
     success: function (json) {
	     console.log(json.spots.length);
              getSpts.fnClearTable();

 for(i = 0; i<json.spots.length; i++){	     
	      getSpts.fnAddData([
	     json.spots[i].spotId,
	     json.spots[i].spotfriendlyName,      	     
	     '<span class=""></span> &nbsp;',
           ]);
        }         
       },       
     }).done(function(json) {
	var data = JSON.stringify(json);                      // getting json data
	console.log("Spots ... "+data);
      }).error(function() {
       console.log("FAIL IN GETTING SPOTS :");      
       }).complete(function() {
       console.log("STATUS UPDATE COMPLETED:");
      });
}


function getAllSpots(){
   var sid       = $("#sid").val();
     $.ajax({
     type: "GET",
     url:  'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/allSiteSpotsInfo/'+realm+'/'+sid,
     contentType:'application/json', 
     crossDomain: true,
     processData: false,
     headers: {
          'Authorization': 'Bearer '+token
	},  
     success: function (json) {
	     console.log(json.spots.length);
              getAllSp.fnClearTable();

    for(i = 0; i<json.spots.length; i++){	     
	      getAllSp.fnAddData([
	     json.spots[i].spotId,
	     json.spots[i].spotfriendlyName,     	     
	     json.spots[i].spotOwnerName,     	     
	     '<span class=""></span> &nbsp;',
           ]);
        }         
       },       
     }).done(function(json) {
	var data = JSON.stringify(json);                      // getting json data
	console.log("ALL SPOTS ... "+data);
      }).error(function() {
       console.log("FAIL IN GETTING ALL SPOTS :");      
       }).complete(function() {
       console.log("STATUS UPDATE COMPLETED:");
      });
}


function mapSpot(){
	
    var siteId         = $("#sI").val();   
    var spotId         = $("#sp").val();
    var deviceId       = $("#devId").val();   
    var category       = $("#catype").val();   
      
   $.ajax({
     type: "POST",
     url:  'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/mapSpot/'+realm+'/'+siteId+'/'+spotId+'/'+deviceId,
     contentType:'text/plain',
     data:category,
     crossDomain: true,
     processData: false,
     headers: {
          'Authorization': 'Bearer '+token
	}, 
     success: function () {
        console.log('STATUS UPDATE SUCCESS:');
       },
     }).done(function(plain) {
	alert(plain);
        console.log("SPOT MAPPED : "+plain);
      }).error(function() {
        console.log("SPOT MAPPING FAILED:");
      }).complete(function() {
        console.log("STATUS UPDATE COMPLETED:");
      });      
}


function unmapSpot(){
    var siteId           = $("#sd").val();   
    var spotId           = $("#spotd").val();
    var deviceId         = $("#dId").val();   
    var category         = $("#caty").val();   
	
     $.ajax({
     type: "POST",
     url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/unmapSpot/'+realm+'/'+siteId+'/'+spotId+'/'+deviceId,
     contentType:'text/plain',
     data:category,
     crossDomain: true,
     processData: false,
     headers: {
          'Authorization': 'Bearer '+token
      },
       success: function () {
        console.log('STATUS UPDATE SUCCESS:');
       },
     }).done(function(data) {
        console.log("SPOT UNMAPPED : "+data);
      }).error(function() {
        console.log("SPOT UNMAPPING FAILED:");
      }).complete(function() {
        console.log("STATUSUPDATE COMPLETED:");
      });      
}

function updateSpot(){
	
    var siteId                           = $('#stI').val();
    var spotId                           = $("#stiD").val();
    var spotfriendlyname                 = $("#spotfrdlyname").val();
    var spotownername                    = $("#sptownrname").val();
    var latitude                         = $("#ltde").val();
    var violations                       = $("#violatns").val();
    var usetime                          = $("#usetm").val();
    var altitude                         = $("#altude").val();
    var cost                             = $("#cst").val();
    var longitude                        = $("#longitde").val();
    var usagetime                        = $("#usgtime").val();
    var lot                              = $("#lt").val();
        
    var body = "<?xml version=\"1.0\"?>"+
		"<spot>"+			
			"<latitude>"+latitude+"</latitude>"+
			"<longitude>"+longitude+"</longitude>"+
			"<altitude>"+altitude+"</altitude>"+
			"<usagetime>"+usagetime+"</usagetime>"+
			"<usetime>"+usetime+"</usetime>"+
			"<violations>"+violations+"</violations>"+
			"<lot>"+lot+"</lot>"+
			"<cost>"+cost+"</cost>"+
			"<spotOwnerName>"+spotownername+"</spotOwnerName>"+
			"<spotFriendlyName>"+spotfriendlyname+"</spotFriendlyName>"+
		"</spot>";  
  
  $.ajax({
     type: "POST",
     url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/updateSpot/'+realm+'/'+siteId+'/'+spotId,
     contentType:'text/xml',     
     crossDomain: true,
     processData: false,      
     headers: {
          'Authorization': 'Bearer '+token
      },
     data: body,
     success: function () {
        console.log('SPOT UPDATED SUCCESS:');
       },
     }).
     done(function(plain) {
        console.log("SPOT UPDATED DONE: " +plain);
      })
      .error(function() {
        console.log("SPOT UPDATED FAILED:");    
      })
      .complete(function() {
        console.log("SPOT STATUS UPDATE COMPLETED:");
      });
} 



function deleteSpot(){
  var siteId         = $("#sitd").val();   
  var spotId         = $("#spoId").val();   
  
  $.ajax({
     type: "DELETE",
     url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/deleteSpot/'+realm+'/'+siteId+'/'+spotId,
     contentType:'',
     crossDomain: true,
     processData: false,
     headers: {
          'Authorization': 'Bearer '+token
      },
     success: function () {
        console.log('SPOT DELETED SUCCESS:');
       },
     }).
     done(function() {
        console.log("SPOT DELETED DONE:");
      })
      .error(function() {
        console.log("SPOT DELETION FAILED:");    
      })
      .complete(function() {
        console.log("SPOT STATUS UPDATE COMPLETED:");
      });
} 



/* ................................       LOT   API's     .......................................*/



function addLot(){
  var lotId         = $("#lotId").val(); 
  var parentId      = $("#parentId").val();	
  var emailId       = $("#emailId").val();  
  var phoneNumber   = $("#phoneNumber").val();
  
  $.ajax({
     type: "POST",
     url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/createLot/'+realm+"/"+lotId,
     contentType:'text/plain',
     crossDomain: true,
     processData: false,
     data:'',
     headers: {
          'Authorization': 'Bearer '+token
      },
     success: function () {
        //console.log('SPOT ADDED SUCCESS:');
       },
     }).
     done(function() {
       // console.log("SPOT ADDED DONE:");
	activateLot(lotId, parentId, emailId, phoneNumber);
      })
      .error(function() {
       // console.log("SPOT DELETION FAILED:");    
      })
      .complete(function() {
        //console.log("SPOT STATUS UPDATE COMPLETED:");
      });
}

function activateLot(lotId, parentId, emailId, phoneNumber){
  
 var xml="<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
	+"<activate>"+
	"<product id='"+lotId+"' type='gateway' parent='"+parentId+"' domain='IOT,COM'/>"+     
	"<name organization='"+lotId+"'/>"+
	"<location country='country'/>"+
	"<info e-mail='"+emailId+"' mobile='"+phoneNumber+"' landline='"+phoneNumber+"'/>"+
	"</activate>";
	
  $.ajax({
     type: "POST",
     url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/activateLot/'+realm,
     contentType:'text/xml',
     crossDomain: true,
     processData: false,     
     headers: {
          'Authorization': 'Bearer '+token
      },
      data: xml,
     success: function () {
        console.log('ACTIVATE LOT SUCCESS:');
       },
     }).
     done(function(plain) {
        console.log("ACTIVATE LOT DONE: "+plain);
      })
      .error(function() {
        console.log("ACTIVATE LOT FAILED:");    
      })
      .complete(function() {
        console.log("STATUS UPDATE COMPLETED:");
      });
}

function getLots(){
     var siteId         = $("#siteId").val(); 
    
  $.ajax({
     type: "GET",
     url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/getLots/'+realm+'/'+siteId,
     contentType:'application/json',
     crossDomain: true,
     processData: false,
     headers: {
          'Authorization': 'Bearer '+token
      },      
      success: function (json) {
	    nodetable.fnClearTable();
            for(i = 0; i<json.lots.length; i++){	      
            nodetable.fnAddData([
	      json.lots[i].lotId,
	      json.lots[i].activationCode,
	      json.lots[i].productType, 
	      json.lots[i].accessType,	               
             '<span class=""></span> &nbsp;',
           ]); 
	  }
        console.log("GET LOTS RESPONSE" +json);	     
       },
     }).
     done(function(json) {
	var response = JSON.stringify(json);
        console.log("GET LOTS DONE: " +response);
     })
      .error(function() {
        console.log("GET LOTS FAILED:");    
      })
      .complete(function() {
        console.log("GET LOTS COMPLETED:");
      });
}

function updateLot(){
	
	var lotId              = $("#lId").val();
	var activationCode     = $("#activatnCode").val();
	var latitude           = $("#ltde").val();
	var altitude           = $("#alt").val();
	var ipAddress          = $("#ipAdd").val();
	var division           = $("#divisn").val();
	var subdivision        = $("#subdivisn").val();
	var websiteurl         = $("#websturl").val();
	var manager            = $("#mnger").val();
	var industrytype       = $("#industrytype").val();
	var metering           = $("#metring").val();
	var currency           = $("#currcy").val();
	var numberoffloors     = $("#numbroffloors").val();
	var violations         = $("#violatns").val();
	var rulesconfiguration = $("#rulesconfigtion").val();
	var region             = $("#regn").val();
	var stdcode            = $("#stdcde").val();
	var countryname        = $("#countrynm").val();
	var displayname        = $("#displayname").val();
	var longitude          = $("#lngtude").val();
	var appName            = $("#appNm").val();
	var appId              = $("#appId").val();
	var portAddress        = $("#portAddress").val();
	var postalcode         = $("#postalcode").val();
	var url                = $("#urlAddr").val();
	var topic              = $("#tpc").val();
	var key                = $("#ky").val();
	var timezone           = $("#timezone").val();
	var citycode           = $("#citycode").val();
	var cityname           = $("#cityname").val();
	var countrycode        = $("#countrycode").val();
	var locality           = $("#localty").val();
	var area               = $("#ara").val();
	var streetname         = $("#streetname").val();
	var streetnumber       = $("#streetnumber").val();
	var gender             = $("#gnder").val();
	var mobilenumber       = $("#mobilenumber").val();
	
	var xml="<?xml version=\"1.0\"?>"
		+"<hotelemp-profile>" +
				"<display-name>"+displayname+"</display-name>"
		+"<department>" +
				"<division>"+division+"</division>" +
				"<subdivision>"+subdivision+"</subdivision>" +
				"</department>"
		+"<designation>unknown</designation>"
		+"<manager>" +
				"<uri>unknown</uri>" +
				"</manager>"
		+"<image>" +
				"<imagedata>null</imagedata>" +
				"<image_height>null</image_height>"+
				"<image_width>null</image_width>" +
				"<image_type>null</image_type>"+
				"</image>"
		+"<contact-addresses>" +
				"<contact-addr>"+mobilenumber+"</contact-addr>" +
				"</contact-addresses>" +
				"<gender>"+gender+"</gender>"	
		+"<lotdetails>" +
				"<metering>"+metering+"</metering>"+
				"<currency>"+currency+"</currency>"+
				"<floors>"+numberoffloors+"</floors>"+
				"<facility>unknown</facility>"+
				"<violation>"+violations+"</violation>"+
				"<rules>"+rulesconfiguration+"</rules>"+
				"</lotdetails>" 
		+"<appdetails>" +
				"<appid>"+appId+"</appid>"+
				"<appname>"+appName+"</appname>"+
				"<ipaddress>"+ipAddress+"</ipaddress>"+
				"<portaddress>"+portAddress+"</portaddress>"+
				"<url>"+url+"</url>"+
				"<topic>"+topic+"</topic>"+
				"<appkey>"+key+"</appkey>"+
				"</appdetails>"   
		+"<geolocation>" +
				"<latitude>"+latitude+"</latitude>"+
				"<longitude>"+longitude+"</longitude>"+
				"<altitude>"+altitude+"</altitude>"+
				"<timezone>"+timezone+"</timezone>"+
				"<citycode>"+citycode+"</citycode>"+
				"<cityname>"+cityname+"</cityname>"+
				"<countrycode>"+countrycode+"</countrycode>"+
				"<stdcode>"+stdcode+"</stdcode>" +
				"</geolocation>"
		+"<hoteladdress>" +
				"<country>"+countryname+"</country>"+
				"<region>"+region+"</region>"+
				"<locality>"+locality+"</locality>"+
				"<area>"+area+"</area>"+
				"<street-name>"+streetname+"</street-name>"+
				"<street-number>"+streetnumber+"</street-number>"+
				"<postal-code>"+postalcode+"</postal-code>" +
				"</hoteladdress>" +
				"</hotelemp-profile>";
	
		 $.ajax({
		     type: "POST",
		     url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/updateLot/'+realm+'/'+lotId+'/'+activationCode,
		     contentType:'text/xml',
		     crossDomain: true,
		     processData: false,		    
		     headers: {
			  'Authorization': 'Bearer '+token
		      },
		data: xml,
	      success: function (plain) {	      
		console.log("UPDATE LOT RESPONSE: " +plain);	     
	       },
	     }).
	     done(function() {
		console.log("UPDATE LOT DONE: ");
	     })
	      .error(function() {
		console.log("UPDATE LOT FAILED:");    
	      })
	      .complete(function() {
		console.log("UPDATE LOT COMPLETED:");
	      });	
}

function mapLot(){	
	         var lotId            = $("#ltId").val();	
	         var spotId           = $("#sptId").val();	
	         var lotactivationId  = $("#lotactivatnId").val();	
	         var deviceId         = $("#devId").val();	
		 $.ajax({
		     type: "POST",
		     url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/mapLot/'+realm+'/'+lotId+'/'+lotactivationId+'/'+spotId+'/'+deviceId,
		contentType:'text/plain',
		crossDomain: true,
		processData: false,
		headers: {
			  'Authorization': 'Bearer '+token
		      },
	        success: function () {	      
			console.log("MAP LOT SUCCESS");	     
		},
	        }).
	        done(function(plain) {
			console.log("MAP LOT DONE: " +plain);
		})
	        .error(function() {
			console.log("MAP LOT FAILED:");    
		})
		.complete(function() {
			console.log("MAP LOT COMPLETED:");
		});	
}

function unmapLot(){	
	         var lotId              = $("#loId").val();	
	         var spotId             = $("#spId").val();	
	         var lotactivationId    = $("#lotactvtnId").val();	
	         var deviceId           = $("#dvId").val();	
	         
		 $.ajax({
		type: "POST",
		url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/unmapLot/'+realm+'/'+lotId+'/'+lotactivationId+'/'+spotId+'/'+deviceId,
		contentType:'text/plain',
		crossDomain: true,
		processData: false,
		headers: {
			  'Authorization': 'Bearer '+token
		      },
	        success: function () {	      
			console.log("UNMAP LOT SUCCESS");	     
		},
	        }).
	        done(function(plain) {
			console.log("UNMAP LOT DONE: " +plain);
		})
	        .error(function() {
			console.log("UNMAP LOT FAILED:");    
		})
		.complete(function() {
			console.log("UNMAP LOT COMPLETED:");
		});	
}

function deleteLot(){	
	         var lotId    = $("#lot").val();	
		 $.ajax({
		type: "DELETE",
		url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/deleteLot/'+realm+'/'+lotId,
		crossDomain: true,
		processData: false,
		headers: {
			'Authorization': 'Bearer '+token
		},
	        success: function () {	      
		console.log("LOT DELETED SUCCESS");	     
	       },
	     }).
	     done(function() {
		console.log("LOT DELETED DONE: ");
	     })
	      .error(function() {
		console.log("LOT DELETED FAILED:");    
	      })
	      .complete(function() {
		console.log("LOT DELETED COMPLETED:");
	      });	
}

 //solution registration & deregistration
function solutionregistration() {
				var partnerId       = $("#paId").val();
                               	var stgwid          = $("#cloudgatewayId").val();
                               	var solutionId      = $("#solutionId").val();
				console.log("inside solution registration.... ");
	$.ajax({
				type: "POST",
				url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/registerSolution/'+realm+'/'+partnerId+'/'+stgwid+'/'+solutionId,
				contentType: "text/plain",
				crossDomain: true,
				processData: false,
				headers: {
				  'Authorization': 'Bearer '+token
				},
				}).done(function(respData) {
				console.log("solution registration for registration (done).... "+respData);
				alert("solution registration status.... "+respData);
				}).error(function() {
				console.log("solution registration for registration (error).... ");
				}).complete(function() {
				console.log("solution registration for registration (completed).... ");
				});
			}	    
	    
function solutiondeRegistration() {
				var partnerId       = $("#prId").val();
                                var stgwid          = $("#cloudgwId").val();
                               	var solutionId      = $("#solId").val();
                         	console.log("inside solution deregistration.... ");
	$.ajax({
				type: "POST",
				url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/deregisterSolution/'+realm+'/'+partnerId+'/'+stgwid+'/'+solutionId,
				contentType: "text/plain",
				crossDomain: true,
				processData: false,
				headers: {
				  'Authorization': 'Bearer '+token
				},
				}).done(function(resData1) {
				console.log("solution deregistration for deregistration (done).... "+resData1);
				alert("solution de-registration status.... "+resData1);
				}).error(function() {
				console.log("solution deregistration for deregistration (error).... ");
				}).complete(function() {
				console.log("solution deregistration for deregistration (completed).... ");
				});
			}
			
			
/*-------------------------- Remote Access Validation ---------------------------*/
			
	
	function validateSol() {
				var solutionId       = $("#solutionId").val();                               
                         	console.log("inside validate solution.... ");
	$.ajax({
				type: "POST",
				url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/validateSolution/'+realm+'/'+solutionId,
				contentType: "text/plain",
				crossDomain: true,
				processData: false,
				headers: {
				  'Authorization': 'Bearer '+token
				},
				}).done(function(res) {
				console.log("inside validate solution (done).... "+res);
				alert("solution validation response .... "+res);
				}).error(function() {
				console.log("inside validate solution (error).... ");
				}).complete(function() {
				console.log("inside validate solution (completed).... ");
				});
			}
	
	function validateSolDev() {
				var solId       = $("#solId").val();
                                var devid       = $("#devid").val();
                               	var devcatype   = $("#devcatype").val();
                         	console.log("inside validate solution's Device .... ");
	$.ajax({
				type: "GET",
				url: 'http://'+dmbackendAddr+'/DMBackEndGw/DMDevice/solutionDeviceInfo/'+realm+'/'+solId+'/'+devid+'/'+devcatype,
				contentType: "application/json",
				crossDomain: true,
				processData: false,
				headers: {
				  'Authorization': 'Bearer '+token
				},
				}).done(function(resDt) {
				var bdy = JSON.stringify(resDt);
                               	console.log("inside validate solution's Device (done).... "+bdy);
				alert("solution's Device exist .... ");
				}).error(function() {
				console.log("inside validate solution's Device (error).... ");
				}).complete(function() {
				console.log("inside validate solution's Device (completed).... ");
				});
			}
	
	function validateSolmobilewebsite() {
				var sId       = $("#sId").val();
                                console.log("inside validate solution's Mobile Website .... ");
	$.ajax({
				type: "GET",
				url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/checkWebsite/'+realm+'/'+sId,
				contentType: "",
				crossDomain: true,
				processData: false,
				headers: {
				  'Authorization': 'Bearer '+token
				},
				}).done(function(resData) {
				console.log("inside validate solution's Mobile Website (done) .... "+resData);
				if(resData=="201")
                                alert("solution's Mobile Website exist .... ");
				}).error(function() {
				console.log("inside validate solution's Mobile Website (error).... ");
				}).complete(function() {
				console.log("inside validate solution's Mobile Website (completed).... ");
				});
			}			