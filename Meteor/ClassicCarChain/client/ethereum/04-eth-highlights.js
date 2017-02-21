Ethereum.Highlights = (function () {

	'use strict';

	var contractAddress = Ethereum.contractAddress();

	var contractInstance = Ethereum.contractInstance;
/*


	web3.eth.filter('latest').watch(function(e) {
	    if(!e) {
			//Loop through all of the highlights, save them to an array in this module.
			m_contractInstance.vehicleModel(function(e, val) {
				Session.set(, val);
			});
			
	    }
	});
*/

	return {

		highlightsArray: function() {
			contractInstance.highlightsArray(function(e, val) {
				console.log(e);
				console.log(val);
				return val;
			});
			return "derp";
		},

		highlightsArrayLength: function() {
			return contractInstance.GetHighlightsArrayLength.call();
		},

		getHighlight: function(_id) {
			return contractInstance.GetHighlight.call(_id);
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
