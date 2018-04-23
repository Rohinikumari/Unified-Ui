var devicelist;

$(document).ready(function(){     

	    devicelist = $('#devlist').dataTable( {bFilter: false, bInfo: false, "bLengthChange": false,
		      "aoColumnDefs": [
			  { 'bSortable': false, 'aTargets': [ 1,2 ] }
		      ]
		  });
	getPartnerNodes();	  
}); 

var realm = localStorage.getItem('realm');         // getting realm from web storage (local storage)
var token = localStorage.getItem('accessToken');  // getting access token from web storage (local storage)
// Create a new WebSocket
var partnerEvent = new WebSocket('ws://35.164.253.193:4000/devctrl/devices/partnerEvent');   // cs, bs, ack
var partnerLive = new WebSocket('ws://35.164.253.193:4000/devctrl/devices/partnerLive');   // pl
var nodeId;
var connectionstatus;
var nodetype;
var batterystatus;
var payloadst;
var msgEvent;
var msgLive;

function getPartnerNodes() {    
    console.log("inside partner nodes..........");
    $.ajax({
		type: "GET",
		url: 'http://'+dmbackendAddr+'/DMBackEndGw/DMDevice/getDevices/'+realm+'/'+realm,
		contentType: 'application/json',
		crossDomain: true,
		processData: false,
		headers: {
		  'Authorization': 'Bearer '+token
	},
        success: function (obj) {
	        var bdy = JSON.stringify(obj);
               console.log("BODY ... >> " +bdy);
		
                for (i = 0; i < obj.devices.length; i++) {
                var did = obj.devices[i].deviceId;
		console.log("x.... "+did);
		getDeviceImage(did);
	}},
	}).done(function () {
        console.log("inside node done function.... ");
	}).error(function () {
	console.log("inside node error function....");
        }).complete(function () {
	console.log("inside node complete function....");
        });
}

function getDeviceImage(did) {    
    console.log("inside device image.... "+did);
    $.ajax({
		type: "GET",
		url: 'http://'+dmbackendAddr+'/DMBackEndGw/DMDevice/getDeviceInfo/'+realm+'/'+did,
		contentType: 'text/xml',
		crossDomain: true,
		processData: false,
		headers: {
		  'Authorization': 'Bearer '+token
	},
	success: function (xml){
	//devicelist.fnClearTable();
	var devId;
	var devType;
	var imageData;
	var pic;	
	$(xml).find("device").each(function() {
	$(this).find("deviceId").each(function(){
	devId =  $(this).text();        
	console.log("device Id.... "+devId);	
	});
	$(this).find("deviceType").each(function(){
	devType =  $(this).text();        
	console.log("device Type.... "+devType);	
	});
	$(this).find("imageData").each(function(){
	imageData =  $(this).text();
	//picture = "data:image/png;base64," + imageData;
	pic = "<img height =\'100\' width = \'100\' id='base64image' src='data:" +devType+ ";base64," +imageData+ "\'></a><br>";	
	devicelist.fnAddData([	      
			devId,
			devType,
			pic,
		'<button id="status" type="button" class="btn btn-primary">Status</button> &nbsp;'
	]);
	});	
	});
	},
       	}).done(function (res) {
        console.log("inside device image done function.... "+res);				
	}).error(function () {
	console.log("inside device image error function....");
        }).complete(function () {
	console.log("inside device image complete function....");
        });
}

// get device status
        $(document).on('click','#status',function(){
		var caName, curRow, devid;
		curRow = $(this).parents('tr');
	        devid = $.trim($(curRow).find('td:nth-child(1)').text());
		console.log('device id.... '+devid);
		partnerEvent.onmessage = function(event) {
		msgEvent = event.data;
		console.log("message event.... " +msgEvent);
		var obj  = jQuery.parseJSON(msgEvent);
		console.log("message event obj.... " +obj);	
	        var dt   = JSON.parse(obj);
		var nodeId   = dt.nId;
		var keys =  Object.keys(dt);	 
		var key = (keys.toString()).split(",");
		var messagetype = key[2];
		console.log("message type ......     "+messagetype);
		if(devid == nodeId && messagetype == "connectionStatus"){
		connectionstatus   = dt.connectionStatus.status;
		alert("connection status "+nodeId+" - "+connectionstatus);
		}else if(devid == nodeId && messagetype == "batteryStatus"){
		batterystatus   = dt.batteryStatus.status;
		alert("battery status "+nodeId+" - "+batterystatus);
		}else{
		console.log("status not found (event).... ");
		}}
		// Handle messages sent by the server (pl)
		partnerLive.onmessage = function(event) {
		 msgLive = event.data;
		 console.log("nodeLive message... "+msgLive);
		 //var obj = msgLive.replace(/\\/g, "");
		 //console.log("remove slashes response.... "+obj);
		var resdt   = JSON.parse(msgLive);
		console.log("resdt.... "+resdt);
		var dvId = resdt.nId;
		var st   = resdt.status;
		var dt = JSON.stringify(st);
		/*var re = JSON.parse(dt);
		var ro = re.temperature;*/
		 //nodetype  = dt.sensor;
		 //payloadst   = dt.sensor;
		 alert("payload status "+dvId+" - "+dt);
		}
		});
	// Show a disconnected message when the WebSocket is closed
	partnerEvent .onclose = function(event) {
	  console.log("partnerEvent webscoket close... ");
	};

	// Show a disconnected message when the WebSocket is closed
	partnerLive.onclose = function(event) {
	console.log("partnerLive webscoket close... ");
	};