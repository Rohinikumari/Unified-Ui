$(document).ready(function(){
	getListOfNodes();
});

function getListOfNodes(){
	var realm = localStorage.getItem('realm');         // getting realm from web storage (local storage)
        var token = localStorage.getItem('accessToken');  // getting access token from web storage (local storage)
        var username = "standardgatway";
	console.log("inside get node list of remote operations.... ");
    $.ajax({
        type: "GET",
        url: 'http://'+dmbackendAddr+'/DMBackEndGw/DMDevice/getDevices/'+realm+'/'+realm,
        contentType:'application/json',
        //dataType:'jsonp',
        crossDomain: true,
        processData: false,
	headers: {
          'Authorization': 'Bearer '+token
	 },
        success: function (obj) {
		var bdy = JSON.stringify(obj);
                console.log("BODY ... >> " +bdy);
                for (i = 0; i < obj.devices.length; i++) {
		    console.log("DEVICE ID " + obj.devices[i].deviceId);
		    console.log("DEVICE TYPE " +obj.devices[i].deviceType);
		    var x = obj.devices[i].deviceType;
		    var dimmer = x.substring(x.indexOf('device:')+7,x.lastIndexOf(':'));
		    var y = dimmer + "-SWITCH";
		    console.log("DIMMER SWITCH .... >> " +y);
		    var z = obj.devices[i].deviceType;
		    var binary = z.substring(z.indexOf('device:')+7,z.lastIndexOf(':'));
		    console.log("BINARY SWITCH .... >> " +binary);

                    var jsonSwitch="{\"entityId\":\""+username+"\",\"nodeId\":\""+obj.devices[i].deviceId+"\",\"name\":\"Switch\",\"lastStatus\":\"\",\"nodeType\":\""+obj.devices[i].deviceType+"\"}";
                    var jsonDimmer="{\"entityId\":\""+username+"\",\"nodeId\":\""+obj.devices[i].deviceId+"\",\"name\":\"Dimmer\",\"lastStatus\":\"\",\"nodeType\":\""+obj.devices[i].deviceType+"\"}";

                    if (x == "urn:schemas-u-naas-com:device:PARKINGSPACE:1") {
                    $('#wrapper').append('<div class="col-lg-3 col-md-4" >'
                        + '<div class="element">'
			+ '<div class="controls col-lg-12 col-md-12 col-sm-6">'
                        + '<div class="device-container">'
                        + '<p> Device Name : <span class="deviceName">' + obj.devices[i].friendlyName + '</span></p>'
                        + '<p> Device Type : <span class="deviceType">' + obj.devices[i].deviceType + '</span></p>'
                        + '<p> Device Id : <span class="deviceId">' + obj.devices[i].deviceId + '</span></p>'
			+ '<div name="Switch" class="device col-lg-12 col-md-12 col-sm-6" id="' + obj.devices[i].deviceId + '" data-node-info=' + jsonSwitch + '>'
                        + '<div class="device-container switch">'
                        + '<div id="' + obj.devices[i].deviceId + '-cube-switch" class="cube-switch" onclick="doAction(\'' +  obj.devices[i].deviceId + '\')">'
                        + '<span class="switch">'
                        + '<span class="switch-state off">Off</span>'
                        + '<hr id="' + obj.devices[i].deviceId + '-indicator" class="dimindicator">'
                        + '<span class="switch-state on">On</span>'
                        + '</span>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
			+ '</div>'
                        + '</div>'
                        + '<div class="controls col-lg-12 col-md-12 col-sm-6">'
                        + '<div class="device-container">'
			+ '<p> Sensor : <span class="Sensor">' + obj.devices[i].sensors + '</span></p>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>');
                }else if (x == "urn:schemas-u-naas-com:device:GENERIC-DIMMER:1") {
                    $('#wrapper').append('<div class="col-lg-3 col-md-4" >'
                        + '<div class="element">'
			+ '<div class="controls col-lg-12 col-md-12 col-sm-6">'
                        + '<div class="device-container">'
                        + '<p> Device Name : <span class="deviceName">' + obj.devices[i].friendlyName + '</span></p>'
                        + '<p> Device Type : <span class="deviceType">' + obj.devices[i].deviceType + '</span></p>'
                        + '<p> Device Id : <span class="deviceId">' + obj.devices[i].deviceId + '</span></p>'
			+ '<div name="Switch" class="device col-lg-12 col-md-12 col-sm-6" id="' + obj.devices[i].deviceId + '" data-node-info=' + jsonSwitch + '>'
                        + '<div class="device-container switch">'
                        + '<div id="' + obj.devices[i].deviceId + '-cube-switch" class="cube-switch" onclick="doAction(\'' +  obj.devices[i].deviceId + '\')">'
                        + '<span class="switch">'
                        + '<span class="switch-state off">Off</span>'
                        + '<hr id="' + obj.devices[i].deviceId + '-indicator" class="dimindicator">'
                        + '<span class="switch-state on">On</span>'
                        + '</span>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
			+ '</div>'
                        + '</div>'
                        + '<div class="controls col-lg-12 col-md-12 col-sm-6">'
                        + '<div class="device-container">'
			+ '<p> Dimmer : <span class="Dimmer">' + obj.devices[i].dimers + '</span></p>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>');
                }else if (x == "urn:schemas-u-naas-com:device:GENERIC-MIXED:1") {
                    $('#wrapper').append('<div class="col-lg-3 col-md-4" >'
                        + '<div class="element">'
			+ '<div class="controls col-lg-12 col-md-12 col-sm-6">'
                        + '<div class="device-container">'
                        + '<p> Device Name : <span class="deviceName">' + obj.devices[i].friendlyName + '</span></p>'
                        + '<p> Device Type : <span class="deviceType">' + obj.devices[i].deviceType + '</span></p>'
                        + '<p> Device Id : <span class="deviceId">' + obj.devices[i].deviceId + '</span></p>'
			+ '<div name="Switch" class="device col-lg-12 col-md-12 col-sm-6" id="' + obj.devices[i].deviceId + '" data-node-info=' + jsonSwitch + '>'
                        + '<div class="device-container switch">'
                        + '<div id="' + obj.devices[i].deviceId + '-cube-switch" class="cube-switch" onclick="doAction(\'' +  obj.devices[i].deviceId + '\')">'
                        + '<span class="switch">'
                        + '<span class="switch-state off">Off</span>'
                        + '<hr id="' + obj.devices[i].deviceId + '-indicator" class="dimindicator">'
                        + '<span class="switch-state on">On</span>'
                        + '</span>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
			+ '</div>'
                        + '</div>'
                        + '<div class="controls col-lg-12 col-md-12 col-sm-6">'
                        + '<div class="device-container">'
			+ '<p> Sensor : <span class="Sensor">' + obj.devices[i].sensors + '</span></p>'
			+ '<p> Relay : <span class="Relay">' + obj.devices[i].relays + '</span></p>'
			+ '<p> Dimmer : <span class="Dimmer">' + obj.devices[i].dimers + '</span></p>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>');
                }else if (x == "urn:schemas-u-naas-com:device:GENERIC-SD:1") {
                    $('#wrapper').append('<div class="col-lg-3 col-md-4" >'
                        + '<div class="element">'
			+ '<div class="controls col-lg-12 col-md-12 col-sm-6">'
                        + '<div class="device-container">'
                        + '<p> Device Name : <span class="deviceName">' + obj.devices[i].friendlyName + '</span></p>'
                        + '<p> Device Type : <span class="deviceType">' + obj.devices[i].deviceType + '</span></p>'
                        + '<p> Device Id : <span class="deviceId">' + obj.devices[i].deviceId + '</span></p>'
			+ '<div name="Switch" class="device col-lg-12 col-md-12 col-sm-6" id="' + obj.devices[i].deviceId + '" data-node-info=' + jsonSwitch + '>'
                        + '<div class="device-container switch">'
                        + '<div id="' + obj.devices[i].deviceId + '-cube-switch" class="cube-switch" onclick="doAction(\'' +  obj.devices[i].deviceId + '\')">'
                        + '<span class="switch">'
                        + '<span class="switch-state off">Off</span>'
                        + '<hr id="' + obj.devices[i].deviceId + '-indicator" class="dimindicator">'
                        + '<span class="switch-state on">On</span>'
                        + '</span>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
			+ '</div>'
                        + '</div>'
                        + '<div class="controls col-lg-12 col-md-12 col-sm-6">'
                        + '<div class="device-container">'
			+ '<p> Sensor : <span class="Sensor">' + obj.devices[i].sensors + '</span></p>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>');
                }else if (x == "urn:schemas-u-naas-com:device:GENERIC-RELAY:1") {
                    $('#wrapper').append('<div class="col-lg-3 col-md-4" >'
                        + '<div class="element">'
			+ '<div class="controls col-lg-12 col-md-12 col-sm-6">'
                        + '<div class="device-container">'
                        + '<p> Device Name : <span class="deviceName">' + obj.devices[i].friendlyName + '</span></p>'
                        + '<p> Device Type : <span class="deviceType">' + obj.devices[i].deviceType + '</span></p>'
                        + '<p> Device Id : <span class="deviceId">' + obj.devices[i].deviceId + '</span></p>'
			+ '<div name="Switch" class="device col-lg-12 col-md-12 col-sm-6" id="' + obj.devices[i].deviceId + '" data-node-info=' + jsonSwitch + '>'
                        + '<div class="device-container switch">'
                        + '<div id="' + obj.devices[i].deviceId + '-cube-switch" class="cube-switch" onclick="doAction(\'' +  obj.devices[i].deviceId + '\')">'
                        + '<span class="switch">'
                        + '<span class="switch-state off">Off</span>'
                        + '<hr id="' + obj.devices[i].deviceId + '-indicator" class="dimindicator">'
                        + '<span class="switch-state on">On</span>'
                        + '</span>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
			+ '</div>'
                        + '</div>'
                        + '<div class="controls col-lg-12 col-md-12 col-sm-6">'
                        + '<div class="device-container">'
			+ '<p> Relay : <span class="Relay">' + obj.devices[i].relays + '</span></p>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>');
                }else{
                        $('#wrapper').append('<div class="col-lg-3 col-md-4" >'
                        +'<div class="element">'
			+'<div class="controls col-lg-12 col-md-12 col-sm-6">'
                        +'<div class="device-container">'
                        + '<p> Device Name :<span class="deviceName">' + obj.devices[i].friendlyName + '</span></p>'
                        + '<p> Device Type :<span class="deviceType">' + obj.devices[i].deviceType + '</span></p>'
                        + '<p> Device Id :<span class="deviceId">' + obj.devices[i].deviceId + '</span></p>'
			+'<div name="Switch" class="device col-lg-12 col-md-12 col-sm-6" id="'+username+'-'+obj.devices[i].deviceId+'" data-node-info='+jsonSwitch+'>'
                        +'<div class="device-container switch">'
                        //+'<div id="'+username+'-'+obj.devices[i].deviceId+'-cube-switch" class="cube-switch" onclick="simpleSwitch.doAction(\''+username+'-'+obj.devices[i].deviceId+'\')">'
                        +'<div id="'+username+'-'+obj.devices[i].deviceId+'-cube-switch" class="cube-switch" onclick="doAction(\'' +  obj.devices[i].deviceId + '\')">'
                        +'<span class="switch">'
                        +'<span class="switch-state off">Off</span>'
			+'<hr id="'+username+'-'+obj.devices[i].deviceId+'-indicator" class="dimindicator">'
                        +'<span class="switch-state on">On</span>'
                        +'</span>'
                        +'</div>'
                        +'</div>'
                        +'</div>'
			+'</div>' 
                        +'</div>'
                        +'<div class="controls col-lg-12 col-md-12 col-sm-6">'
                        +'<div class="device-container">'
			+ '<p> Sensor : <span class="Sensor">' + obj.devices[i].sensors + '</span></p>'
                        +'</div>' 
                        +'</div>'
                        +'</div>'
                        +'</div>');
                    }
                }
		initApp();
                brokerConnect.initBrokerConnection();                

				$(function(){
					var i = 1;
					var steps = [1, 10, 20, 30, 40];
				        $(".vslider #slider-vertical").slider({
				            orientation: "vertical",
				            range: "min",
				            min: 0,
				            max: steps.length-1,
				            value: 0,
							step: 1,
				            slide: function( event, ui ) {
				                //$( "#amount" ).val( ui.value );
				                //$(this).find('.ui-slider-handle').text(steps[ui.value]);
					    lamp.doAction($(this).parent().parent().attr('id'), steps[ui.value]);

				            },
				            create: function(event, ui) {
				                var v=$(this).slider('value');
				                $(this).find('.ui-slider-handle').text(v);
				            }
				        });
						$('.ui-slider-handle').text(i);
    			});
        },

    }).done(function( json ) {
        console.log("STATUS UPDATE SUCCESS:"+json);
    })
        .error(function() {
            console.log("STATUS UPDATE FAILED:");
        })
        .complete(function() {
            console.log("STATUS UPDATE COMPLETED:");
        });

/*

    var json = "{\"devices\":[{\"nodeId\":\"id123\",\"internalId\":\"id123\",\"friendlyName\":\"hallbulb\",\"type\":\"dimmer\",\"ipAddress\":\"172.16.0.89\"},{\"nodeId\":\"id1234\",\"internalId\":\"id123\",\"friendlyName\":\"hallbulb\",\"type\":\"switch\",\"ipAddress\":\"172.16.0.89\"},{\"nodeId\":\"id1235\",\"internalId\":\"id123\",\"friendlyName\":\"hallbulb\",\"type\":\"dimmer\",\"ipAddress\":\"172.16.0.89\"},{\"nodeId\":\"id1236\",\"internalId\":\"id123\",\"friendlyName\":\"hallbulb\",\"type\":\"switch\",\"ipAddress\":\"172.16.0.89\"},{\"nodeId\":\"id1237\",\"internalId\":\"id1234\",\"friendlyName\":\"roombulb\",\"type\":\"dimmer\",\"ipAddress\":\"172.16.0.89\"}]}";

    //var data = 	JSON.stringify(json);
    obj = JSON && JSON.parse(json) || $.parseJSON(json);

    console.log(obj);
    console.log(obj.devices.length);
    devices = obj.devices.length;
    for(i = 0; i<obj.devices.length; i++){
        console.log("node "+obj.devices[i].deviceId);

        var idVar="{\"entityId\":\"PLATFORM\",\"nodeId\":\""+obj.devices[i].deviceId+"\",\"name\":\""+obj.devices[i].friendlyName+"\",\"lastStatus\":\"\",\"nodeType\":\""+obj.devices[i].type+"\"}";

        if(obj.devices[i].type == "switch"){
        $('#wrapper').append('<div class="col-lg-3 col-md-4" >'
            +'<div class="element">'
            +'<div class="device col-lg-12 col-md-12 col-sm-6" id="'+obj.devices[i].nodeId+'" data-node-info='+idVar+'>'
            +'<div class="device-container switch" style="margin-top:-35px;">'
            +'<div class="cube-switch">'
            +'<span class="switch">'
            +'<span class="switch-state off">Off</span>'
            +'<span class="switch-state on">On</span>'
            +'</span>'
            +'</div>'
            +'</div>'
            +'</div>'
            +'<div class="controls col-lg-12 col-md-12 col-sm-6">'
            +'<div class="device-container">'
            +'<p> Device Id :<span class="deviceId">'+obj.devices[i].friendlyName+'</span></p>'
            +'<p> Device Name :<span class="deviceName">'+obj.devices[i].type+'</span></p>'
            +'</div>'
            +'</div>'
            +'</div>'
            +'</div>');
        }else if(obj.devices[i].type == "dimmer"){
            $('#wrapper').append('<div class="col-lg-3 col-md-4">'
                +'<div class="element">'
                +'<div class="device col-lg-12 col-md-12 col-sm-6" id="'+obj.devices[i].deviceId+'" data-node-info='+idVar+'>'
                +'<div class="device-container vslider"  style="margin-top:-35px;">'
                +'<div id="slider-vertical"></div>'
                +'</div>'
                +'</div>'
                +'<div class="controls col-lg-12 col-md-12 col-sm-6">'
                +'<div class="device-container">'
                +'<p> Device Id :<span class="deviceId">'+obj.devices[i].friendlyName+'</span></p>'
                +'<p> Device Name :<span class="deviceName">'+obj.devices[i].type+'</span></p>'
                +'</div>'
                +'</div>'
                +'</div>'
                +'</div>');
        }
    }
    */
}

