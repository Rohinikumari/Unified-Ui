$(document).ready(function(){

       // to store the realm and accesstoken in web storage (local storage) 
       var currentUrl = window.location.href;
       var realm = currentUrl.substring(currentUrl.indexOf('realm=')+6,currentUrl.lastIndexOf('&userid'));
       console.log("realm.... "+realm);
       var userId = currentUrl.substring(currentUrl.indexOf('userid=')+7,currentUrl.lastIndexOf('&accesstoken'));
       console.log("userId.... "+userId);
       var token = currentUrl.substring(currentUrl.indexOf('accesstoken=')+12,currentUrl.lastIndexOf('&refreshtoken'));
	console.log("accesstoken...."+token);
	var refreshToken = currentUrl.substring(currentUrl.indexOf('refreshtoken=')+13);	
       console.log("refresh token....  " +refreshToken);
       localStorage.setItem('realm',realm);               // to set the parameters in local storage provided by browser
       localStorage.setItem('userId',userId);
       localStorage.setItem('accessToken',token);
       localStorage.setItem('refreshToken',refreshToken);          	
});