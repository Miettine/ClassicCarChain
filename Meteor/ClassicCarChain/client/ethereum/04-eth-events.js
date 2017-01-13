Template.registerHelper('setCurrentAccount', function(_value) {
	Session.set('currentAccount',  _value);
});