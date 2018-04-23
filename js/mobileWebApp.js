var calisttable;
var sollisttable;

$(document).ready(function(){     

    calisttable = $('#calist').dataTable( {bFilter: false, bInfo: false, "bLengthChange": false,
              "aoColumnDefs": [
                  { 'bSortable': false, 'aTargets': [ 1,2 ] }
              ]
          });    
});

$(document).ready(function(){     

    sollisttable = $('#sollist').dataTable( {bFilter: false, bInfo: false, "bLengthChange": false,
              "aoColumnDefs": [
                  { 'bSortable': false, 'aTargets': [ 1,2 ] }
              ]
          });    
}); 

var realm = localStorage.getItem('realm');         // getting realm from web storage (local storage)
var token = localStorage.getItem('accessToken');  // getting access token from web storage (local storage)
var tokenMaster = localStorage.getItem('master_code');      // getting preAuthCode from web storage (local storage)
var client = localStorage.getItem('client');  // getting access token from web storage (local storage)
var clientSecret = localStorage.getItem('client_secret_key');  // getting access token from web storage (local storage)
var authorizationCode = localStorage.getItem('authorizationCode');  // getting authorization code from web storage (local storage)

// send new solution request to unaas admin
function sendSolutionRequest(){

   console.log("inside send solution request.... ");
   var partnerId                        = $("#partnerId").val();
   var solutiontype                     = $("#solutiontype").val();
   var solutionvertical                 = $("#solutionvertical").val();
   var SolutionFriendlyName             = $("#SolutionFriendlyName").val();
   var emailId                          = $("#emailId").val();
   $.ajax({
     type: "POST",
     url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/solutionRequest/'+realm+'/'+partnerId+'/'+solutiontype+'/'+solutionvertical+'/'+SolutionFriendlyName+'/'+emailId,
     contentType:'text/plain',
     crossDomain: true,
     processData: false,
     headers: {
          'Authorization': 'Bearer '+token
	 },
        success: function (plain) {
        console.log('inside send solution request (success)....' +plain);
       },
       }).done(function(plain) {
	alert(plain);
        console.log("inside send solution request (done).... " +plain);
       }).error(function() {
        console.log("inside send solution request (error).... ");
       }).complete(function() {
        console.log("inside send solution request (complete).... ");
       });
}

//to activate solution (in return it gives active solution id) 
//realm is equal to partnerId
function appSolActivation(){

	console.log("inside app sol activation.... ");
	var inactiveId   = $("#inactiveId").val();	
	$.ajax({
	     type: "POST",
	     url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/activateSolution/'+realm+'/'+realm+'/'+inactiveId,
	     contentType:'text/plain',
	     crossDomain: true,
	     processData: false,
	     headers: {
		  'Authorization': 'Bearer '+token
		},
		success: function (plain) {
		console.log('inside app sol activation (success)....' +plain);
	       },
	       }).done(function(plain) {		
		console.log("inside app sol activation (done).... " +plain);
		alert(plain);
	       }).error(function() {
		console.log("inside app sol activation (error).... ");
	       }).complete(function() {
		console.log("inside app sol activation (complete).... ");
	       });
}

//this token is used when we need to create client or get secret key of client from keycloak
function getMasterToken(){   	
	   
	console.log("inside get master token for keycloak function.... ");	
	$.ajax({
	     type: "POST",
	     url: authbackend+'/AuthBackEndGw/getToken/'+realmMaster+'/'+username+'/'+password,
	     crossDomain: true,
	     processData: false,
	}).done(function(json) {
		var response = JSON.stringify(json);
		console.log("response get master token for keycloak (done).... "+response);
		var json2       = JSON.parse(response);
		var accessToken = json2.access_token;
		console.log("inside get Master Token response : "+accessToken);
		localStorage.setItem('master_code',accessToken);
		var masterToken = localStorage.getItem('master_code');
		alert("masterToken.... "+masterToken);
		}).error(function() {
		console.log("inside get master token for keycloak failed.... ");
	}).complete(function() {
	        console.log("completed master token for keycloak completed.... ");
	});
}

