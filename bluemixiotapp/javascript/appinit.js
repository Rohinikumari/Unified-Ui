var PLATFORM_IP = "kwlf3o.messaging.internetofthings.ibmcloud.com";
var PLATFORM_PORT = 1883;
var USER = "a-kwlf3o-bztaqjaax5";
var PASSWD = "dUwVYILREEgnBK)vkB";
var CLIENT_ID = "a:kwlf3o:bztaqjaax5";
var gNodeList = [];
var destEntityIdList = [];

(function() {

	$(document).ready(function() {
		console.log("setting the entitiy/node list");

		//var brokerInfo = $("#brokerInfo").data("brokerInfo");
		//PLATFORM_IP = brokerInfo.brokerHost;
		//PLATFORM_PORT = parseInt(brokerInfo.brokerPort, 10);
		//USER = brokerInfo.username;
		//PASSWD = brokerInfo.password;

		$(".device").each(function(index) {
			var nodeInfo = $(this).data("nodeInfo");
			var entityId = nodeInfo.entityId;

			gNodeList.push(nodeInfo);

			if (destEntityIdList.indexOf(entityId) === -1)
				destEntityIdList.push(entityId);

			console.log(index + ": " + JSON.stringify(nodeInfo, undefined, 2));
		});

		console.log('Node list: ' + JSON.stringify(gNodeList, undefined, 2));
		console.log('Destination list: ' + JSON.stringify(destEntityIdList, undefined, 2));
		console.log('Broker info: ' + PLATFORM_IP + ':' + PLATFORM_PORT);
	});

})();