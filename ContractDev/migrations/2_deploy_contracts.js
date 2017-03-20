module.exports = function(deployer) {
  //deployer.deploy(ConvertLib);
    //deployer.deploy(MetaCoin);
  //deployer.deploy(Philanthropist);
    deployer.deploy(ClassicCarChain, "Lamborghini Diablo Coupé", 1990);
/*
	ClassicCarChain.deployed().then(function(instance) {
  meta = instance;  
  return meta.sendCoin(account_two, 10, {from: account_one});
	*/
    deployer.autolink();// Link *all* libraries to all available contracts

};
