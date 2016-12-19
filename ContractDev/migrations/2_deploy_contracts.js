module.exports = function(deployer) {
  //deployer.deploy(ConvertLib);
    //deployer.deploy(MetaCoin);
  //deployer.deploy(Philanthropist);
    deployer.deploy(ClassicCarChain);
    deployer.autolink();// Link *all* libraries to all available contracts
  
};
