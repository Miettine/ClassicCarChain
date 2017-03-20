Ethereum.Highlights = (function () {

	'use strict';

	var keyHighlights = "highlights";
	var keyHighlightIndex = "keyHighlightIndex";
	
	var f_contractInstance = function (){
		return Ethereum.contractInstance();
	} 

	var highlights = [];
	
	//The highlight javascript object is initialized 
	//by giving it the array that the GetHighlight-function returns.
	function Highlight(_id,_array) {
		this.id = _id;

		this.highlightType = Helpers.convertBigNumber(_array[0]);
		//Todo: Later, make some conversion into some enum type,

		this.initialized = _array[1];

		this.maker = _array[2];
		this.requestCreationDateTime = Helpers.convertDate(_array[3]);

		this.reward = _array[4]; 
		//The reward is a big number. Should not be converted to decimal because the wei amounts are big.
		//Convert to ether in the template.

		this.message = _array[5];

		this.approvedToChain = _array[6];
		this.madeByOwner = _array[7];
		this.additionToChainDateTime = Helpers.convertDate(_array[8]);
	}

	//TODO: Perhaps some inheritance model for different types of highlights.
	//Then again, is it needed on the client? It's not on the server at all.

	web3.eth.filter('latest').watch(function(e) {
	    if(!e) {

			//HighlightIndex:
			var m_highlightIndex=0;

			var m_highlightIndex = Helpers.convertBigNumber(f_contractInstance().highlightIndex());

			Session.set(keyHighlightIndex,m_highlightIndex);

			//Loop through all of the highlights, save them to an array in this module.
			var iteratedHighlights = [];

			for (var i = 0; i < m_highlightIndex; i++){

				var hArray = f_contractInstance().GetHighlight.call(i);

				//console.log(hArray);

				var newH = new Highlight(i,hArray);

				if (newH.initialized){
					iteratedHighlights.push(newH);
				}
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
			console.log("getAll");
			return f_getAll();
		},

		getAccepted:function (){
			console.log("getAccepted");
			return f_getAll().filter(isApproved);
		},

		getRequests:function (){
			console.log("getRequests");
			return f_getAll().filter(isRequest);
		},

		numberOf: function(){
			console.log("numberOf");
			return Session.get(keyHighlightIndex);
		},

		addAsOwner: function (_message) {
			console.log("addAsOwner");
			console.log(_message);
			f_contractInstance().AddHighlightAsOwner.sendTransaction(_message, { from: Account.current(), gas:1800000} );
		},

		makeRequest: function ( _requestedAmount , _message) {

				console.log("makeRequest");
			console.log(_message);
			console.log(_requestedAmount);
			
			f_contractInstance().MakeHighlightRequest.sendTransaction(_requestedAmount, _message, { from: Account.current(), gas:1800000 } );
		},

		delete: function(_id, _reasonForDeletion) {
			console.log("delete");
			console.log(_id);
			console.log(_reasonForDeletion);

			f_contractInstance().DeleteExistingHighlight.sendTransaction(_id, _reasonForDeletion, { from: Account.current() } );
		},

		rejectRequest: function(_id) {
			console.log("rejectRequest");
			console.log(_id);

			f_contractInstance().RejectHighlightRequest.sendTransaction( _id, { from: Account.current() } );
		},

		acceptRequest: function(_id) {
			console.log("acceptRequest");
			console.log(_id);
			f_contractInstance().AcceptHighlightRequest.sendTransaction( _id, { from: Account.current() } );

		}
	}
}());
