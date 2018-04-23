var realm = localStorage.getItem('realm');         // getting realm from web storage (local storage)
var token = localStorage.getItem('accessToken');  // getting access token from web storage (local storage)
//solution registration & deregistration
function solutionregistration() {
				var partnerId       = $("#paId").val();
                               	var stgwid          = $("#cloudgatewayId").val();
                               	var solutionId      = $("#solutionId").val();
				console.log("inside solution registration###.... ");
	$.ajax({
				type: "POST",
				url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/registerSolution/'+realm+'/'+partnerId+'/'+stgwid+'/'+solutionId,
				contentType: "text/plain",
				crossDomain: true,
				processData: false,
				headers: {
				  'Authorization': 'Bearer '+token
				},
				}).done(function(respData) {
				console.log("solution registration for registration (done).... "+respData);
				alert("solution registration status.... "+respData);
				}).error(function() {
				console.log("solution registration for registration (error).... ");
				}).complete(function() {
				console.log("solution registration for registration (completed).... ");
				});
			}	    
	    
function solutiondeRegistration() {
				var partnerId       = $("#pId").val();
                                var stgwid          = $("#cloudgwId").val();
                               	var solutionId      = $("#solId").val();
                         	console.log("inside solution deregistration####.... ");
	$.ajax({
				type: "POST",
				url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/deregisterSolution/'+realm+'/'+partnerId+'/'+stgwid+'/'+solutionId,
				contentType: "text/plain",
				crossDomain: true,
				processData: false,
				headers: {
				  'Authorization': 'Bearer '+token
				},
				}).done(function(resData1) {
				console.log("solution deregistration for deregistration (done).... "+resData1);
				alert("solution de-registration status.... "+resData1);
				}).error(function() {
				console.log("solution deregistration for deregistration (error).... ");
				}).complete(function() {
				console.log("solution deregistration for deregistration (completed).... ");
				});
			}
			
//partner registration & deregistration
function partnerregistration() {	
                               	var paId      = $("#partnerId").val();			
				console.log("inside partner registration.... ");
	$.ajax({
				type: "POST",
				url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/registerPartner/'+realm+'/'+paId,
				contentType: "text/plain",
				crossDomain: true,
				processData: false,
				headers: {
				  'Authorization': 'Bearer '+token
				},
				}).done(function(data) {
				console.log("partner registration for registration (done).... "+data);
				alert("partner registration status.... "+data);
				}).error(function() {
				console.log("partner registration for registration (error).... ");
				}).complete(function() {
				console.log("partner registration for registration (completed).... ");
				});
			}	    
	    
function partnerdeRegistration() {
                                var partnrId          = $("#partnrId").val();
                               	console.log("inside partner deregistration.... ");
	$.ajax({
				type: "POST",
				url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/deregisterPartner/'+realm+'/'+partnrId,
				contentType: "text/plain",
				crossDomain: true,
				processData: false,
				headers: {
				  'Authorization': 'Bearer '+token
				},
				}).done(function(data1) {
				console.log("partner deregistration for deregistration (done).... "+data1);
				alert("partner de-registration status.... "+data1);
				}).error(function() {
				console.log("partner deregistration for deregistration (error).... ");
				}).complete(function() {
				console.log("partner deregistration for deregistration (completed).... ");
				});
			}
			
//solution and node registration & deregistration
function solutionnoderegistration() {	
                               	var ptnrId      = $("#ptnrId").val();
                               	var solutionId  = $("#slId").val();
                               	var nodeId      = $("#nodeId").val();
				console.log("inside solution and node registration.... ");
	$.ajax({
				type: "POST",
				url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/subscribe/'+realm+'/'+ptnrId+'/'+solutionId+'/'+nodeId,
				contentType: "text/plain",
				crossDomain: true,
				processData: false,
				headers: {
				  'Authorization': 'Bearer '+token
				},
				}).done(function(response) {
				console.log("solution and node registration for registration (done).... "+response);
				alert("solution and node registration status.... "+response);
				}).error(function() {
				console.log("solution and node registration for registration (error).... ");
				}).complete(function() {
				console.log("solution and node registration for registration (completed).... ");
				});
			}	    
	    
function solutionnodedeRegistration() {
                                var partnerId   = $("#ptId").val();
                               	var solutionId  = $("#sltId").val();
                               	var nodeId      = $("#ndId").val();
				console.log("inside solution and node deregistration.... ");
	$.ajax({
				type: "POST",
				url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/unsubscribe/'+realm+'/'+partnerId+'/'+solutionId+'/'+nodeId,
				contentType: "text/plain",
				crossDomain: true,
				processData: false,
				headers: {
				  'Authorization': 'Bearer '+token
				},
				}).done(function(responseData) {
				console.log("solution and node deregistration for deregistration (done).... "+responseData);
				alert("solution and node de-registration status.... "+responseData);
				}).error(function() {
				console.log("solution and node deregistration for deregistration (error).... ");
				}).complete(function() {
				console.log("solution and node deregistration for deregistration (completed).... ");
				});
			}
			
//node registration & deregistration
function noderegistration() {	
                               	var partnerId   = $("#ptnId").val();
                               	var nodeId      = $("#ndeId").val();
				console.log("inside node registration.... ");
	$.ajax({
				type: "POST",
				url: 'http://'+dmbackendAddr+'/DMBackEndGw/DMDevice/registerDevice/'+realm+'/'+partnerId+'/'+nodeId,
				contentType: "text/plain",
				crossDomain: true,
				processData: false,
				headers: {
				  'Authorization': 'Bearer '+token
				},
				}).done(function(plain) {
				console.log("Node registration for registration (done).... "+plain);
				alert("node registration status.... "+plain);
				}).error(function() {
				console.log("Node registration for registration (error).... ");
				}).complete(function() {
				console.log("Node registration for registration (completed).... ");
				});
			}	    
	    
function nodedeRegistration() {
                                var partnerId   = $("#prtnrId").val();
                               	var nodeId      = $("#nodId").val();
				console.log("inside node deregistration.... ");
	$.ajax({
				type: "POST",
				url: 'http://'+dmbackendAddr+'/DMBackEndGw/DMDevice/deregisterDevice/'+realm+'/'+partnerId+'/'+nodeId,
				contentType: "text/plain",
				crossDomain: true,
				processData: false,
				headers: {
				  'Authorization': 'Bearer '+token
				},
				}).done(function(plainData) {
				console.log("Node deregistration for deregistration (done).... "+plainData);
				alert("node de-registration status.... "+plainData);
				}).error(function() {
				console.log("Node deregistration for deregistration (error).... ");
				}).complete(function() {
				console.log("Node deregistration for deregistration (completed).... ");
				});
			}