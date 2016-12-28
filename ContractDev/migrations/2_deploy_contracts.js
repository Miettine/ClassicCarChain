module.exports = function(deployer) {
  //deployer.deploy(ConvertLib);
    //deployer.deploy(MetaCoin);
  //deployer.deploy(Philanthropist);
    deployer.deploy(ClassicCarChain, "Honda Civic", 1999);
    deployer.autolink();// Link *all* libraries to all available contracts

};
