var nodetable;
var calisttable;

$(document).ready(function(){
  nodetable = $('#nodelist').dataTable( {bFilter: false, bInfo: false, "bLengthChange": false,
              "aoColumnDefs": [
                  { 'bSortable': false, 'aTargets': [ 4,5 ] }
              ]
          });
	  getPartnerDevices();
});

$(document).ready(function(){
  calisttable = $('#calist').dataTable( {bFilter: false, bInfo: false, "bLengthChange": false,
              "aoColumnDefs": [
                  { 'bSortable': false, 'aTargets': [ 4,5 ] }
              ]
          });
	  //getDeviceInfo();
});

var realm = localStorage.getItem('realm');         // getting realm from web storage (local storage)
var token = localStorage.getItem('accessToken');  // getting access token from web storage (local storage)

//adding device of partner
function addInventoryDevice(){

    var partnerId                        = $("#partnerId").val();
    var deviceId                         = $("#deviceId").val();
    var devicetype                       = $("#devicetype").val();
    var cc                               = $("#cc").val();
    var friendlyname                     = $("#friendlyname").val();
    var serialnumber                     = $("#serialnumber").val();
    var udn                              = $("#udn").val();
    var upc                              = $("#upc").val();
    var protocol                         = $("#protocol").val();
    var manufacturer                     = $("#manufacturer").val();
    var layoutname                       = $("#layoutname").val();
    var zone                             = $("#zone").val();
    var manufacturerURL                  = $("#manufacturerURL").val();
    var modelid                          = $("#modelid").val();
    var modelurl                         = $("#modelurl").val();
    var category                         = $("#type").val();
    var networkdeviceaddress             = $("#networkdeviceaddress").val();
    var switchid                         = $("#switchid").val();
    var ipaddress                        = $("#ipaddress").val();
    var applicationsessionkey            = $("#applicationsessionkey").val();
    var networksessionkey                = $("#networksessionkey").val();
    var certificate                      = $("#certificate").val();
    var appeui                           = $("#appeui").val();
    var applicationkeys                  = $("#applicationkeys").val();
    var dnounce                          = $("#dnounce").val();
    var appnounce                        = $("#appnounce").val();
    var modeltype                        = $("#modeltype").val();
    var modelname                        = $("#modelname").val();
    var sensors                          = $("#sensors").val();
    var relays                           = $("#relays").val();
    var dimmers                          = $("#dimmers").val();

    var body = "<?xml version=\"1.0\"?>"+
		"<device>"+	
			"<category>"+category+"</category>"+
			"<deviceType>"+devicetype+"</deviceType>"+
			"<friendlyName>"+friendlyname+"</friendlyName>"+
			"<layoutGrp>"+
					"<numLevels>2</numLevels>"+
					"<l1>"+layoutname+"</l1>"+
					"<l2>"+zone+"</l2>"+
			"</layoutGrp>"+
			"<protocol>"+protocol+"</protocol>"+
			"<manufacturer>"+manufacturer+"</manufacturer>"+
			"<manufacturerUrl>"+manufacturerURL+"</manufacturerUrl>"+
			"<modelId>"+modelid+"</modelId>"+
			"<modelName>"+modelname+"</modelName>"+
			"<modelType>"+modeltype+"</modelType>"+
			"<modelUrl>"+modelurl+"</modelUrl>"+
			"<serialNumber>"+serialnumber+"</serialNumber>"+
			"<udn>"+udn+"</udn>"+
			"<upc>"+upc+"</upc>"+
			"<netadd>"+networkdeviceaddress+"</netadd>"+
			"<switchId>"+switchid+"</switchId>"+
			"<ipAddress>"+ipaddress+"</ipAddress>"+
			"<mimeType>unknown</mimeType>"+
			"<width>unknown</width>"+
			"<height>unknown</height>"+
			"<depth>unknown</depth>"+
			"<url>unknown</url>"+
			"<imageData>unknown</imageData>"+
			"<appkey>"+applicationsessionkey+"</appkey>"+
			"<netkey>"+networksessionkey+"</netkey>"+
			"<cert>"+certificate+"</cert>"+	
			"<appeui>"+appeui+"</appeui>"+
			"<applicationkeys>"+applicationkeys+"</applicationkeys>"+
			"<dnounce>"+dnounce+"</dnounce>"+
			"<appnounce>"+appnounce+"</appnounce>"+
			"<sensors>"+sensors+"</sensors>"+
			"<relays>"+relays+"</relays>"+
			"<dimmers>"+dimmers+"</dimmers>"+
		"</device>";
   $.ajax({
     type: "POST",
     url:"http://"+dmbackendAddr+"/DMBackEndGw/DMDevice/addDevice/"+realm+"/"+partnerId+"/"+deviceId+"/"+cc,
     contentType:"text/xml",
     crossDomain: true,
     processData: false,
     data: body,
     headers: {
          'Authorization': 'Bearer '+token
	},
	success: function (plain) {
	var bdy = JSON.stringify(plain);
	console.log("Add Inventory Device (BODY) .. " +bdy);
        getPartnerDevices();
       },
      }).done(function() {
	console.log("SUCCESSFULLY ADDED INVENTORY DEVICE (DONE) ..");
	})
      .error(function(plain) {
         console.log("ERROR IN ADDING INVENTORY DEVICE : "+plain);
      })
      .complete(function() {
        console.log("SUCCESS(ADDED INVENTORY DEVICE) (COMPLETE) .... ");
      });
}

