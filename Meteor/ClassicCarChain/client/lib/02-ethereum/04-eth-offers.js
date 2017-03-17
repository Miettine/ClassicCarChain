Ethereum.Offers = (function () {

	'use strict';

	var contractInstance = Ethereum.contractInstance();

	var keyOffers = "keyOffers";
	var keyNumberOfOffers = "keyNumberOfOffers"
	
	var offers = [];
	
	function Offer(_id,_array) {
		this.id = _id;

 		this.initialized=_array[0];
	    this.maker=_array[1];
	    this.amount=Helpers.convertBigNumber(_array[2]);
	}


	web3.eth.filter('latest').watch(function(e) {
	    if(!e) {

 			var m_numberOfOffers = contractInstance.numberOfOffers(function(e, val) {
				Session.set(keyNumberOfOffers, val);
			});

			//Loop through all of the highlights, save them to an array in this module.
			var iteratedOffers = [];

			for (var i = 0; i < m_numberOfHighlights; i++){

				var hArray = contractInstance().GetOffer.call(i);
				//console.log(hArray);

				var newH = new Highlight(i,hArray);

				iteratedHighlights.push(newH);
			}

			highlights = iteratedHighlights;
			Session.set(keyHighlights, highlights);
	    }
	});
	
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

