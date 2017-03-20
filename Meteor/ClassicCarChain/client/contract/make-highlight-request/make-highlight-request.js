Template.MakeHighlightRequest.events( {
	'submit form': function(event) {
		event.preventDefault();

		console.log("MakeHighlightRequest submit form");

		var message = event.target.message.value;
		
		var amountInEther = event.target.request.value;
console.log("amountInEther");
		console.log(amountInEther);

		var amountInWei = web3.toWei(amountInEther, 'ether');
		console.log("amountInWei");
		console.log(amountInWei);
		var bigNumber = new BigNumber(amountInWei);

		console.log("bigNumber");
		console.log(bigNumber);

		Ethereum.Highlights.makeRequest( bigNumber, message);



	}
});