//creating client in keycloak
function createClient(){	
  
   console.log("inside create client.... ");   
   
   var clientName   = $("#clientId").val();   
   localStorage.setItem('clientName',clientName);
   console.log("client id.... " +clientName);
   var reqbody = "{"+
			"\"enabled\":true,"+
			"\"attributes\":{},"+
			"\"redirectUris\":[],"+
			"\"clientId\":\""+clientName+"\","+
			"\"protocol\":\"openid-connect\""+
		"}";
   console.log(reqbody);
   $.ajax({
     type: "POST",
     url: authbackend+'/AuthBackEndGw/createClient/'+realm,
     contentType:'application/json',
     crossDomain: true,
     processData: false,
     data : reqbody,
     headers: {
          'Authorization': 'Bearer '+tokenMaster
	 },	  	 
       }).done(function() {        
	console.log("client created in keycloak (done).... ");
	}).error(function() {
        console.log("client created in keycloak failed.... ");
       }).complete(function() {
       console.log("client created in keycloak is completed.... ");
       });
} 

//adding template to backend
function addTemplate(){        
        var solId   = $("#solId").val();
	var templateId   = $("#templateId").val();	
	var templatetype   = $("#templatetype").val();	
	var resourcePackage = localStorage.getItem('data');         // getting realm from web storage (local storage)
	console.log("inside add template function.... ");
	
	var body = "<?xml version=\"1.0\"?>"+
			"<template>"+
			"<templateid>"+templateId+"</templateid>"+
			"<templatetype>"+templatetype+"</templatetype>"+
			"<solutionid>"+solId+"</solutionid>"+
			"<isdefault>YES</isdefault>"+
			"<resourcepackage>"+resourcePackage+"</resourcepackage>"+
			"</template>";  
	$.ajax({
	     type: "POST",
	     url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/addTemplate/'+realm+'/'+solId,
	     contentType:'text/xml',
	     crossDomain: true,
	     processData: false,
	     data: body,
	     headers: {
		  'Authorization': 'Bearer '+token
		 },        
	}).done(function(res) {
		console.log("add template response.... " +res);
		alert(res);
	}).error(function() {
		console.log("add template  failed.... ");
	}).complete(function() {
		 console.log("add template completed.... ");
	});	
}

