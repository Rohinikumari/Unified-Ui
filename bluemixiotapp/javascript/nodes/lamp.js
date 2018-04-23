var lamp = (function() {

	var CTRL_NAME = "Lamp";
	var SEPARATOR = '-';


	var lampChange = function(elementId, value) {		
		$('#' + elementId + '-lamp-chanceSlider').val(value);
		//$('#' + elementId + '-lamp-chanceSlider').slider("refresh");
		$('#' + elementId + '-lamp-chance').val(value);
		var dim = value / 100;
		$('#' + elementId + '-lamp-on').fadeTo("slow", dim, function() {
			// Animation complete.
		});
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
			lampChange(entityId + SEPARATOR + nodeId, curStatus);
		}
	}

	var doAction = function(elementId, state) {
		var arr = elementId.split(SEPARATOR);
		var entityId = arr[0];
		var nodeId = arr[1];		
		var decState = parseInt(state, 10);
		var hexState = decState.toString(16);
		console.log('Changing state for : ' + entityId + ':' + nodeId + ' to ' + hexState);
		brokerConnect.changeStatusById(nodeId, entityId, hexState);
	}

	return {
		doAction: doAction
	};

})();