contract('Philanthropist', function(accounts) {
	
  it("address should be the same as the address who deployed it", function() {
	  
    var philContract = Philanthropist.deployed();
	var deployerAddress = accounts[0];
	
	return philContract.GetPhilanthropistAddress.call(accounts[1]).then(function(gotPhilAddress) {
      assert.equal(gotPhilAddress.valueOf(), accounts[0], "The addresses are not the same");
    });
	
  });
  
  it("address should be different as the address who deployed it", function() {
	  
    var philContract = Philanthropist.deployed();
	var deployerAddress = accounts[0];
	
	return philContract.GetPhilanthropistAddress.call(accounts[2]).then(function(gotPhilAddress) {
      assert.equal(gotPhilAddress.valueOf(), accounts[1], "The addresses are not the same");
    });
	
  });
  /*
   it("should pass philantropist rights to the chosen address", function() {
    var philContract = Philanthropist.deployed();

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    return philContract.GivePhilanthropistRights.call().then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return meta.getBalance.call(account_two);
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
      return meta.sendCoin(account_two, amount, {from: account_one});
    }).then(function() {
      return meta.getBalance.call(account_one);
    }).then(function(balance) {
      account_one_ending_balance = balance.toNumber();
      return meta.getBalance.call(account_two);
    }).then(function(balance) {
      account_two_ending_balance = balance.toNumber();

      assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
  });
  */
});
