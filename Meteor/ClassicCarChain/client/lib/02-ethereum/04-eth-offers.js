Ethereum.Offers = (function () {

	'use strict';

	var contractInstance = function (){
		return Ethereum.contractInstance();
	} 

	var keyOffers = "keyOffers";
	var keyOfferIndex = "keyOfferIndex"
	
	var offers = [];
	
	function Offer(_id,_array) {
		this.id = _id;

 		this.initialized=_array[0];
	    this.maker=_array[1];
	    this.amount=Helpers.convertBigNumber(_array[2]);
	}


	web3.eth.filter('latest').watch(function(e) {
	    if(!e) {

			var m_offerIndex = Helpers.convertBigNumber(f_contractInstance().offerIndex());

			Session.set(keyOfferIndex,m_offerIndex);

			//Loop through all of the highlights, save them to an array in this module.
			var iteratedOffers = [];

			for (var i = 0; i < m_offerIndex; i++){

				var oArray = contractInstance().GetOffer.call(i);
				console.log(oArray);

				var newH = new Offer(i,oArray);

				iteratedOffers.push(newH);
			}

			offers = iteratedOffers;
			Session.set(keyOffers, offers);
	    }
	});
	
	var f_getAll = function() {
		return Session.get(keyOffers);
	}

	return {

		getAll: function (){
			return f_getAll();
		},

		numberOf: function(){
			return Session.get(keyOfferIndex);
		},

		makeOffer: function(_amount){
			console.log("makeOffer");
			
			contractInstance().MakeOffer.sendTransaction(_amount, { from: Account.current()} );
		
		}

	}
}());