//getting partner devices
function getPartnerDevices(){
   	console.log("inside get partner devices.... ");
   $.ajax({
     type: "GET",
     url: "http://"+dmbackendAddr+"/DMBackEndGw/DMDevice/getDevices/"+realm+"/"+realm,
     contentType:'application/json',
     crossDomain: true,
     processData: false,
     headers: {
          'Authorization': 'Bearer '+token
	 },
     success: function (json) {
     nodetable.fnClearTable();
    for(i = 0; i<json.devices.length; i++){	     
            nodetable.fnAddData([
	      realm,
	      json.devices[i].deviceId,
	      json.devices[i].cloudConnector,
	      json.devices[i].deviceType,
	      //json.devices[i].friendlyName,	    
	     '<input type="text" class="inptxt" readonly value="' +json.devices[i].friendlyName +'"></input>',
             '<input type="text" class="inptxt" readonly value="' +json.devices[i].udn +'"></input>',
	      json.devices[i].categoryType,
	      '<span class="btn btn-small btn-primary xcrud-action btn-warning nodeedtbtn"><i class="glyphicon glyphicon-edit" style="margin-left: -7px;"></i></span> &nbsp;'
             +'<input class="btn btn-small btn-primary xcrud-action btn-danger nodedelbtn" type="button" value="x" >',
           ]); }             	   
       },
     }).done(function(json) {
	var data = JSON.stringify(json);             // getting json data
        console.log("INVENTORY DEVICES.... "+data); 
      })
      .error(function() {
        console.log("FAIL IN GETTING INVENTORY DEVICES :");
      })
      .complete(function() {
        console.log("STATUS UPDATE COMPLETED (GET PARTNER DEVICES):");
      })
      }     
    
    //edit device button clicked
     $(document).on('click','.nodeedtbtn',function(){
		console.log('nodeedtbtn clicked');
		var currrow = $(this).parents('tr');		
		$(currrow).find('td').each(function(){
		$(this).find('input.inptxt').removeAttr('readonly');
		$(this).find('input.inptxt').removeClass('inptxt').addClass('inpEditTxt');
		console.log('currrow::'+currrow);
  });
  
		sessionStorage['friendlyName'] = $.trim($(currrow).find('td:nth-child(5) input').val());
		sessionStorage['udn'] = $.trim($(currrow).find('td:nth-child(6) input').val());
		
		$(currrow).find('td:nth-child(8) span.nodeedtbtn').hide();
		$(currrow).find('td:nth-child(8) input').hide();
		$(currrow).find('td:nth-child(8) input').before('<span class="btn btn-small btn-primary'
				  +' xcrud-action btn-success nodeSavebtn" >Save'
				  +'</span>&nbsp;');
		$(currrow).find('td:nth-child(8) input').before('<span class="btn btn-small btn-primary'
				  +' xcrud-action btn-danger nodeCancelbtn">Cancel'
				  +'</span>');
})


