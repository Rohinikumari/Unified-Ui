
//var configIP = "172.16.0.138:18081";//"PVT_IPV4"


$(document).ready(function(){
    getPlatformDeatils()
});


function getPlatformDeatils(){
   var platformIp,pltformPort,username,password;

   $.ajax({
     type: "GET",
     url: 'http://'+standardGw+'?c=getCfg',
     contentType:'application/json',
     crossDomain: true,
     processData: false,
     //data: '{sid:'+switchId+',fname:'+friendlyName+',t:'+switchType+',ip:'+ipAddress+'}',
     success: function (json) {
        console.log('STATUS UPDATE SUCCESS:');
         platformIp = $.trim(json.ioteeCfg.platformIp);
         pltformPort = $.trim(json.ioteeCfg.platformPort);
         username = $.trim(json.ioteeCfg.username);
         password = $.trim(json.ioteeCfg.password);
         if(json != null || typeof(json) != undefined){
           $('#platformDetails tbody').append('<tr><td><input type="text" class="inptxt" readonly value="'+platformIp+'"></input></td>'
             +'<td><input type="text" class="inptxt" readonly value="'+ pltformPort +'"></input></td>'
             +'<td><input type="text" class="inptxt" readonly value="'+ username +'"></input></td>'
             +'<td><input type="text" class="inptxt" readonly value="'+ password +'"></input></td>'
             +'<td> <span class="btn btn-small btn-primary xcrud-action btn-warning pltformedtbtn"><i class="glyphicon glyphicon-edit"></i></span></td>'
             +'</tr>');
         }
       },
       }).done(function( json ) {
        console.log("STATUS UPDATE done:"+json);
       }).error(function() {
        console.log("STATUS UPDATE FAILED:");
       }).complete(function() {
        console.log("STATUS UPDATE COMPLETED:");
       });


}


function addPlatform(){
    var ip        = $("#ip").val();
    var port      = $("#port").val();
    var username  = $("#usrnm").val();
    var password  = $("#psswrd").val();


    var json = "{\"platformIp\":\""+ip+"\",\"platformPort\":\""+port+"\",\"username\":\""+username+"\",\"password\":\""+password+"\"}";


    console.log(json);

    $("#ip").val('');
    $("#port").val('');
    $("#usrnm").val('');
    $("#psswrd").val('');


    // if create ajax ia sucessful call list of projects ajax.
    /*
     $.ajax({
     type: "POST",
     url: baseUrl+'projectContext/project/create',
     contentType:'application/json',
     //dataType:'jsonp',
     crossDomain: true,
     processData: false,
     data: json,
     success: function (json) {
     //var userId = sessionStorage.getItem('userId');
     console.log(json.projectId);
     getListOfProjects();
     },

     }).done(function( json ) {
     console.log("STATUS UPDATE SUCCESS:"+json);
     })
     .error(function() {
     console.log("STATUS UPDATE FAILED:");
     })
     .complete(function() {
     console.log("STATUS UPDATE COMPLETED:");
     });
     */
}

/* function to edit the platform table*/
 $(document).on('click','.pltformedtbtn',function(){
   console.log('pltformedtbtn clicked');
    var currrow = $(this).parents('tr');
    $(currrow).find('td').each(function(){
      $(this).find('input').removeClass('inptxt').addClass('inpEditTxt');
      $(this).find('input').removeAttr('readonly');
    });
    $(currrow).find('td:nth-child(5) span.pltformedtbtn').hide();
    $(currrow).find('td:nth-child(5) span.pltformedtbtn').before('<span class="btn btn-small btn-primary'
                  +' xcrud-action btn-success pltformSavebtn">Save'
                  +'</span>');
     $(currrow).find('td:nth-child(5) span.pltformedtbtn').before('<span class="btn btn-small btn-primary'
                  +' xcrud-action btn-danger pltfromCancelbtn" style="margin:5px">Cancel'
                  +'</span>');

    sessionStorage['ip'] = $.trim($(currrow).find('td:nth-child(1) input').val());
    sessionStorage['port'] = $.trim($(currrow).find('td:nth-child(2) input').val());
    sessionStorage['userName'] = $.trim($(currrow).find('td:nth-child(3) input').val());
    sessionStorage['password'] =  $.trim($(currrow).find('td:nth-child(4) input').val());

 });

$(document).on('click','.pltformSavebtn',function(){
    var currrow,ip,port,uname,pwd;
    currrow = $(this).parents('tr');
   /* $(currrow).find('td').each(function(){
       id = $(this).find('input').val();

    });*/
    ip = $.trim($(currrow).find('td:nth-child(1) input').val());
    port = $.trim($(currrow).find('td:nth-child(2) input').val());
    uname = $.trim($(currrow).find('td:nth-child(3) input').val());
    pwd = $.trim($(currrow).find('td:nth-child(4) input').val());

    console.log('ip::'+ip + "\n port:"+port+"\n uname:"+uname+"\n pwd:"+pwd);
    if(ip!= '' && port!='' && uname!='' && pwd !='' ){
        console.log('make ajax call');
        updatePlatform(ip,port,uname,pwd)
        //call below on suceess of ajax call
        // togglePltformEditCancel(currrow);


    }

})


$(document).on('click','.pltfromCancelbtn',function(){
  console.log('pltfromCancelbtn clicked');
  var currrow = $(this).parents('tr');
  togglePltformEditCancel(currrow);
  $(currrow).find('td:nth-child(1) input').val(sessionStorage['ip']);
  $(currrow).find('td:nth-child(2) input').val(sessionStorage['port']);
  $(currrow).find('td:nth-child(3) input').val(sessionStorage['userName']);
  $(currrow).find('td:nth-child(4) input').val(sessionStorage['password']);

});


function togglePltformEditCancel(currrow){
         $(currrow).find('td').each(function(){
          $(this).find('input').removeClass('inpEditTxt').addClass('inptxt');
          $(this).find('input').prop('readonly',true);
       });
       $(currrow).find('td:nth-child(5) input').show();
       $(currrow).find('td:nth-child(5) span.pltformSavebtn').remove();
       $(currrow).find('td:nth-child(5) span.pltfromCancelbtn').remove();
       $(currrow).find('td:nth-child(5) span.pltformedtbtn').show();
}

//http://localhost:18081?c=updtCfg&pip=localhost&pport=9090&u=user11&p=Rohini

function updatePlatform(ip,port,userName,password){

  $.ajax({
     type: "GET",
     url: 'http://'+standardGw+'?c=updtCfg&pip='+ ip +'&pport='+ port + '&u='+ userName + '&p='+ password,
     contentType:'application/json',
     crossDomain: true,
     processData: false,
     //http://localhost:18081?c=updtCfg&pip=localhost&pport=9090&u=user11&p=Rohini
     success: function (json) {
        console.log('STATUS UPDATE SUCCESS:');
        $('#platformDetails').find("tr:gt(0)").remove();
        getPlatformDeatils();

       },
     }).done(function( json ) {
        console.log("STATUS UPDATE done:"+json);
        //toggleNodeEditCancel(currrow);
      })
      .error(function() {
        console.log("STATUS UPDATE FAILED:");
      })
      .complete(function() {
        console.log("STATUS UPDATE COMPLETED:");
      });

}
