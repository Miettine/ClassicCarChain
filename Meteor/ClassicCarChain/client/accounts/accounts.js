Template.Accounts.onCreated(function onCreated() {

	EthAccounts.init();
	//var myAccounts = EthAccounts.find().fetch();
});

Template.Accounts.helpers({

	allAccounts: ()=>{
		return EthAccounts.find().fetch();
	}
});

