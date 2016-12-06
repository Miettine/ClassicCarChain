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