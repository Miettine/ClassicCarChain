module.exports = function(deployer) {
  //deployer.deploy(ConvertLib);
    //deployer.deploy(MetaCoin);
  //deployer.deploy(Philanthropist);
    deployer.deploy(ClassicCarChain, "Lamborghini Diablo Coupé", 1990);
    deployer.autolink();// Link *all* libraries to all available contracts

};
