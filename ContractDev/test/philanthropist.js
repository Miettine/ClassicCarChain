contract('Philanthropist', function(accounts) {
	
  it("Philanthropist address should be the same as the address who deployed it", function() {
    var phil = Philanthropist.deployed();

	var philAddress = phil.GetPhilanthropistAddress.call();
	
    return phil.GetPhilanthropistAddress.call(accounts[0]).then(function(evaluate) {
      assert.equal(philAddress, phil.philanthropistAddress, "The addresses were not the same");
    });
  });
  
});
