var simpleSwitch = (function() {

	var CTRL_NAME = "Switch";
	var SEPARATOR = '-';

	var switchOn = function(elementId) {
		$('#' + elementId + '-switch-switch-off').hide();
		$('#' + elementId + '-switch-switch-on').show();		
	}

	var switchOff = function(elementId) {
		$('#' + elementId + '-switch-switch-off').show();
		$('#' + elementId + '-switch-switch-on').hide();		
	}


	var onExit = function() {
		brokerConnect.deRegisterConnectEvent(onConnected);
		brokerConnect.deRegisterRefreshEvent(CTRL_NAME, updateStatus);		
		console.log("onExit called...");
	}

	window.onunload = onExit;

	$(document).ready(function() {
		brokerConnect.registerConnectEvent(onConnected);
	});

	var onConnected = function() {
		brokerConnect.registerRefreshEvent(CTRL_NAME, updateStatus);

		$("div[name=\'" + CTRL_NAME + "\']").each(function(index) {
			var elementId = this.id;
			var arr = elementId.split(SEPARATOR);
			var entityId = arr[0];
			var nodeId = arr[1];
			brokerConnect.getStatusById(nodeId, entityId);
		});

		console.log("OnConnected:ClientId:" + brokerConnect.getClientId());
	}

	var updateStatus = function(inode) {
		console.log("Refresh Event");
		if (inode != null) {
			var curStatus = parseInt(inode.lastStatus, 16);
			var nodeId = inode.nodeId;
			var entityId = inode.entityId;
			if (curStatus == 0) {
				switchOff(entityId + SEPARATOR + nodeId);
				console.log("Turned OFF");
			} else {
				switchOn(entityId + SEPARATOR + nodeId);
				console.log("Turned ON");
			}
		}
	}

	var doAction = function(elementId, state) {
		var arr = elementId.split(SEPARATOR);
		var entityId = arr[0];
		var nodeId = arr[1];

		console.log('Changing state for : ' + entityId + ':' + nodeId + ' to ' + state);
		brokerConnect.changeStatusById(nodeId, entityId, state);
	}

	return {
		doAction: doAction
	};

})();