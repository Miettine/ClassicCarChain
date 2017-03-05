Ethereum.Offers = (function () {

	'use strict';

	var contractInstance = Ethereum.contractInstance();

	var keyOffers = "highlights";
	

	var offers = [];
	
	//The highlight javascript object is initialized 
	//by giving it the array that the GetHighlight-function returns.
	function Offer(_id,_array) {
		this.id = _id;

 		this.initialized=_array[0];
	    this.maker=_array[1];
	    this.amount=Helpers.convertBigNumber(_array[2]);
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

		numberOf: function(){
			return Helpers.convertBigNumber(Session.get(keyHighlightsArrayLength));
		},

		index: function(){
			return Helpers.convertBigNumber( Session.get(keyHighlightIndex));
		}
	}
}());

