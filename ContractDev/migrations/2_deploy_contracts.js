module.exports = function(deployer) {
  //deployer.deploy(ConvertLib);
    //deployer.deploy(MetaCoin);
  //deployer.deploy(Philanthropist);
    deployer.deploy(ClassicCarChain, "Ford Aerostar Minivan", 1990);
    deployer.autolink();// Link *all* libraries to all available contracts

};
