Account = function() {	
	'use strict';

	
			

	//var currentAccount = web3.eth.accounts[0];

	

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