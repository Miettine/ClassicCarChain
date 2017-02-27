
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

	var f_convertNumber = function(_bigNumber) {
		if (_bigNumber !=null){
			return _bigNumber.c[0];
		}
		return "err";
	}

	var f_convertDate = function(_seconds){
		return new Date(0, 0, 0, 0, 0, f_convertNumber( _seconds), 0);
	}

	return {
		convertBigNumber: f_convertNumber,
		convertDate: f_convertDate
	}
}());

