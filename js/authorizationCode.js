function getAuthCode(){
	
   var realm = localStorage.getItem('realm');         // getting realm from web storage (local storage)
   var token = localStorage.getItem('accessToken');  // getting access token from web storage (local storage)
   var client = localStorage.getItem('client');  // getting access token from web storage (local storage)
   var clientSecret = localStorage.getItem('clientSecret');  // getting access token from web storage (local storage)
   console.log("realm.... " +realm);
   console.log("accesstoken.... " +token);
   console.log("client.... " +client);
   console.log("clientsecretkey.... " +clientSecret);

   $.ajax({
     type: "GET",
     url: authorizationCode+'/AuthBackEndGw/getAuthorizationCode/'+realm+'/'+client+'/'+clientSecret+'?redirect_uri='+redirectPage,
     ContentType:'application/json',
     crossDomain: true,
     processData: false,          
       }).done(function(json) {        
	var response = JSON.stringify(json);
	console.log("AUTHORIZATION CODE RESPONSE : "+response);
       }).error(function() {
        console.log("AUTHORIZATION CODE FAILED :");
       }).complete(function() {
       });
}


http://192.168.0.105:3000/pmwhomepage.html?code=quO37tXGd4syZC_DLozaqTS6RQrU6A8HygbnnfHhX_A.1a8794aa-6670-49e0-b739-0cf5f0491f95