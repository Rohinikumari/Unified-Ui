
var brokerConnect = (function() {

	var CLIENT_ID = defaultClientId();
	var CONN_TIMER = 600;
	var ENTITY_VERSION = "1.0";
	var replyTo = 'Entity/' + CLIENT_ID + '/CT';

	function defaultClientId() {
		return "WS" + (Math.random() + 1).toString(36).substring(10);
	}

	function getClientId() {
		return CLIENT_ID;
	}

	var wsClient = null;

	function doConnection(ip, port, clientId, username, passwd) {
		console.log("Default Client-Id:" + clientId);
		wsClient = new Messaging.Client(ip, port, clientId);
		wsClient.onConnect = onConnect;
		wsClient.onMessageArrived = onMessageArrived;
		wsClient.onConnectionLost = onConnectionLost;
		wsClient.connect({
			userName: username,
			password: passwd,
			onSuccess: onConnect,
			onFailure: onFailure
		});
	}

	var initBrokerConnection = function(){
		doConnection(PLATFORM_IP, PLATFORM_PORT, CLIENT_ID, USER, PASSWD);
	}

	// the client is notified when it is connected to the server.
	var onConnect = function(frame) {
		if (connTimer) {
			clearInterval(connTimer);
			connTimer = null;
		}
		console.log("WS:Connected:Successfully");

		/*var destinationEntitiyId, subTopicEntity, subTopicNode;

		for (i = 0; i < destEntityIdList.length; i++) {
			destinationEntitiyId = destEntityIdList[i];
			subTopicEntity = 'Entity/' + destinationEntitiyId + '/ST/#';
			subTopicNode = 'Entity/' + destinationEntitiyId + '/Node/+/ST/#';
			wsClient.subscribe(subTopicEntity);
			wsClient.subscribe(subTopicNode);
		}

		wsClient.subscribe(replyTo);*/
		wsClient.subscribe('SOLUTION/#');
		doFrameConnectEmit();
	};


	function onFailure(failure) {
		console.log("WS:Failure:" + failure.errorMessage);
		startConnTimer();
	}

	function onMessageArrived(message) {
		console.log("WS:Message Arrived: Topic:" + message.destinationName + ":Msg:" + message.payloadString);
		//refreshData(message.destinationName, message.payloadString);
		var topic = message.destinationName;
		if(topic.indexOf("SOLUTION") > -1){
			localDeviceData(message.destinationName, message.payloadString);
		}
	}

	function onConnectionLost(responseObject) {
		if (responseObject.errorCode !== 0) {
			console.log("WS:Connection Lost:" + wsClient.clientId + ": " + responseObject.errorCode + "\n");
			connTimer = setInterval(handleConnTimeout, CONN_TIMER);
		}
	}

	var connTimer = null;

	function handleConnTimeout() {
		stopConnTimer();
		CLIENT_ID = defaultClientId();
		doConnection(PLATFORM_IP, PLATFORM_PORT, CLIENT_ID, USER, PASSWD);
	}

	function startConnTimer() {
		stopConnTimer();
		connTimer = setInterval(handleConnTimeout, CONN_TIMER);
	}

	function stopConnTimer() {
		if (connTimer) {
			clearInterval(connTimer);
			connTimer = null;
		}
	}

	/*
################################### HA ############################################
*/


	var gRefreshCallback = {};

	function clear(array) {
		while (array.length > 0) {
			array.pop();
		}
	}

	function registerRefreshEvent(ctrlName, callback) {
		gRefreshCallback[ctrlName] = callback;
	}

	function deRegisterRefreshEvent(callback) {
		delete gRefreshCallback[ctrlName];
	}


	function doFrameRefresh(inode) {
		if (inode.name != null) {
			gRefreshCallback[inode.name](inode);
		}
	}

	function findInode(friendlyName) {
		for (var i = 0; i < gNodeList.length; i++) {
			if (gNodeList[i].friendlyName == friendlyName) {
				return gNodeList[i];
			}
		}
		return null;
	}


	function findNodeById(deviceId) {
		for (var i = 0; i < gNodeList.length; i++) {
			var node = gNodeList[i];
			if (node.deviceId == deviceId) {
				return node;
			}
		}
		return null;
	}

	function findByNodeEntityId(deviceId, entityId) {
		for (var i = 0; i < gNodeList.length; i++) {
			var node = gNodeList[i];
			if (node.deviceId == deviceId && node.entityId == entityId) {
				return node;
			}
		}
		return null;
	}


	function refreshData(topic, message) {
		var msgObj = parseMessage(message);
		var entityId = msgObj.msgroot.entity.eh.ehi;
		//Get the Node details & its Status
		for (var i = 0; i < msgObj.msgroot.devices.length; i++) {
			var nodeId = msgObj.msgroot.devices[i].nh.nhi;
			var inode = findByNodeEntityId(deviceId, entityId);
			if (inode != null) {
				processNodeCommands(inode, msgObj.msgroot.devices[i]);
			}
		}
	}


	function processNodeCommands(inode, node) {
		for (var j = 0; j < node.np.length; j++) {
			var status = null;
			console.log('before update status');
			if (Object.keys(node.np[j])[0] == 'status') {
				status = node.np[j][Object.keys(node.np[j])[0]];
				if ((status) && (status.length > 0)) {
					if (inode.lastStatus != status) {
						inode.lastStatus = status;
						doFrameRefresh(inode);
					}
				}
			}
		}
	}

	function getCurrentUTCTime() {
		var now = new Date();
		var utc_now = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
		return utc_now.getTime();
	}

	function queryStatus(inode) {
		var msgObj = createMsg(CLIENT_ID, 2, ENTITY_VERSION);
		var respNode = createMsgNode(inode.deviceId, getCurrentUTCTime());
		addMsgNodePair(respNode, "type", inode.deviceType);
		addMsgNodePair(respNode, "get", replyTo);
		addMsgNode(msgObj, respNode);
		var msgJsonStr = packMessage(msgObj);
		var message = new Messaging.Message(msgJsonStr);
		message.destinationName = 'Entity/' + inode.entityId + '/Node/' + inode.deviceId + '/CT';
		wsClient.send(message);
		console.log('MQTT:TOPIC:' + message.destinationName + ':MSG:' + msgJsonStr);
	}

	function getStatus(ctrlName) {
		var inode = findInode(ctrlName);
		if (null != inode) {
			queryStatus(inode);
		}
	}

	function getStatusById(deviceId, entityId) {
		var inode = findByNodeEntityId(deviceId, entityId);
		if (null != inode) {
			queryStatus(inode);
		}
	}

	function actionCommand(inode, value) {
		var msgObj = createMsg(CLIENT_ID, 2, ENTITY_VERSION);
		var actNode = createMsgNode(inode.deviceId, getCurrentUTCTime());
		addMsgNodePair(actNode, "type", inode.deviceType);
		addMsgNodePair(actNode, "set", value);
		addMsgNode(msgObj, actNode);
		var msgJsonStr = packMessage(msgObj);
		var message = new Messaging.Message(msgJsonStr);
		message.destinationName = 'Entity/' + inode.entityId + '/Node/' + inode.deviceId + '/CT';
		wsClient.send(message);
		console.log('MQTT:TOPIC:' + message.destinationName + ':MSG:' + msgJsonStr);
	}
	
	function actionBoxPwr(message){
		wsClient.send(message);
	}

	function actionTxPower(inode, value) {
		var msgObj = createMsg(CLIENT_ID, 2, ENTITY_VERSION);
		var actNode = createMsgNode(inode.deviceId, getCurrentUTCTime());
		addMsgNodePair(actNode, "type", inode.deviceType);
		addMsgNodePair(actNode, "dBValue", value);
		addMsgNode(msgObj, actNode);
		var msgJsonStr = packMessage(msgObj);
		var message = new Messaging.Message(msgJsonStr);
		message.destinationName = 'Entity/' + inode.entityId + '/Node/' + inode.deviceId + '/CT';
		wsClient.send(message);
		console.log('MQTT:TOPIC:' + message.destinationName + ':MSG:' + msgJsonStr);
	}

	function changeStatus(ctrlName, value) {
		var inode = findInode(ctrlName);
		if (null != inode) {
			actionCommand(inode, value);
		}
	}

	function changeStatusById(deviceId, entityId, value) {
		var inode = findByNodeEntityId(deviceId, entityId);
		if (null != inode) {
			actionCommand(inode, value);
		}
	}
	
	function changeTxPowerById(deviceId, value) {
		var inode = findNodeById(deviceId);
		console.log("node id:"+deviceId+" value : "+value+" inode :");
		if (null != inode) {
			actionTxPower(inode, value);
		}
	}
	
	function changeBoxPwr(message) {
		actionBoxPwr(message);
	}
	
	var gOnConnectCallback = [];

	function registerConnectEvent(callback) {
		gOnConnectCallback.push(callback);
	}

	function deRegisterConnectEvent(callback) {
		clear(gOnConnectCallback);
	}


	function doFrameConnectEmit() {
		for (var i = 0; i < gOnConnectCallback.length; i++) {
			gOnConnectCallback[i]();
		}
	}


	return {
		changeTxPowerById: changeTxPowerById,
		changeStatusById: changeStatusById,
		changeBoxPwr: changeBoxPwr,
		getStatusById: getStatusById,
		registerRefreshEvent: registerRefreshEvent,
		registerConnectEvent: registerConnectEvent,
		deRegisterRefreshEvent: deRegisterRefreshEvent,
		deRegisterConnectEvent: deRegisterConnectEvent,
		getClientId: getClientId,
		initBrokerConnection: initBrokerConnection
	};

})();