module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.autolink();
    deployer.deploy(MetaCoin); //Need to have metacoin in here. I want to know if the test program works.
  deployer.deploy(Philanthropist);
  
};
