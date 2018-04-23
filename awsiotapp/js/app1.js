/*
Copyright 2016-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

    http://aws.amazon.com/apache2.0/

or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

var client;

(function() {
  'use strict';

  /**
   * wrapper of received paho message
   * @class
   * @param {Paho.MQTT.Message} msg
   */


    var options = {
      clientId : 'someClientId123',
      endpoint: 'a1kae7y6pqiicl.iot.us-east-1.amazonaws.com',
      accessKey: 'AKIAIBPZKZI43ZDEDFVA',
      secretKey: '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',
      regionName: 'us-east-1'
    };




  /**
   * utilities to do sigv4
   * @class SigV4Utils
   */
  function SigV4Utils(){}

  SigV4Utils.sign = function(key, msg){
    var hash = CryptoJS.HmacSHA256(msg, key);
    return hash.toString(CryptoJS.enc.Hex);
  };

  SigV4Utils.sha256 = function(msg) {
    var hash = CryptoJS.SHA256(msg);
    return hash.toString(CryptoJS.enc.Hex);
  };

  SigV4Utils.getSignatureKey = function(key, dateStamp, regionName, serviceName) {
    var kDate = CryptoJS.HmacSHA256(dateStamp, 'AWS4' + key);
    var kRegion = CryptoJS.HmacSHA256(regionName, kDate);
    var kService = CryptoJS.HmacSHA256(serviceName, kRegion);
    var kSigning = CryptoJS.HmacSHA256('aws4_request', kService);
    return kSigning;
  };

  /**
  * AWS IOT MQTT Client
  * @class MQTTClient
  * @param {Object} options - the client options
  * @param {string} options.endpoint
  * @param {string} options.regionName
  * @param {string} options.accessKey
  * @param {string} options.secretKey
  * @param {string} options.clientId
  * @param {angular.IScope}  [scope]  - the angular scope used to trigger UI re-paint, you can
  omit this if you are not using angular
  */
  function MQTTClient(options){

    console.log("INFO: "+options.endpoint);
    this.options = options;
    //this.scope = scope;

    this.endpoint = this.computeUrl();


    this.clientId = options.clientId;
    this.name = this.clientId + '@' + options.endpoint;
    this.connected = false;
    this.client = new Paho.MQTT.Client(this.endpoint, this.clientId);
    console.log("INFO "+JSON.stringify(this.clientId));

    this.listeners = {};
    var self = this;
    this.client.onConnectionLost = function() {
      self.emit('connectionLost');
      self.connected = false;
    };
    this.client.onMessageArrived = function(msg) {
      self.emit('messageArrived', msg);

      console.log("Message : "+msg.payloadString);


      updateBulb(msg.payloadString);
    };
    this.on('connected', function(){
      self.connected = true;


      client.subscribe("$aws/things/standardGateway/shadow/update/accepted")


    });
  }

  /**
   * compute the url for websocket connection
   * @private
   *
   * @method     MQTTClient#computeUrl
   * @return     {string}  the websocket url
   */
  MQTTClient.prototype.computeUrl = function(){
    console.log("INFO: "+this.options.endpoint);
    // must use utc time
    var time = moment.utc();
    var dateStamp = time.format('YYYYMMDD');
    var amzdate = dateStamp + 'T' + time.format('HHmmss') + 'Z';
    var service = 'iotdevicegateway';
    var region = this.options.regionName;
    var secretKey = this.options.secretKey;
    var accessKey = this.options.accessKey;
    var algorithm = 'AWS4-HMAC-SHA256';
    var method = 'GET';
    var canonicalUri = '/mqtt';
    var host = this.options.endpoint;

    var credentialScope = dateStamp + '/' + region + '/' + service + '/' + 'aws4_request';
    var canonicalQuerystring = 'X-Amz-Algorithm=AWS4-HMAC-SHA256';
    canonicalQuerystring += '&X-Amz-Credential=' + encodeURIComponent(accessKey + '/' + credentialScope);
    canonicalQuerystring += '&X-Amz-Date=' + amzdate;
    canonicalQuerystring += '&X-Amz-Expires=86400';
    canonicalQuerystring += '&X-Amz-SignedHeaders=host';

    var canonicalHeaders = 'host:' + host + '\n';
    var payloadHash = SigV4Utils.sha256('');
    var canonicalRequest = method + '\n' + canonicalUri + '\n' + canonicalQuerystring + '\n' + canonicalHeaders + '\nhost\n' + payloadHash;
    console.log('canonicalRequest ' + canonicalRequest);

    var stringToSign = algorithm + '\n' +  amzdate + '\n' +  credentialScope + '\n' +  SigV4Utils.sha256(canonicalRequest);
    var signingKey = SigV4Utils.getSignatureKey(secretKey, dateStamp, region, service);
    console.log('stringToSign-------');
    console.log(stringToSign);
    console.log('------------------');
    console.log('signingKey ' + signingKey);
    var signature = SigV4Utils.sign(signingKey, stringToSign);

    canonicalQuerystring += '&X-Amz-Signature=' + signature;
    var requestUrl = 'wss://' + host + canonicalUri + '?' + canonicalQuerystring;


    return requestUrl;
  };

  /**
  * listen to client event, supported events are connected, connectionLost,
  * messageArrived(event parameter is of type Paho.MQTT.Message), publishFailed,
  * subscribeSucess and subscribeFailed
  * @method     MQTTClient#on
  * @param      {string}  event
  * @param      {Function}  handler
  */
  MQTTClient.prototype.on = function(event, handler) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(handler);
  };

  /** emit event
   *
   * @method MQTTClient#emit
   * @param {string}  event
   * @param {...any} args - event parameters
   */
  MQTTClient.prototype.emit = function(event) {
    var listeners = this.listeners[event];
    if (listeners) {
      var args = Array.prototype.slice.apply(arguments, [1]);
      for (var i = 0; i < listeners.length; i++) {
        var listener = listeners[i];
        listener.apply(null, args);
      }
     /* // make angular to repaint the ui, remove these if you don't use angular
      if(this.scope && !this.scope.$$phase) {
        this.scope.$digest();
      }*/
    }
  };

  /**
   * connect to AWS, should call this method before publish/subscribe
   * @method MQTTClient#connect
   */
  MQTTClient.prototype.connect = function() {
    var self = this;
    console.log("THIS object: "+JSON.stringify(this));

    var connectOptions = {
      onSuccess: function(){
        self.emit('connected');
        console.log("INFO :Connected");


      },
      useSSL: true,
      timeout: 3,
      mqttVersion:4,
      onFailure: function() {
        self.emit('connectionLost');
        console.log("ERROR : Connection failed");
      }
    };
    this.client.connect(connectOptions);
  };

  /**
   * disconnect
   * @method MQTTClient#disconnect
   */
  MQTTClient.prototype.disconnect = function() {
    this.client.disconnect();
  };

  /**
   * publish a message
   * @method     MQTTClient#publish
   * @param      {string}  topic
   * @param      {string}  payload
   */
  MQTTClient.prototype.publish = function(topic, payload) {
    try {
      var message = new Paho.MQTT.Message(payload);
      message.destinationName = topic;
      this.client.send(message);
      console.log("Published message: "+topic,payload);
    } catch (e) {
      this.emit('publishFailed', e);
    }
  };

  /**
   * subscribe to a topic
   * @method     MQTTClient#subscribe
   * @param      {string}  topic
   */
  MQTTClient.prototype.subscribe = function(topic) {
    var self = this;
    try{
      this.client.subscribe(topic, {
        onSuccess: function(){
          console.log("Subscribed to topic: "+topic);
          self.emit('subscribeSucess');
        },
        onFailure: function(){
          console.log("Subscription failed: "+topic);
          self.emit('subscribeFailed');
        }
      });
    }catch(e) {
      this.emit('subscribeFailed', e);
    }

  };

  //angular.module('awsiot.sample', []).controller('AppController', AppController);
  client = new MQTTClient(options);

  if (!client.connected) {
    client.connect(options);

    //client = client;
  }

  /*client.publish("$aws/things/Switch/shadow/update", JSON.stringify({
    "state": {
      "desired": {
        "status": "00"
      }
    }
  }))*/


  ////////
  var  updateBulb = function(msg){


    msg = JSON.parse(msg);
    console.log("Not reaching"+msg);
    var elementId = "standardGateway-nodeId3";

	if(msg.state.hasOwnProperty('reported')){
    var status = msg.state.reported.status;

    console.log("Status :"+status);
    if( status == "ff"){
      bulbOn(elementId);
    }else{
      bulbOff(elementId);
    }
   }
  }

  var bulbOn = function(elementId) {
    $('#' + elementId + '-bulb-switch-off').hide();
    $('#' + elementId + '-bulb-switch-on').show();
    $('#' + elementId + '-bulb-off').hide();
    $('#' + elementId + '-bulb-on').show();
  }

  var bulbOff = function(elementId) {
    $('#' + elementId + '-bulb-switch-off').show();
    $('#' + elementId + '-bulb-switch-on').hide();
    $('#' + elementId + '-bulb-off').show();
    $('#' + elementId + '-bulb-on').hide();
  }



})();

function doAction(elementId, state) {
  /* var arr = elementId.split(SEPARATOR);
   var entityId = arr[0];
   var nodeId = arr[1];

   console.log('Changing state for : ' + entityId + ':' + nodeId + ' to ' + state);
   brokerConnect.changeStatusById(nodeId, entityId, state);*/

  client.publish("$aws/things/standardGateway/shadow/update", JSON.stringify({
    "state": {
      "desired": {
        "set": state,
        "nodeId": "nodeId3",
        "nodeType": "BINARY-SWITCH"
      }
    }
  }))
}