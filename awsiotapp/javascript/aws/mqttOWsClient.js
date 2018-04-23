/**
 * Created by Rajashekharaiah.m on 04-02-2016.
 */



////////////signature version 4 start here/////////////////////////////
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




var time = moment.utc();
var dateStamp = time.format('YYYYMMDD');
var amzdate = dateStamp + 'T' + time.format('HHmmss') + 'Z';
var service = 'iotdevicegateway';
var region = "us-east-1";
var secretKey = "HK2QY7Az4228u0RTmd+93ZPdFHQP9XjuPHHP85VS";
var accessKey = "AKIAIBPZKZI43ZDEDFVA";
var algorithm = 'AWS4-HMAC-SHA256';
var method = 'GET';
var canonicalUri = '/mqtt';
var host = "a1kae7y6pqiicl.iot.us-east-1.amazonaws.com";

var credentialScope = dateStamp + '/' + region + '/' + service + '/' + 'aws4_request';
var canonicalQuerystring = 'X-Amz-Algorithm=AWS4-HMAC-SHA256';
canonicalQuerystring += '&X-Amz-Credential=' + encodeURIComponent(accessKey + '/' + credentialScope);
canonicalQuerystring += '&X-Amz-Date=' + amzdate;
canonicalQuerystring += '&X-Amz-SignedHeaders=host';

var canonicalHeaders = 'host:' + host + '\n';
var payloadHash = SigV4Utils.sha256('');
var canonicalRequest = method + '\n' + canonicalUri + '\n' + canonicalQuerystring + '\n' + canonicalHeaders + '\nhost\n' + payloadHash;
    console.log('canonicalRequest ' + canonicalRequest);


var stringToSign = algorithm + '\n' +  amzdate + '\n' +  credentialScope + '\n' +  SigV4Utils.sha256(canonicalRequest);
var signingKey = SigV4Utils.getSignatureKey(secretKey, dateStamp, region, service);
var signature = SigV4Utils.sign(signingKey, stringToSign);

canonicalQuerystring += '&X-Amz-Signature=' + signature;
    var requestUrl = 'wss://' + host + canonicalUri + '?' + canonicalQuerystring;
console.log("URL containing Signature : "+requestUrl);

////////////signature version 4 ends here/////////////////////////////

////////////MQTT Connection starts here///////////////////////////////
var client = new Paho.MQTT.Client(host, 443, canonicalUri + '?' + canonicalQuerystring, "Switch");
var connectOptions = {
    onSuccess: function(){
        console.log("connection established");
    },
    useSSL: true,
    timeout: 3,
    mqttVersion: 4,
    onFailure: function() {
        console.log("connection failed");
    }
};
client.connect(connectOptions);

////////////MQTT Connection ends here///////////////////////////////
