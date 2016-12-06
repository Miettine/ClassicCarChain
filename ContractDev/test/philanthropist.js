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
	
	it("should be able to send money to a beggar", function() {
		var philContract = Philanthropist.deployed();

		// Get initial balances of first and second account.
		var phil = accounts[0];
		var beggar = accounts[1];
		var observer = accounts[2];

		var beggedAmount=1;
		
		//1: Get who the current phil is.
		//2: Have the beggar make a beg
		//3: Have the phil accept it
		//4: check if the balances are correct
		//5: check if the beggar's address was removed from the list of begs.
	
		var balance = web3.eth.getBalance(accounts[0]).toNumber();
		console.log(balance);
		//var phil_starting_balance = web3.fromWei(web3.eth.getBalance(phil));
		//return web3.eth.getBalance(phil).then(function(balance) {
			/*
			var phil_starting_balance = balance.valueOf();
			
			return philContract.Beg(beggedAmount, {from: beggar}).then(function() {
			

				return philContract.Accept({from: phil}).then(function() {
			
				
					//assert.equal(phil_ending_balance, phil_starting_balance - beggedAmount, "Amount wasn't correctly taken from the philanthropist");
					//assert.equal(beggar_ending_balance, beggar_starting_balance + beggedAmount, "Amount wasn't correctly sent to the beggar");
				});
		
			});*/
		//});
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