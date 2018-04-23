function mobiledeviceRegistration(){
   
   var deviceId         = $("#deviceId").val();
   var appId            = $("#appId").val();
   var appType          = $("#appType").val();
   var deviceToken      = $("#deviceToken").val();   
   var reqbody = JSON.stringify({
                    "deviceId":deviceId,
		    "sppId":appId,
		    "appType":appType,
		    "deviceToken":deviceToken
    });
    console.log("RESPONSE BODY.... " +reqbody);
   $.ajax({
     type: "POST",
     url: authbackend+'/AuthBackEndGw/deviceRegister',
     contentType:'application/json',
     crossDomain: true,
     processData: false,
     data : reqbody,     
     }).done(function(xml){        
	var preAuthCode = "";
	$(xml).find("deviceRegister").each(function() {
	$(this).find("preAuthCode").each(function(){
	preAuthCode =  $(this).text();						
	localStorage.setItem('preAuthCode',preAuthCode);	
	var authCode = localStorage.getItem('preAuthCode');
	console.log("Device registration's pre auth.... "+authCode);
	alert("Device registration success and the pre auth code is..... "+authCode);	
	});
        });        
       }).error(function() {
        console.log(" FAILED :");
       }).complete(function() {
       });
}

function appRegistration(){
	
   var preAuth = localStorage.getItem('preAuthCode');         // getting preAuthCode from web storage (local storage)
   var realm = localStorage.getItem('realm');                // getting realm from web storage (local storage)
   	
   var client           = $("#client").val();
   var devTken          = $("#devTken").val();
   var appName          = $("#appName").val(); 
   var appty            = $("#appty").val(); 
   var redirectUrl      = $("#redirectUrl").val();

   localStorage.setItem('client',client);
   var clientPreAuth = client + preAuth;
	
   var reqbdy = JSON.stringify({
                    "preAuthCode":preAuth,
		    "deviceToken":devTken,
		    "appName":appName,
		    "appType":appty,
		    "description":"FCM Testing",
		    "redirectUrl":redirectUrl
    });
    console.log("RESPONSE BODY.... " +reqbdy);
   $.ajax({
     type: "POST",
     url: authbackend+'/AuthBackEndGw/mobileAppRegister/'+realm+'/'+clientPreAuth,
     contentType:'application/json',
     crossDomain: true,
     processData: false,
     data : reqbdy,     
     }).done(function(xml){        
	var clientSecret="";	   
	$(xml).find("deviceAppRegister").each(function() {
	$(this).find("clientSecret").each(function(){
	clientSecret =  $(this).text();							
	localStorage.setItem('clientSecret',clientSecret);
	var clientSecretKey = localStorage.getItem('clientSecret');
	console.log("clientSecretKey====> "+clientSecretKey);
        alert("App registration is successfully done..... "+clientSecretKey);		
	});
       }); 	
       }).error(function() {
        console.log("App registration is failed.... ");
       }).complete(function() {
       });
}