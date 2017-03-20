Template.MakeOffer.events( {
	'submit form': function(event) {
		event.preventDefault();

		//var amount = event.target.amount.value;
		//Ethereum.Offers.make(amount);


		var amountInEther = event.target.amount.value;
		console.log("amountInEther");
		console.log(amountInEther);

		var amountInWei = web3.toWei(amountInEther, 'ether');
		console.log("amountInWei");
		console.log(amountInWei);
		var bigNumber = new BigNumber(amountInWei);

		console.log("bigNumber");
		console.log(bigNumber);

		Ethereum.Offers.make( bigNumber);

	}
});