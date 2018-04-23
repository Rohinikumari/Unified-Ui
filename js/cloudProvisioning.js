var calisttable;
var sollisttable;
var registration;

$(document).ready(function(){     

	    calisttable = $('#calist').dataTable( {bFilter: false, bInfo: false, "bLengthChange": false,
		      "aoColumnDefs": [
			  { 'bSortable': false, 'aTargets': [ 1,2 ] }
		      ]
		  });	  
	    getCAMngmntDetails();  // get all cloud connectors
});

$(document).ready(function(){     

	    sollisttable = $('#sollist').dataTable( {bFilter: false, bInfo: false, "bLengthChange": false,
		      "aoColumnDefs": [
			  { 'bSortable': false, 'aTargets': [ 0,1 ] }
		      ]
		  });	  
	    getCAMngmnt();  // get all mapped cloud connectors    
});

$(document).ready(function(){     

	    registration = $('#registrationlist').dataTable( {bFilter: false, bInfo: false, "bLengthChange": false,
		      "aoColumnDefs": [
			  { 'bSortable': false, 'aTargets': [ 0,1 ] }
		      ]
		  });	  
	    getRegistration();  // get all mapped cloud connectors    
});

var realm = localStorage.getItem('realm');         // getting realm from web storage (local storage)
var token = localStorage.getItem('accessToken');  // getting access token from web storage (local storage)

//get all cloud connectors
function getCAMngmntDetails(){	
  
		console.log("inside get all cc status.... ");   
	$.ajax({
		type: "GET",
		url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/cc/getAllCCstatus/'+realm,
		ContentType:'application/json',
		crossDomain: true,
		processData: false,
		headers: {
			  'Authorization': 'Bearer '+token
		},
		success: function (json) {	     
		calisttable.fnClearTable();        
		if(json != null || typeof(json) != undefined){
		for(i = 0; i<json.ccstatus.length; i++){
		var action;
		if(json.ccstatus[i].status == 'unconnected')
		action= '<button id="start" type="button" class="btn btn-primary">Start</button>';
		else
		action= '<button id="stop" type="button" class="btn btn-danger">Stop</button>';

		calisttable.fnAddData([
		json.ccstatus[i].cloudConnector,
		json.ccstatus[i].status,
		action
           ]);
	}
	}
        },
        }).done(function(json) {        
		var response = JSON.stringify(json);
		console.log("ALL CLOUD CONNECTORS RESPONSE : "+response);
	}).error(function() {
		console.log("ALLCLOUD CONNECTORS RESPONSE FAILED :");
        }).complete(function() {
		console.log("ALLCLOUD CONNECTORS RESPONSE COMPLETED :");
        });
        }

//get all mapped cloud connectors
function getCAMngmnt(){   	
		console.log("inside get all mapped cc.... ");
                var solutionId;	
        $.ajax({
		type: "GET",
		url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/cc/getAllMappedCC/'+realm,
		ContentType:'application/json',
		crossDomain: true,
		processData: false,
	        headers: {
		   'Authorization': 'Bearer '+token
	        },	          
	}).done(function(response) {
		sollisttable.fnClearTable();
	        for(i = 0; i<response.cloudconnectors.length; i++){
               	sollisttable.fnAddData([
		response.cloudconnectors[i].solution,
		response.cloudconnectors[i].cloudConnector
		]);
		}				
	}).error(function() {
		console.log("ALLCLOUD CONNECTORS RESPONSE FAILED :");
	}).complete(function() {
		console.log("ALLCLOUD CONNECTORS RESPONSE COMPLETED :");
	});
}

// put status of cloud connector = connected
$(document).on('click','#start',function(){
		var caName, curRow;
		curRow = $(this).parents('tr');
		caName = $.trim($(curRow).find('td:nth-child(1)').text());
		console.log('CA NAME::'+caName);

		doCAConnAction(caName, "connected");
})

// put status of cloud connector = unconnected
$(document).on('click','#stop',function(){
		var caName, curRow;
		curRow = $(this).parents('tr');
		caName = $.trim($(curRow).find('td:nth-child(1)').text());
		console.log('CA NAME::'+caName);

		doCAConnAction(caName, "unconnected");
})

// put status of a particular cloud connector (connected or unconnected)
function doCAConnAction(caName,action){
	
		console.log("inside put cc status.... ");
	$.ajax({
		type: "POST",
		url: 'http://'+backendAddr+'/OP-BackEnd-Gateway/cc/putCCStatus/'+realm+'/'+caName+'/'+action,
		contentType:'text/plain',
		crossDomain: true,
		processData: false,
		headers: {
			  'Authorization': 'Bearer '+token
		},
	success: function (plain) {
		console.log('CLOUD CONNECTOR STATUS UPDATED FROM BACKEND GW:' +plain);
		},
	}).done(function(plain) {
		console.log("STATUS UPDATE done : " +plain);
	}).error(function() {
		console.log("CLOUD CONNECTOR STATUS UPDATE FAILED FROM BACKEND GW:");
	}).complete(function() {
		getCAMngmntDetails();                            // getting all cloud connectors
	});
}

//get all cloud connectors
function getRegistration(){  
		console.log("inside get registration.... ");   
	$.ajax({		
						type : "GET",					
						url : 'http://'+backendAddr+'/ConsumerBackEndGateway/Consumer/'+realm+'/'+realm+'/registerStatus',
						contentType : "text/xml",
						crossDomain : true,
						processData : false,
						headers: {
						  'Authorization': 'Bearer '+token
						},
						})
						.done(function(xml) {
						console.log("inside done function.... " +xml);
						var solutionId;
						var status;
						var solutionstatus;
						$(xml).find("solution").each(function() {
						$(this).find("id").each(function(){
						solutionId =  $(this).text();
	                                        console.log("solutionId.... " +solutionId);						
						});
                                                $(this).find("status").each(function(){
						status =  $(this).text();
	                                        solutionstatus = status.substring(status.indexOf('--')+2);
						console.log("solutionstatus.... "+solutionstatus);
						console.log("status.... " +status);
						//registration.fnClearTable();        
						registration.fnAddData([	      
						solutionId,
						solutionstatus							
						]);
						});						
				                });                                                
						}).error(function() {
						console.log("inside error.... ");
						}).complete(function() {
						console.log("inside complete.... ");
						});
        }