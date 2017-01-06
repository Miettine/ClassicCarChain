Account = function() {	
	'use strict';

	Session.set('currentAccount', web3.eth.accounts[0]);
			
	return {
		getCurrentAccount: function(){
			return Session.get('currentAccount');
		},

		setCurrentAccount: function(_value){
			Session.set('currentAccount',  _value);
			console.log("account-management.setCurrentAccount "+ _value);
		}
	}
}();
/*

Template.registerHelper('allAccounts', function() {
	return EthAccounts.find().fetch();
});

Template.registerHelper('getCurrentAccount', function() {
	return Session.get('currentAccount');
});

Template.registerHelper('setCurrentAccount', function(_value) {
	Session.set('currentAccount',  _value);
});

*/