function doAction(deviceId) {
			console.log("inside do action.... ");
		     if ($('#'+deviceId+'-cube-switch').hasClass('active')) {
			state = '0';
		    } else {
			state ='1';
		    }		
			var msg = JSON.stringify({
				                   "nId":deviceId,
						   "nT":"GENERIC-SD",
						    "status": {
							    "drapes":state,				        
						    }
					    });			
	        $.ajax({		
						type : "POST",					
						url : 'http://'+backendAddr+'/ConsumerBackEndGateway/Consumer/'+realm+'/UNAASunaas5solutiontest102/'+deviceId+'/deviceStatus',
						contentType : "application/json",
						crossDomain : true,
						processData : false,
						data : msg,
						headers: {
						  'Authorization': 'Bearer '+token
						},
						})
						.done(function() {						
						console.log("inside done... ");
						}).error(function() {
						console.log("inside error.... ");
						}).complete(function() {
						console.log("inside complete.... ");
						});
			console.log("message.... " +msg);
			console.log('Changing state for : ' + deviceId + ' to ' + state);
			brokerConnect.changeStatusById(deviceId,state);
}


function platformDetails(){
    $('#wrapper').attr('data-platform', '{"myType":"test", "count":40}' );

    $(".device").each(function(index) {
    var v = $(this).data("nodeInfo");

    console.log("============="+v.nodeId);
    });
}