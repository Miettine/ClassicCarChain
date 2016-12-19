contract('Philanthropist', function(accounts) {
	
	it("address should be the same as the address who deployed it", function() {
	  
		var philContract = Philanthropist.deployed();
		var deployerAddress = accounts[0];

		return philContract.GetPhilanthropistAddress.call(accounts[1]).then(function(gotPhilAddress) {
			assert.equal(gotPhilAddress.valueOf(), accounts[0], "The addresses are not the same");
		});

	});
	
	it("should not be possible to steal philanthropist rights", function() {
		
		var philContract = Philanthropist.deployed();

		// Get initial balances of first and second account.
		var phil;
		var thief = accounts[3];
		var observer = accounts[4];

		return philContract.GetPhilanthropistAddress.call(observer).then(function(address) {
			
			phil = address.valueOf();
			
			return  philContract.GivePhilanthropistRights(thief, {from: thief}).then(function() {
				
				return philContract.GetPhilanthropistAddress.call(observer).then(function(address) {
				
					assert.equal(address.valueOf(), phil, "The philanthropist rights were changed after the theft attempt"); 

					assert.notEqual(address.valueOf(), thief, "The thief became the philanthropist after the theft attempt");
					//In this case, message is printed if address is the same as observer
					
				});
			});
		});
	});
	
		
	it("should be able to reject a beg", function() {

		var philContract = Philanthropist.deployed();

		// Get initial balances of first and second account.
		var phil = accounts[0];
		var beggar = accounts[1];
		var observer = accounts[2];

		var beggedAmountInEth=5;
			
		var phil_starting_balance = web3.eth.getBalance(phil).toNumber();
		var beggar_starting_balance = web3.eth.getBalance(beggar).toNumber();
		
		var gasPaidByPhil;
		var gasPaidByBeggar;
		
		console.log("Philantropist starting balance: "+phil_starting_balance);
		console.log("Beggar starting balance: "+beggar_starting_balance);
		
		return philContract.Accept(beggedAmountInEth, {from: beggar}).then(function() {
						
			return philContract.GetBeg.call(beggar).then(function(amount) {
			
				beggedAmountInWei = amount;
				
				console.log("Stored beg to contract: "+beggedAmountInWei);
				
				assert.equal(amount, web3.toWei(beggedAmountInEth, "ether"), "The saved begged amount was different from the beg that the beggar made");
				
				return philContract.Reject(beggar, {from: phil}).then(function() {
					
					philContract.GetBeg.call(beggar).then(function(amount) {
						assert.equal(amount, web3.toWei(beggedAmountInEth, "ether"), "The beg was not removed from the beg-mapping");
					}
					
										
					
					
				});
			});
		});
	});
	
	
	
	
	it("should be able to send money to a beggar", function() {
		var philContract = Philanthropist.deployed();

		// Get initial balances of first and second account.
		var phil = accounts[0];
		var beggar = accounts[1];
		var observer = accounts[2];

		var beggedAmountInEth=5;
		
		//1: Get who the current phil is.
		//2: Have the beggar make a beg
		//3: Have the phil accept it
		//4: check if the balances are correct
		//5: check if the beggar's address was removed from the list of begs.

		//var phil_starting_balance = web3.fromWei(web3.eth.getBalance(phil));
		//return web3.eth.getBalance(phil).then(function(balance) {
			
		var phil_starting_balance = web3.eth.getBalance(phil).toNumber();
		var beggar_starting_balance = web3.eth.getBalance(beggar).toNumber();
		
		var gasPaidByPhil;
		var gasPaidByBeggar;
		
		console.log("Philantropist starting balance: "+phil_starting_balance);
		console.log("Beggar starting balance: "+beggar_starting_balance);
		
		return philContract.Beg(beggedAmountInEth, {from: beggar}).then(function() {
			
			console.log("begged");
			
			gasPaidByBeggar = web3.eth.getBlock("latest").gasUsed;
			
			return philContract.GetBeg.call(beggar).then(function(amount) {
			
				beggedAmountInWei = amount;
				
				console.log("Stored beg to contract: "+beggedAmountInWei);
				
				assert.equal(amount, web3.toWei(beggedAmountInEth, "ether"), "The saved begged amount was different from the beg that the beggar made");
				
				return philContract.Accept(beggar, {from: phil}).then(function() {
					
					console.log("accepted");
					
					var phil_end_balance = web3.eth.getBalance(phil).toNumber();
					var beggar_end_balance = web3.eth.getBalance(beggar).toNumber();
					
					gasPaidByPhil = web3.eth.getBlock("latest").gasUsed;
					
					console.log("Philanthropist paid " + gasPaidByPhil + " wei for gas.");
					console.log("Beggar paid " + gasPaidByBeggar + " wei for gas.");
					
					var philLost = phil_starting_balance-phil_end_balance;
					var beggarGained = beggar_end_balance -beggar_starting_balance;
					
					console.log("Philanthropist paid a total of: "+(philLost));
					console.log("Beggar gained a total of: "+(beggarGained));
					
					console.log("Difference being:"+ (beggarGained-philLost));
					
					//TODO: Maybe make an assert- test to check balances. I struggled at least 6 hours with this.
					//I don't understand where that difference comes from.
					
					//assert.approximately(phil_starting_balance - phil_end_balance, beggedAmountInWei, beggedAmountInWei/20, "Amount wasn't correctly taken from the philanthropist");
					
					//assert.approximately(beggar_starting_balance-beggar_end_balance, beggedAmountInWei, beggedAmountInWei/20, "Amount wasn't correctly sent to the beggar");
					
					//assert.equal(phil_end_balance, phil_starting_balance - beggedAmountInWei - gasPaidByPhil, "Amount wasn't correctly taken from the philanthropist");
					//assert.equal(beggar_end_balance, beggar_starting_balance + beggedAmountInWei - gasPaidByBeggar, "Amount wasn't correctly sent to the beggar");
				});
			});
		});
	});
	/*
	function getCurrentPhil(address _callAddress){
		
	}
  */
	it("should pass philantropist rights to the appointed address", function() {
		var philContract = Philanthropist.deployed();

		// Get initial balances of first and second account.
		var phil;
		var newPhil = accounts[1];
		var observer = accounts[2];

		//1: Get who the current phil is.
		//2: Make the current phil give rights to another address
		//3: See if the new phil is the same as the appointed phil.
	
		return philContract.GetPhilanthropistAddress.call(observer).then(function(address) {
			
			phil = address.valueOf();
			
			return philContract.GivePhilanthropistRights(newPhil, {from: phil}).then(function() {
				
				return philContract.GetPhilanthropistAddress.call(observer).then(function(address) {
			
					assert.equal(address.valueOf(), newPhil, "The addresses are not the same"); 
					//Reminder: The message is printed if this test fails
					//In this case, if address is not the same as newPhil
					assert.notEqual(address.valueOf(), observer, "The observer somehow became the philanthropist");
					//In this case, message is printed if address is the same as observer
					assert.notEqual(address.valueOf(), phil, "The former philanthopist still has the rights");
					//In this case, message is printed if oldPhil is the same as address
			
				});
			});
		});
	});

});