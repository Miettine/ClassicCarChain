Template.MakeOffer.events( {
	'submit form': function(event) {
		event.preventDefault();

		var amount = event.target.amount.value;

		Ethereum.Offers.make(amount);
	}
});