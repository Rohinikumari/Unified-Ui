function getSecretKey(){   
   
   var masterToken = localStorage.getItem('master_access_token');         // getting preAuthCode from web storage (local storage)
   var realm = localStorage.getItem('realm');                // getting realm from web storage (local storage)
   console.log("master token.... " +masterToken);	
   console.log("realm..... " +realm);
	
   var client   = $("#client").val();   
   localStorage.setItem('client',client);
   console.log("client id of the get client secret key.... " +client);
	
   $.ajax({
     type: "GET",
     url: authbackend+'/AuthBackEndGw/getClientSecretKey/'+realm+'/'+client,
     ContentType : 'text/plain',
     crossDomain: true,
     processData: false,
     headers: {
          'Authorization': 'Bearer '+masterToken
     },          
     }).done(function(json){        
	console.log("response body of secret key done.... " +json); 	
       }).error(function() {
        console.log("response body of secret key failed.... ");
       }).complete(function(){
	console.log("response body of secret key completed.... ");
       });
}