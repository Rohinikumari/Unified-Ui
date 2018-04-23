/**
*	IOTEE Message/Messages Parsing & Packing Library
*	@copyright Copyright Altiux Innovations Pvt Ltd.
*   @author Ashutosh Agrawal
*   Email: ashutosh.agrawal@altiux.com
*/

/**
* Parses the JSON string into a IOTEE Message Object
*/
function parseMessage(jsonStr){
	var obj = JSON.parse(jsonStr);
	return obj;
}

/**
* Creates a IOTEE Message Object
*/
function createMsg(entityId, entityType, entityVersion){
	var msgObj = {
		'msgroot' : {
			'entity':{
				'eh':{
					"ehi":entityId,
					"eht":entityType,
					"ehv":entityVersion,
				},
				'ep': []
			},
			'nodes': []
		}
	};

	return msgObj;
}


/**
* Add Entity Pair(Payload) to IOTEE Message Object
*/
function addMsgEntityPair(msgObj, key, value){
	var pair = {};
	pair[key] = value;
	msgObj.msgroot.entity.ep.push(pair);
}


/**
* Add Entity Pair(Payload) to IOTEE Message Object
*/
function addMsgEntityPairObj(msgObj, pair){
	msgObj.msgroot.entity.ep.push(pair);
}

/**
* Add a new Node to IOTEE Message Object
*/
function addMsgNode(msgObj, node){
	msgObj.msgroot.nodes.push(node);
}

/**
* Create IOTEE Message Node
*/
function createMsgNode(nodeId, nodeTimestamp){
	var nodeObj = {
		'nh' : {
			"nhi":nodeId,
			"nht":nodeTimestamp
		},
		'np': []
	};

	return nodeObj;
}

/**
* Add Node Pair(Payload) to Node
*/
function addMsgNodePair(nodeObj, key, value){
	var pair = {};
	pair[key] = value;
	nodeObj.np.push(pair);
}


/**
* Add Node Pair(Payload) to Node
*/
function addMsgNodePairObj(nodeObj, newPair){
	nodeObj.np.push(newPair);
}


/**
* Packs the IOTEE Message format into JSON string
*/
function packMessage(msgObj){
	return JSON.stringify(msgObj);
}


/**
* Packs the IOTEE Messages format into JSON string
*/
function packMessages(msgObj){
	return JSON.stringify(msgObj);
}

/**
* Parses the JSON string into a IOTEE Messages Object
*/
function parseMessages(jsonStr){
	var obj = JSON.parse(jsonStr);
	return obj;
}


/**
* Creates a IOTEE Messages Object
*/
function createMsgs(){
	var msgsObj = {
		'root' : {
			'msgs': []
		}
	};

	return msgsObj;
}

/**
* Add Message to IOTEE Messages Object
*/
function addMsgsMsg(msgsObj, msgObj){
	msgsObj.root.msgs.push(msgObj);
}

