
var HighlightTypes = {
	Review:0,
	Maintenance:1
};

//A global helper that I can use to convert wei to ether.
Template.registerHelper('weiToEther', function(wei) {
	return EthTools.formatBalance(wei, '0,0.0[00] unit', 'ether');
});


Template.registerHelper('allAccounts', function() {
	return EthAccounts.find().fetch();
});

Template.registerHelper('convertBigNumber', function(_bigNumber) {
	return Helpers.convertBigNumber(_bigNumber);
});

Helpers = (function() {	
	'use strict';

	return {
		convertBigNumber: function(_bigNumber) {
			if (_bigNumber !=null){
				return _bigNumber.c[0];
			}
			return "err";
		}
	}
}());

