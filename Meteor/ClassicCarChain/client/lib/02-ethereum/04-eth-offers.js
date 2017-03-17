Ethereum.Offers = (function () {

	'use strict';

	var contractInstance = Ethereum.contractInstance();

	var keyOffers = "keyOffers";
	
	var offers = [];
	
	function Offer(_id,_array) {
		this.id = _id;

 		this.initialized=_array[0];
	    this.maker=_array[1];
	    this.amount=Helpers.convertBigNumber(_array[2]);
	}

	
	var f_getAll = function() {
		return Session.get(keyOffers);
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
		}
	}
}());

