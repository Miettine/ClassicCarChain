Account = function() {	
	'use strict';
	var currentAccount = web3.eth.accounts[0];


	return {
		getCurrentAccount: function(){
			return currentAccount;
		},

		setCurrentAccount: function(_value){
			currentAccount = _value;
			console.log("account-management.setCurrentAccount "+ _value);
		}
	}
}();