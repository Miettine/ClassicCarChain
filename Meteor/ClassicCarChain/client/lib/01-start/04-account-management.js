
Account = (function() {	
	'use strict';

	Session.set('currentAccount', web3.eth.accounts[0]);
	
	return {
		current: function() {
			return Session.get('currentAccount');
		},

		setCurrent: function(_value) {
			Session.set('currentAccount',  _value);
			//console.log("account-management.setCurrentAccount "+ _value);
		}
	}
}());