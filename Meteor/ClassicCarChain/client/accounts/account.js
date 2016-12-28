/*Template.Account.helpers({

	balance: ()=>{
		return balance;
	}
}); */

//A global helper that I can use to convert wei to ether.
Template.registerHelper('weiToEther', function(wei) {
  return EthTools.formatBalance
  (wei, '0,0.0[00] unit', 'ether');
});

