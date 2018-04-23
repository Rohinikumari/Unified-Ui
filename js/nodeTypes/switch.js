var simpleSwitch = (function() {

	var CTRL_NAME = "Switch";
	var SEPARATOR = '-';

	var switchOn = function(elementId) {
		$('#' + elementId + '-cube-switch').addClass('active');
		$('#'+elementId+'-indicator').removeClass('dimindicator').addClass('brightindicator');
		$('#light-bulb2').css({'opacity': '0'});

	}

	var switchOff = function(elementId) {
                $('#' + elementId + '-cube-switch').removeClass('active');
		$('#'+elementId+'-indicator').removeClass('brightindicator').addClass('dimindicator');
                $('#light-bulb2').css({'opacity': '1'});
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
		console.log("Refresh Event for SWITCH");
		if (inode != null) {
			var curStatus = parseInt(inode.lastStatus, 16);
			var nodeId = inode.nodeId;
			var entityId = inode.entityId;
			if (curStatus == 0) {
				$('#'+entityId+'-'+nodeId+'-cube-switch').removeClass('active');
				$('#'+entityId+'-'+nodeId+'-indicator').removeClass('brightindicator').addClass('dimindicator');
                $('#light-bulb2').css({'opacity': '1'});
                console.log("class not active");
			} else {
				$('#'+entityId+'-'+nodeId+'-cube-switch').addClass('active');
				$('#'+entityId+'-'+nodeId+'-indicator').removeClass('dimindicator').addClass('brightindicator');
                $('#light-bulb2').css({'opacity': '0'});
                console.log("class active");
			}
		}
	}

	var doAction = function(elementId) {
		var arr = elementId.split(SEPARATOR);
		var entityId = arr[0];
		var nodeId = arr[1];

            if ($('#'+entityId+'-'+nodeId+'-cube-switch').hasClass('active')) {
               state = '00';
            } else {
               state ='ff';
            }

		console.log('Changing state for : ' + entityId + ':' + nodeId + ' to ' + state);
		brokerConnect.changeStatusById(nodeId, entityId, state);
	}

	return {
		doAction: doAction
	};


})();