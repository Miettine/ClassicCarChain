Ethereum.Highlights = (function () {

	'use strict';

	var keyHighlights = "highlights";

	var contractAddress = Ethereum.contractAddress();

	var contractInstance = Ethereum.contractInstance;

	var highlights = [];

	web3.eth.filter('latest').watch(function(e) {
	    if(!e) {
			//Loop through all of the highlights, save them to an array in this module.
			var iteratedHighlights = [];
			for (var i = 1; i<10; i++){
				iteratedHighlights.push(contractInstance.GetHighlight.call(i));
			}

			highlights = iteratedHighlights;
			Session.set(keyHighlights,highlights);
	    }
	});


	return {

		get: function (){
			return Session.get(keyHighlights);
		},

		addHighlightAsOwner: function (_message) {
			contractInstance.AddHighlightAsOwner.sendTransaction(_message, { from: Account.current(), gas:1800000} );
		},

		makeHighlightRequest: function (_message, _requestedAmount) {
			console.log(_message);
			console.log(_requestedAmount);
			
			contractInstance.MakeHighlightRequest.sendTransaction(_message, _requestedAmount, { from: Account.current() } );
		},

		deleteExistingHighlight: function(_id, _reasonForDeletion) {
			console.log(_id);
			console.log(_reasonForDeletion);

			contractInstance.MakeHighlightRequest.sendTransaction(_id, _reasonForDeletion, { from: Account.current() } );
		},

		rejectHighlightRequest: function(_id) {
			console.log(_id);

			contractInstance.RejectHighlightRequest.sendTransaction( _id, { from: Account.current() } );
		},

		acceptHighlightRequest: function(_id) {
			console.log(_id);
			contractInstance.AcceptHighlightRequest.sendTransaction( _id, { from: Account.current() } );

		}
	}
}());
