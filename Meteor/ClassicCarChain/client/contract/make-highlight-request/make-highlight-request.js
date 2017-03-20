Template.MakeHighlightRequest.events( {
	'submit form': function(event) {
		event.preventDefault();

		var message = event.target.message.value;
		var amountInEther = event.target.requestedAmount.value;
		var amountInWei = web3.toWei(amountInEther, 'ether');
		console.log(amountInWei);
		var big = new BigNumber(amountInWei);

		Ethereum.Highlights.makeRequest( big, message);

	}
});