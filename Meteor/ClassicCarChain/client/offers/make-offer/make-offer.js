Template.MakeOffer.events( {
	'submit form': function(event) {
		event.preventDefault();

		var amount = event.target.amount.value;

		Ethereum.Offers.makeOffer(Account.current(),amount);
	}
});