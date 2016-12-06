contract('Philanthropist', function(accounts) {
	
	it("address should be the same as the address who deployed it", function() {
	  
		var philContract = Philanthropist.deployed();
		var deployerAddress = accounts[0];

		return philContract.GetPhilanthropistAddress.call(accounts[1]).then(function(gotPhilAddress) {
			assert.equal(gotPhilAddress.valueOf(), accounts[0], "The addresses are not the same");
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
			
			phil=address.valueOf();
			
			return  philContract.GetPhilanthropistAddress(newPhil, {from: phil});
		}).then(function() {
			
			
			assert.equal(phil, newPhil, "The addresses are not the same");
		});
	});
  
  /*
   it("should not be possible to steal philanthropist rights", function() {
   //Some person attempts to take the phil rights
   });
  */
  
});
