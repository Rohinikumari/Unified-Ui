var PLATFORM_IP = '54.254.214.241';
var PLATFORM_PORT = 61614;
var USER = 'PLATFORM';
var PASSWD = 'platform';
var gNodeList = [];
var destEntityIdList = [];
var nodeInfo;
var realm = localStorage.getItem('realm');         // getting realm from web storage (local storage)
var token = localStorage.getItem('accessToken');  // getting access token from web storage (local storage)
var deviceId;
var status;

	function initApp() {
		console.log("setting the entity/node list");

		/*var brokerInfo = $("#brokerInfo").data("brokerInfo");
		PLATFORM_IP = brokerInfo.brokerHost;
		PLATFORM_PORT = parseInt(brokerInfo.brokerPort, 10);
		USER = brokerInfo.username;
		PASSWD = brokerInfo.password;
		*/

		$(".device").each(function(index) {
			nodeInfo = $(this).data("nodeInfo");
			var entityId = nodeInfo.entityId;

			gNodeList.push(nodeInfo);

			if (destEntityIdList.indexOf(entityId) === -1)
				destEntityIdList.push(entityId);

			console.log(index + ": " + JSON.stringify(nodeInfo, undefined, 2));
		});

		console.log('Node list: ' + JSON.stringify(gNodeList, undefined, 2));
		console.log('Destination list: ' + JSON.stringify(destEntityIdList, undefined, 2));
		console.log('Broker info: ' + PLATFORM_IP + ':' + PLATFORM_PORT);
		//putStatus(gNodeList);
		getSolStatus(gNodeList);
	}	
		
	function getSolStatus(gNodeList){		                                
		                                console.log("inside get solution status.... ");		                              
	        $.ajax({		
						type : "GET",					
						url : 'http://'+backendAddr+'/ConsumerBackEndGateway/Consumer/'+realm+'/'+realm+'/registerStatus',
						contentType : "text/xml",
						crossDomain : true,
						processData : false,
						headers: {
						  'Authorization': 'Bearer '+token
						},
						})
						.done(function(xml) {
						console.log("inside done function.... " +xml);
						var solutionId;
						$(xml).find("solution").each(function() {
						$(this).find("id").each(function(){
						solutionId =  $(this).text();						
						});                                                
				                });
                                                getDeviceStatus(gNodeList, solutionId);						
						}).error(function() {
						console.log("inside error.... ");
						}).complete(function() {
						console.log("inside complete.... ");
						});
		}		
		
		
		function getDeviceStatus(gNodeList,solutionId){		                                
		                                console.log("inside get device status.... "+solutionId);						
						var nType;
                                                var json   = JSON.stringify(gNodeList);
						var obj    = JSON.parse(json);
		                                for(i = 0; i<obj.length; i++){
						deviceId    = obj[i].nodeId;
						console.log("node id.... "+deviceId);					
									
	        $.ajax({		
						type : "GET",					
						url : 'http://'+backendAddr+'/ConsumerBackEndGateway/Consumer/'+realm+'/'+solutionId+'/'+deviceId+'/getDeviceStatus',
						crossDomain : true,
						processData : false,
						headers: {
						  'Authorization': 'Bearer '+token
						},					
						}).done(function(data){
						var json   = JSON.stringify(data);
						var obj    = JSON.parse(json);
		                                console.log("NODE STATUS... " +json);
						status        = obj.status.payloadStatus;
                                                updateStatus(deviceId, status);							
						}).error(function() {
						console.log("inside error.... ");
						}).complete(function() {
						console.log("inside complete.... ");
						});
						}
		}		
		
	
function updateStatus(deviceId, status) {
						console.log("inside update status.... ");
						console.log("device Id.... "+deviceId);
						console.log("status.... "+status);
					if (deviceId != null) {
						var curStatus = status;

					if (curStatus == 0) {
					    $('#' + deviceId + '-cube-switch').removeClass('active');
					    $('#' + deviceId + '-indicator').removeClass('brightindicator').addClass('dimindicator');
					    $('#light-bulb2').css({'opacity': '1'});
					    console.log("class not active");
					} else if(curStatus == 1){
					    $('#' + deviceId + '-cube-switch').addClass('active');
					    $('#' + deviceId + '-indicator').removeClass('dimindicator').addClass('brightindicator');
					    $('#light-bulb2').css({'opacity': '0'});
					    console.log("class active");
					} else{
					     console.log("inside else.... ");
					}
			    }
			}	