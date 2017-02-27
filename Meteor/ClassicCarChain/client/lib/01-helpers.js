
var HighlightTypes = {
	Review:0,
	Maintenance:1
};

//A global helper that I can use to convert wei to ether.
Template.registerHelper('weiToEther', function(wei) {
	return EthTools.formatBalance(wei, '0,0.0[00] unit', 'ether');
});


Template.registerHelper('currentAccountIsOwner', function() {
    var current = Account.current(); //Session.get('currentAccount')
    var sessionVehicleOwner = Ethereum.vehicleOwner(); //Session.get('vehicleOwner');
    var currentAndOwnerAreSame = current === sessionVehicleOwner;
    console.log("current:"+current+" sessionVehicleOwner:"+sessionVehicleOwner+" currentAccountIsOwner:"+currentAndOwnerAreSame);
    //If either is undefined, then ownership cannot be determined
    return currentAndOwnerAreSame && (current != undefined) && (sessionVehicleOwner != undefined);
    //TODO: Test this function if an account other than Etherbase is used to deploy the contract.
});

Template.registerHelper('allAccounts', function() {
	return EthAccounts.find().fetch();
});

Template.registerHelper('convertBigNumber', function(_bigNumber) {
	return Helpers.convertBigNumber(_bigNumber);
});

Template.registerHelper('getAllHighlights', function(_bigNumber) {
	return Ethereum.Highlights.getAll();
});

Template.registerHelper('getAcceptedHighlights', function(_bigNumber) {
	return Ethereum.Highlights.getAccepted();
});

Template.registerHelper('getHighlightRequests', function(_bigNumber) {
	return Ethereum.Highlights.getRequests();
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

