Ethereum.Highlights = (function () {

	'use strict';

	var keyHighlights = "highlights";
	var keyHighlightsArrayLength = "keyHighlightsArrayLength";
	var keyHighlightIndex = "highlightIndex";

	var contractAddress = Ethereum.contractAddress();

	var contractInstance = Ethereum.contractInstance;

	var highlights = [];
	
	//The highlight javascript object is initialized 
	//by giving it the array that the GetHighlight-function returns.
	function Highlight(_id,_array) {
		this.id = _id;

		this.highlightType = Helpers.convertBigNumber(_array[0]);

		this.maker = _array[1];
		this.requestCreationDateTime = Helpers.convertDate(_array[2]);
		this.reward = Helpers.convertBigNumber(_array[3]);
		this.message = _array[4];

		this.approvedToChain = _array[5];
		this.madeByOwner = _array[6];
		this.additionToChainDateTime = Helpers.convertDate(_array[7]);
	}

	web3.eth.filter('latest').watch(function(e) {
	    if(!e) {

 			contractInstance.highlightIndex(function(e, val) {
				Session.set(keyHighlightIndex, val);
			});

			var m_arrayLength = contractInstance.GetHighlightsArrayLength.call();
			Session.set(keyHighlightsArrayLength, m_arrayLength);

			//Loop through all of the highlights, save them to an array in this module.
			var iteratedHighlights = [];

			for (var i = 0; i < m_arrayLength; i++){

				var hArray = contractInstance.GetHighlight.call(i);
				//console.log(hArray);

				var newH = new Highlight(i,hArray);

				iteratedHighlights.push(newH);
			}

			highlights = iteratedHighlights;
			Session.set(keyHighlights, highlights);
	    }
	});

	function isRequest(element, index, array) {
		return element.approvedToChain == false;
	}

	function isApproved(element, index, array) {
		return element.approvedToChain == true;
	}

	var f_getAll = function() {
		return Session.get(keyHighlights);
	}

	return {

		getAll: function (){
			return f_getAll();
		},

		getAccepted:function (){
			return f_getAll().filter(isApproved);
		},

		getRequests:function (){
			return f_getAll().filter(isRequest);
		},

		numberOfHighlights: function(){
			return Helpers.convertBigNumber(Session.get(keyHighlightsArrayLength));
		},

		highlightIndex: function(){
			return Helpers.convertBigNumber( Session.get(keyHighlightIndex));
		},


		addAsOwner: function (_message) {
			contractInstance.AddHighlightAsOwner.sendTransaction(_message, { from: Account.current(), gas:1800000} );
		},

		makeRequest: function ( _requestedAmount , _message) {
			console.log(_message);
			console.log(_requestedAmount);
			
			contractInstance.MakeHighlightRequest.sendTransaction(_requestedAmount, _message, { from: Account.current(), gas:1800000 } );
		},

		deleteExistingHighlight: function(_id, _reasonForDeletion) {
			console.log(_id);
			console.log(_reasonForDeletion);

			contractInstance.DeleteExistingHighlight.sendTransaction(_id, _reasonForDeletion, { from: Account.current() } );
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