//it subscribes the topic on dcg as well as standard gateway
function solutionRegistration(){
    
    console.log("inside solution registration.... ");
    var sId          = $('#sId').val();
    var stgwid       = $('#stgwid').val();
    var pId          = $("#pId").val();

  $.ajax({
				type: "POST",
				url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/opgateway/registerSolution/'+realm+'/'+pId+'/'+stgwid+'/'+sId,
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

//creating website on pmw
function createmobilewebsiteImplicit(){
	
   var realm = localStorage.getItem('realm');         // getting realm from web storage (local storage)   
   var client = localStorage.getItem('client');  // getting client from web storage (local storage)
   var access = localStorage.getItem('accessToken');  // getting access token from web storage (local storage)
   var refreshToken = localStorage.getItem('refreshToken');  // getting refreshToken from web storage (local storage)
   
   console.log("realm.... " +realm);  
   console.log("client.... " +client);
   console.log("access.... " +access);    
   console.log("refreshToken.... " +refreshToken);  
   
	
   var requestbody = JSON.stringify({
				      "access_token":access,
				      "refresh_token":refreshToken
				});
     /*$.ajax({
			type: "POST",
			url: pmwPath+'/PMW-Citizen/login/websiteSolution/'+realm+'/'+client+'@unaas.com',
			contentType:'application/json',
			crossDomain: true,
			processData: false,
			data: requestbody,
                }).done(function(xml) {  
		   console.log("website created... "+xml);
                    alert(xml);		   
		}).error(function() {
		   console.log("website creation failed... ");
		}).complete(function() {
                   console.log("website creation completed... ");		
		});*/
	$.ajax({
			type: "POST",
			url: pmwPath+'/PmwServer/login/websiteSolution/'+realm+'/'+client+'@unaas.com',
			contentType:'application/json',
			crossDomain: true,
			processData: false,
			data: requestbody,
                }).done(function(xml) {  
		   console.log("website created... "+xml);
		   var response = xml;
                   localStorage.setItem('Link',response);			
		}).error(function() {
		   console.log("website creation failed... ");
		}).complete(function() {
                   console.log("website creation completed... ");		
		});
 }  

 //accessing mobile website
function accessmobilewebsiteImplicit(){
	
   var link = localStorage.getItem('Link');         // getting realm from web storage (local storage)   
   //var client = localStorage.getItem('clientName');  // getting access token from web storage (local storage)
   //var access = localStorage.getItem('accessToken');  // getting access token from web storage (local storage)
   //var refreshToken = localStorage.getItem('refreshToken');  // getting refreshToken from web storage (local storage)
   
   console.log("link.... " +link);   
   window.location.href = link;		
 } 
 
 //mapping solution to cloud connector
 function mapsolutionwithcloudconnector(){

	console.log("inside map solution with cloudconnector.... ");
	var solutnId   = $("#solutnId").val();	
	var soltype    = $("#soltype").val();
	 
	$.ajax({
	     type: "POST",
	     url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/cc/mapSolution/'+realm+'/'+solutnId+'/'+soltype,
	     contentType:'text/plain',
	     crossDomain: true,
	     processData: false,
	     headers: {
		  'Authorization': 'Bearer '+token
		},		
	       }).done(function(plain) {		
		console.log("inside map solution with cloudconnector done.... " +plain);
		alert(plain);
	       }).error(function() {
		console.log("inside map solution with cloudconnector error.... ");
	       }).complete(function() {
		console.log("inside map solution with cloudconnector complete.... ");
	       });
}

//get secret key of registered client id
function getSecretKey(){	
  
   console.log("inside get secret key.... ");   
   var client   = $("#client").val();   
   localStorage.setItem('client',client);
   console.log("client id of the get client secret key.... " +client);
   
   $.ajax({
     type: "GET",
     url: authbackend+'/AuthBackEndGw/getClientSecretKey/'+realm+'/'+client,
     ContentType:'text/plain',
     crossDomain: true,
     processData: false,
     headers: {
          'Authorization': 'Bearer '+tokenMaster
	 },       
       }).done(function(plain) {        
	console.log("response body of secret key done.... " +plain);
	//var responsebody = JSON.stringify(plain);	 
	var jsonobject = JSON.parse(plain);			      
	var secretKey = jsonobject.value;	
	console.log("secret key....  "+secretKey);
	localStorage.setItem('client_secret_key',secretKey);
	alert("secret key.... "+secretKey);
       }).error(function() {
        console.log("response body of secret key failed.... ");
       }).complete(function() {
       console.log("response body of secret key completed.... ");
       });
} 

//to get authorization code
function getAuthCode(){
	
   console.log("realm.... " +realm);
   console.log("client.... " +client);
   console.log("clientsecretkey.... " +clientSecret);    
   window.location = authbackend+'/AuthBackEndGw/getAuthorizationCode/'+realm+'/'+client+'/'+clientSecret+'?redirect_uri='+redirectPage;
	
 }   
 
 //to get access code
 function getAccessCode(){	
   
   console.log("realm.... " +realm);  
   console.log("client.... " +client);
   console.log("clientsecretkey.... " +clientSecret);
   console.log("authorizationCode.... " +authorizationCode);
 var requestbody ='authorization_code='+authorizationCode+'&client_secret='+clientSecret+'&redirect_uri=';   
   $.ajax({
			type: "POST",
			url: authbackend+'/AuthBackEndGw/getTokenforAuthCode/'+realm+'/'+client,
			contentType:'application/json',
			crossDomain: true,
			processData: false,
			data: requestbody,        
		}).done(function(json) {       
			var responsebody = JSON.stringify(json);	 
			var jsonobject = JSON.parse(responsebody);			      
			var accessToken = jsonobject.access_token;	
			var refreshToken = jsonobject.refresh_token;
                        alert("accessToken....  "+accessToken);
	                alert("refreshToken....  "+refreshToken);		
				console.log("access_Token....  "+accessToken);
				console.log("refresh_Token....  "+refreshToken);
			localStorage.setItem('access',accessToken);
			localStorage.setItem('refresh_Token',refreshToken);
                }).error(function() {
				console.log("In side error part");
		}).complete(function() {                              
                });
 } 
 
 //accessing mobile website 
 function accessmobilewebsite(){
	
   var access = localStorage.getItem('access');  // getting access token from web storage (local storage)
   var refreshToken = localStorage.getItem('refresh_Token');  // getting refreshToken from web storage (local storage)
   
   console.log("realm.... " +realm);  
   console.log("client.... " +client);
   console.log("access.... " +access);    
   console.log("refreshToken.... " +refreshToken);
   
   var privateid = client.toLowerCase();
   console.log("privateid client====> "+privateid); 
   window.location.href = pmwPath+"/MW/"+client+"/"+privateid+"personalise/index.html";		
 }