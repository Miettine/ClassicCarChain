Template.ChangeAccount.events( {

	'change .dapp-select-account select': function(e) {

		var value = TemplateVar.getFrom(e.currentTarget, 'value');

		Ethereum.setCurrentAccount( value);

		//console.log("Template.ChangeAccount.events: Ethereum.getCurrentAccount(): "+Ethereum.getCurrentAccount());
	}

});

