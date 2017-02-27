Template.ChangeAccountDropdown.events( {

	'change .dapp-select-account select': function(e) {

		var value = TemplateVar.getFrom(e.currentTarget, 'value');

		//Account.setCurrentAccount(value);
		Session.set('currentAccount',  value);
		//console.log("Template.ChangeAccount.events: Ethereum.getCurrentAccount(): "+Ethereum.getCurrentAccount());
	}

});