$(document).on('click','.nodeSavebtn',function(){
		
	        var currrow,udn,frndlyname,cloudConnector,deviceId, partnerId;
		currrow = $(this).parents('tr');
	       		partnerId = $.trim($(currrow).find('td:nth-child(1)').text());
			deviceId = $.trim($(currrow).find('td:nth-child(2)').text());
			cloudConnector = $.trim($(currrow).find('td:nth-child(3)').text());
			friendlyName = $.trim($(currrow).find('td:nth-child(5) input').val());
			udn = $.trim($(currrow).find('td:nth-child(6) input').val());
			
		console.log('partnerId::'+partnerId + "\ndeviceId:"+deviceId+"\ncloudConnector:"+cloudConnector+"\nfriendlyName:"+friendlyName+"\nudn:"+udn);
		if(partnerId!= '' && deviceId!='' && cc!='' && friendlyName !='' && udn!=''){
		console.log('devivce save button');
		updateDeviceProvisioning(partnerId,deviceId,cloudConnector,friendlyName,udn);		
    }

})


function toggleNodeEditCancel(currrow){
  console.log('toggleNodeEditCancel');
    $(currrow).find('td').each(function(){
		$(this).find('input.inpEditTxt').prop('readonly',true);
		$(this).find('input.inpEditTxt').removeClass('inpEditTxt').addClass('inptxt');

       });
		$(currrow).find('td:nth-child(8) span.nodeSavebtn').remove();
		$(currrow).find('td:nth-child(8) span.nodeCancelbtn').remove();
		$(currrow).find('td:nth-child(8) input.nodedelbtn').show();
	        $(currrow).find('td:nth-child(8) span.nodeedtbtn').show();
}


$(document).on('click','.nodeCancelbtn',function(){
		console.log('nodeCancelbtn clicked');
		var currrow = $(this).parents('tr');
		toggleNodeEditCancel(currrow);

		$(currrow).find('td:nth-child(5) input').val(sessionStorage['friendlyName']);
		$(currrow).find('td:nth-child(6) input').val(sessionStorage['udn']);

});


function updateDeviceProvisioning(partnerId,deviceId,cloudConnector,friendlyName,udn){

   console.log("INSIDE UPDATE NODES ....");	

    var body = "<?xml version=\"1.0\"?>"+
		"<device>"+	
			"<friendlyName>"+friendlyName+"</friendlyName>"+
			"<protocol>LWM2M</protocol>"+
			"<manufacturer>UNKNOWN</manufacturer>"+
			"<manufacturerUrl>UNKNOWN</manufacturerUrl>"+
			"<modelId>123MODEL</modelId>"+
			"<modelName>MODELNAME</modelName>"+
			"<modelType>MODELTYPE</modelType>"+
			"<modelUrl>UNKNOWN</modelUrl>"+
			"<serialNumber>1234567</serialNumber>"+
			"<udn>"+udn+"</udn>"+
			"<upc>UNAAS</upc>"+
			"<switchId>UNKNOW</switchId>"+
			"<ipAddress>UNKNOWN</ipAddress>"+
		"</device>";	
     $.ajax({
     type: "POST",
     url: 'http://'+dmbackendAddr+'/DMBackEndGw/DMDevice/updateDevice/'+realm+'/'+partnerId+'/'+deviceId+'/'+cloudConnector,
     contentType:'text/xml',
     crossDomain: true,
     processData: false,
     data: body,
     headers: {
          'Authorization': 'Bearer '+token
	},
      }).done(function(plain) {
	var data = JSON.stringify(plain);
        console.log('STATUS UPDATE SUCCESS: '+data);
        getPartnerDevices();
        console.log("STATUS UPDATE done:"+json);
        toggleNodeEditCancel(currrow);
      })
      .error(function() {
        console.log("STATUS UPDATE FAILED:");
      })
      .complete(function() {
        console.log("STATUS UPDATE COMPLETED:");
      });
}


