contract('ClassicCarChain', function(accounts) {
	

	
	it("address should be the same as the address who deployed it", function() {
	  
		var contract = ClassicCarChain.deployed();
		var deployerAddress = accounts[0];

		return contract.vehicleOwner.call(accounts[1]).then(function(gotAddress) {
			assert.equal(gotAddress.valueOf(), accounts[0], "The addresses are not the same");
		});

	});
	
	it("should not be possible to steal vehicle ownership", function() {

		var contract = ClassicCarChain.deployed();

		// Get initial balances of first and second account.
		var thief = accounts[3];
		var observer = accounts[4];

		return contract.vehicleOwner.call(observer).then(function(address) {
			
			phil = address.valueOf();
			
			return  contract.GivePhilanthropistRights(thief, {from: thief}).then(function() {
				
				return contract.vehicleOwner.call(observer).then(function(address) {
				
					assert.equal(address.valueOf(), phil, "The owner changed after the theft attempt"); 

					assert.notEqual(address.valueOf(), thief, "The thief became the owner after the theft attempt");
					
				});
			});
		});
	});
	
	it("should be able to add a highlight request", function() {
		var maker = accounts[1];
		
		return contract.MakeHighlightRequest(beggedAmountInEth, "Oulu University of Applied Sciences", "Very faithful to the original!", {from: maker}).then(function() {
			
		});
	});
	
	it("should be able to delete an existing highlight request", function() {
	
	});

		
	it("should pass vehicle ownership to the appointed address", function() {
		var contract = ClassicCarChain.deployed();

		var newOwner = accounts[1];
		var observer = accounts[2];

		return contract.vehicleOwner.call(observer).then(function(address) {
			
			currentOwner = address.valueOf();
			
			return contract.GiveVehicleOwnership(newOwner, {from: currentOwner}).then(function() {
				
				return contract.vehicleOwner.call(observer).then(function(address) {
			
					assert.equal(address.valueOf(), newOwner, "Appointed owner is not the owner"); 
					//Reminder: The message is printed if this test fails
					//In this case, if address is not the same as newOwner
					assert.notEqual(address.valueOf(), observer, "The observer somehow became the owner");
					//In this case, message is printed if address is the same as observer
					assert.notEqual(address.valueOf(), phil, "The former owner still has the rights");
					//In this case, message is printed if oldPhil is the same as address
			
				});
			});
		});
	});

	/*
	it("should be able to reject a highlight request", function() {

	

		// Get initial balances of first and second account.

		var maker = accounts[1];
		var observer = accounts[2];

		var beggedAmountInEth=5;

		return contract.RejectHighlightRequest(beggedAmountInEth, {from: owner}).then(function() {
			
		});
	});
	*/
	

	/*
	//Doesn't work yet
	it("should be able to send money to a request maker", function() {
		
		// Get initial balances of first and second account.
		
		var requester = accounts[1];
		var observer = accounts[2];

		var requestedAmountInEth=5;
			
		//var phil_starting_balance = web3.eth.getBalance(phil).toNumber();
		
		return contract.MakeHighlightRequest(beggedAmountInEth,"Oulu University of Applied Sciences", "Very faithful to the original!", {from: requester}).then(function() {

			return contract.highlightRequests.call(requester).then(function(amount) {
			
				requestedAmountInWei = amount;
				
				console.log("Stored request to contract: "+requestedAmountInWei);
				
				assert.equal(amount, web3.toWei(beggedAmountInEth, "ether"), "The requested amount was different from the request that was made");
				
				return contract.AcceptHighlightRequest(beggar, {from: phil}).then(function() {
					
					console.log("accepted");
				
				});
			});
			
		});
	});
	*/

	
});