	//partner registration and de registration
	function partnerregistration() {
			       var partnerId  = $("#partnerId").val();
	                       console.log("inside registration of partner.... ");

	$.ajax({
				type: "GET",
				url: 'http://'+standardGw+'?c=partnerRegister&topic=PARTNER/'+partnerId, 	   
				contentType: "",
				crossDomain: true,
				processData: false,
				data: "",
				}).done(function() {
				alert("Partner Registered ..... PARTNER/" +partnerId);				
				}).error(function() {
				console.log("Error Occured");
				}).complete(function() {
				console.log("Registration Completed");
				});				
        }
	    
	    
	function partnerdeRegistration() {                         	
                                var partnerId  = $("#partnrId").val();
		                console.log("inside de registration of partner.... ");
	$.ajax({
				type: "GET",
				url: 'http://'+standardGw+'?c=partnerDeregister&topic=PARTNER/'+partnerId,    	   
				contentType: "",
				crossDomain: true,
				processData: false,
				data: "",
				}).done(function() {
				alert("Partner De-Registered .....PARTNER/" +partnerId);				
				}).error(function() {
				console.log("Error Occured");
				}).complete(function() {
				console.log("De-Registration Completed");
				});				
	}
	
	 //solution registration & deregistration
	function solutionregistration() {	
                               	var partnerId       = $("#pId").val();			
                               	var cloudgatewayId  = $("#cloudgatewayId").val();			
                               	var solutionId      = $("#solutionId").val();			
				console.log("solution registration for registration.... ");
	$.ajax({
				type: "GET",
				url: 'http://'+standardGw+'?c=dcgRegister&partnerid='+partnerId+'&stgwid='+cloudgatewayId+'&solutionid='+solutionId,    	   
				contentType: "",
				crossDomain: true,
				processData: false,
				data: "",
				}).done(function() {
				alert("Solution Registered ..... PARTNER/"+partnerId+"/SOLUTION/"+solutionId);
				alert("Solution Registered ..... SOLUTION/"+solutionId);
				}).error(function() {
				console.log("Error Occured");
				}).complete(function() {
				console.log("Registration Completed");
				});
	}	    
	    
	function solutiondeRegistration() {
                                var partnerId       = $("#paId").val();
                               	var cloudgatewayId  = $("#cloudgwId").val();
                               	var solutionId      = $("#solId").val();
                         	console.log("solution registration for deregistration.... ");
	$.ajax({
				type: "GET",
				url: 'http://'+standardGw+'?c=dcgDeRegister&partnerid='+partnerId+'&stgwid='+cloudgatewayId+'&solutionid='+solutionId,    	   
				contentType: "",
				crossDomain: true,
				processData: false,
				data: "",
				}).done(function() {
				alert("Solution De-Registered .....PARTNER/"+partnerId+"/SOLUTION/"+solutionId);
                                alert("Solution De-Registered ..... SOLUTION/"+solutionId);				
				}).error(function() {
				console.log("Error Occured");
				}).complete(function() {
				console.log("De-Registration Completed");
				});
        }

	//solution&node registration & de-registration
        function solutionnoderegistration() {
	                        var partnerId       = $("#ptnrId").val();
                               	var nodeId          = $("#nodeId").val();
                               	var solutionId      = $("#slId").val();
		                console.log("solution and node registration.... ");
	$.ajax({
				type: "GET",
				url: 'http://'+standardGw+'?c=subscribe&topic=PARTNER/'+partnerId+'/SOLUTION/'+solutionId+'/NODE/'+nodeId,    	   
				contentType: "",
				crossDomain: true,
				processData: false,
				data: "",
	}).done(function() {
				solnodesubscribe(partnerId,solutionId,nodeId);
	}).error(function() {
				console.log("solution and node registration error.... ");
	}).complete(function() {
				console.log("solution and node registration completed....");
			
	});
        }    
    
        function solnodesubscribe(partnerId,solutionId,nodeId) {                      
			        			
		                console.log("solution and node registration (subscribe)... ");
	$.ajax({

				type: "GET",
				url: 'http://'+standardGw+'?c=subscribe&topic=SOLUTION/'+solutionId+'/NODE/'+nodeId,    	   
				contentType: "",
				crossDomain: true,
				processData: false,
				data: "",
	}).done(function() {
				alert("Solution Registered ..... PARTNER/"+partnerId+"/SOLUTION/"+solutionId+"/NODE/"+nodeId);
				alert("Solution Registered ..... SOLUTION/"+solutionId+"/NODE/"+nodeId);
	}).error(function() {
				console.log("solution and node registration error....");
	}).complete(function() {
				console.log("solution and node registration completed....");
			
	});
	}
    
	    
	function solutionnodederegistration() {
				var partnerId       = $("#ptId").val();
                               	var nodeId          = $("#ndId").val();
                               	var solutionId      = $("#sltId").val();
				console.log("solution and node de-registration.... ");
	$.ajax({
				type: "GET",
				url: 'http://'+standardGw+'?c=unsubscribe&topic=PARTNER/'+partnerId+'/SOLUTION/'+solutionId+'/NODE/'+nodeId,    	   
				contentType: "",
				crossDomain: true,
				processData: false,
				data: "",
	}).done(function() {
				solnodeunsubscribe(partnerId,nodeId,solutionId);		
	}).error(function() {
				console.log("solution and node de-registration error.... ");
	}).complete(function() {
				console.log("solution and node de-registration completed.... ");
	});
        }

        function solnodeunsubscribe(partnerId,nodeId,solutionId) {                      
			        			
				console.log("solution and node de-registration (unsubscribe).... ");
	$.ajax({
				type: "GET",
				url: 'http://'+standardGw+'?c=unsubscribe&topic=SOLUTION/'+solutionId+'/NODE/'+nodeId,    	   
				contentType: "",
				crossDomain: true,
				processData: false,
				data: "",
	}).done(function() {
				alert("DE-Registered ..... PARTNER/"+partnerId+"/SOLUTION/"+solutionId+"/NODE/"+nodeId);	    		
				alert("DE-Registered ..... SOLUTION/"+solutionId+"/NODE/"+nodeId);	    		
	}).error(function() {
				console.log("solution and node de-registration (unsubscribe) error....");
	}).complete(function() {
				console.log("solution and node de-registration completed....");			
	});
        }
    
        //node registration & deregistration
        function noderegistration() {
                                var partnerId       = $("#ptnId").val();
                               	var nodeId          = $("#ndeId").val();		
				console.log("inside node registration.... ");
	$.ajax({
				type: "GET",
				url: 'http://'+standardGw+'?c=subscribe&topic=PARTNER/'+partnerId+'/NODE/'+nodeId,    	   
				contentType: "",
				crossDomain: true,
				processData: false,
				data: "",
	    	}).done(function() {
				nodesubscribe(partnerId,nodeId);		
	    	})
	    	.error(function() {
				console.log("inside node registration error.... ");
	    	})
	    	.complete(function() {
				console.log("inside node registrationcompleted.... ");			
	    	});
	}

	function nodesubscribe(partnerId,nodeId) {	
				console.log("inside node registration (subscribe)... ");
	$.ajax({
				type: "GET",
				url: 'http://'+standardGw+'?c=subscribe&topic=NODE/'+nodeId,    	   
				contentType: "",
				crossDomain: true,
				processData: false,
				data: "",
	    	}).done(function() {
				alert("Partner Registered ..... PARTNER/"+partnerId+"/NODE/"+nodeId);	    		
				alert("Node Registered ..... NODE/"+nodeId);	    		
	    	})
	    	.error(function() {
				console.log("inside node registration (subscribe) error.... ");
	    	})
	    	.complete(function() {
				console.log("inside node registration (subscribe) completed.... ");			
	    	});
	}
		    
	function nodedeRegistration() {
				var partnerId       = $("#prtnrId").val();
                               	var nodeId          = $("#nodId").val();
				console.log("inside node de-registration.... ");
	$.ajax({
				type: "GET",
				url: 'http://'+standardGw+'?c=unsubscribe&topic=PARTNER/'+partnerId+'/NODE/'+nodeId,    	   
				contentType: "",
				crossDomain: true,
				processData: false,
				data: "",
	    	}).done(function() {					
				nodeunsubscribe(partnerId,nodeId);
	    	})
	    	.error(function() {
				console.log("inside node de-registration error....");
	    	})
	    	.complete(function() {
				console.log("inside node de-registration completed....");
	    	});
	}
	   
	function nodeunsubscribe(partnerId,nodeId) {	
				console.log("inside node de-registration (unsubscribe).... ");
	$.ajax({
				type: "GET",
				url: 'http://'+standardGw+'?c=unsubscribe&topic=NODE/'+nodeId,    	   
				contentType: "",
				crossDomain: true,
				processData: false,
				data: "",
	    	}).done(function() {
				alert("Partner DE-Registered ..... PARTNER/"+partnerId+"/NODE/"+nodeId);	    		
				alert("Node DE-Registered ..... NODE/"+nodeId);	    		
	    	})
	    	.error(function() {
				console.log("inside node de-registration (unsubscribe) error.... ");
	    	})
	    	.complete(function() {
				console.log("inside node de-registration (unsubscribe) completed.... ");			
	    	});
	}