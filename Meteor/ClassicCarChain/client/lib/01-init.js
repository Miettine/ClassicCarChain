if(typeof web3 === 'undefined'){
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}

EthAccounts.init();
EthBlocks.init();

//A global helper that I can use to convert wei to ether.
Template.registerHelper('weiToEther', function(wei) {
	return EthTools.formatBalance(wei, '0,0.0[00] unit', 'ether');
});


Template.registerHelper('allAccounts', function() {
	return EthAccounts.find().fetch();
});
