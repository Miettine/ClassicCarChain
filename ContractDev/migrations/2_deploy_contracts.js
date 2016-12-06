module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
    deployer.deploy(MetaCoin); //Need to have metacoin in here. I want to know if the test program works.
  deployer.deploy(Philanthropist);
    deployer.autolink();// Link *all* libraries to all available contracts
  
};
