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

	//TODO: Perhaps some inheritance model for different types of highlights.
	//Then again, is it needed on the client? It's not on the server at all.

	var 

	web3.eth.filter('latest').watch(function(e) {
	    if(!e) {

 			contractInstance().highlightIndex(function(e, val) {
				Session.set(keyHighlightIndex, val);
			});

			f_contractInstance().vehicleManufacturingYear(function(e, val) {
				Session.set(keyVehicleManufacturingYear,  val);
			});

			var m_arrayLength = contractInstance().GetNumberOfOffers.call();
			Session.set(keyOffersArrayLength, m_arrayLength);

			//Loop through all of the highlights, save them to an array in this module.
			var iteratedOffers = [];

			for (var i = 0; i < m_arrayLength; i++){

				var oArray = contractInstance().GetOffer.call(i);
				//console.log(hArray);

				var newO = new Offer(i,oArray);
				if (newO.initialized){
					iteratedOffers.push(newO);
				}
				
			}

			offers = iteratedOffers;
			Session.set(keyOffers, offers);
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

		numberOf: function(){
			return Helpers.convertBigNumber(Session.get(keyHighlightsArrayLength));
		},

		index: function(){
			return Helpers.convertBigNumber( Session.get(keyHighlightIndex));
		}
	}
}());

