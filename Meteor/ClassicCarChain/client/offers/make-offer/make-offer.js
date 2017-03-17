Template.MakeOffer.events( {
	'submit form': function(event) {
		event.preventDefault();

		var amount = event.target.message.value;

		Ethereum.Offers.makeOffer(Account.current(),amount);
	}
});