Template.ChangeAccount.events( {

	'change .dapp_selectAccount select': function(e) {

		var value = TemplateVar.getFrom(e.currentTarget, 'value');

		web3.eth.defaultAccount = value;

		console.log(web3.eth.defaultAccount);
	}

});