//delete device button function starts.....

$(document).on('click','.nodedelbtn',function(){
    var currrow = $(this).parents('tr');
    var partnerId = $(currrow).find('td:nth-child(1)').text();
    var deviceId = $(currrow).find('td:nth-child(2)').text();
    var cc = $(currrow).find('td:nth-child(3)').text();

    bootbox.dialog({
	    
  message: '<p style="color:#c9302c">Caution ! Are you sure want to remove this Device ?</p>',
  title: "Delete Confirmation",
  buttons: {
    success: {
      label: "Delete",
      className: "btn-danger",
      callback: function() {
          deletePartnerDevice(currrow,partnerId,deviceId,cc);
       }
    },
    danger: {
      label: "Cancel",
      className: "btn-primary",
      callback: function() {

      }
    }
  }
 });
});

function deletePartnerDevice(currrow,partnerId,deviceId,cc){
	
  console.log('device deleted::'+deviceId);
  	
  $.ajax({
     type: "DELETE",
     url: 'http://'+dmbackendAddr+'/DMBackEndGw/DMDevice/deleteDevice/'+realm+'/'+partnerId+'/'+deviceId+'/'+cc,
     contentType:'',
     crossDomain: true,
     processData: false,
     headers: {
          'Authorization': 'Bearer '+token
	 },
     success: function () {
        console.log('STATUS UPDATE SUCCESS (NODE DELETED):');
        $(currrow).remove();
        getPartnerDevices();
       },
     }).done(function() {
        console.log("STATUS UPDATE done (NODE DELETED):");
      })
      .error(function() {
        console.log("STATUS UPDATE FAILED (NODE DELETED):");
      })
      .complete(function() {
        console.log("STATUS UPDATE COMPLETED (NODE DELETED):");
      });
      }
    
      
function getDeviceInfo(){  
   var deviceid         = $("#deviceid").val();
   var paid             = $("#paid").val();
	
   console.log("DEVICE ID .. " +deviceid);
   console.log("PARTNER ID .. " +partnerId);
   $.ajax({
     type: "GET",
     url: 'http://'+dmbackendAddr+'/DMBackEndGw/DMDevice/partnerDeviceInfo/'+realm+'/'+paid+'/'+deviceid,
     contentType:'application/json',
     crossDomain: true,
     processData: false,
     headers: {
          'Authorization': 'Bearer '+token
	},
     success: function (json) {
     calisttable.fnClearTable();
      for(i = 0; i<json.nodes.length; i++){	     
            calisttable.fnAddData([
	      json.nodes[i].nodeId,
	      json.nodes[i].nodeType, 
	      json.nodes[i].category, 
	      json.nodes[i].udn, 
	      json.nodes[i].friendlyName,            
             '<span class=""></span> &nbsp;',
           ]); 
	}
        console.log("RESPONSE BODY" +json);	     
       },
     }).done(function(json) {
	var data = JSON.stringify(json);             // getting json data
        console.log("INVENTORY DEVICES ... "+data); 
      })
      .error(function() {
        console.log("FAIL IN GETTING INVENTORY DEVICES :");
      })
      .complete(function() {
        console.log("STATUS UPDATE COMPLETED:");
      })    
}