
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

Template.registerHelper('convertDate', function(_bigNumber) {
	return Helpers.convertDate(_bigNumber);
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

Template.registerHelper('contractAddress', function(_bigNumber) {
	return Ethereum.contractAddress();
});

Template.registerHelper('allOffers', function(_bigNumber) {
	return Ethereum.Offers.getAll();
});

Template.registerHelper('goToPage', function(_pageName) {
	return "/"+Ethereum.contractAddress()+"/"+_pageName;
});

Template.registerHelper('ownershipBeingTransferred', function() {
	return Ethereum.Offers.ownershipBeingTransferred();
});

Template.registerHelper('acceptedOfferAmount', function() {
	return Ethereum.Offers.acceptedOfferAmount();
});

Template.registerHelper('upcomingOwner', function() {
	return Ethereum.Offers.upcomingOwner();
});

