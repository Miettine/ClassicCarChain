Ethereum.Offers = (function () {

	'use strict';

	var f_contractInstance = function (){
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

				var oArray = f_contractInstance().GetOffer.call(i);

				var newO = new Offer(i,oArray);

				if (newO.initialized){
					iteratedOffers.push(newO);
				}
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

		make: function(_amount){
			console.log("makeOffer");
			
			f_contractInstance().MakeOffer.sendTransaction(_amount, { from: Account.current()} );
		
		},

		accept: function(_id){
			console.log("accept");
			
			f_contractInstance().AcceptOffer.sendTransaction(_id, { from: Account.current()} );
		
		},

		rejectOrRemove: function(_id){
			console.log("rejectOrRemove");

			f_contractInstance().RemoveOrRejectOffer.sendTransaction(_id, { from: Account.current()} );
		
		},

		cancelOwnershipChange: function(){
			console.log("cancelOwnershipChange");

			f_contractInstance().CancelOwnershipChange.sendTransaction(_id, { from: Account.current()} );

		},

 		acceptOwnershipChange : function(){
			console.log("acceptOwnershipChange");
			f_contractInstance().AcceptOwnershipChange.sendTransaction(_id, { from: Account.current()} );
		},

		ownershipBeingTransferred:  function(){
			return f_contractInstance().ownershipBeingTransferred();
		}
}());

