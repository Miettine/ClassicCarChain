Template.Events.helpers({

	eventsVehicleOwnershipPassed:function () {
		return Ethereum.Events.vehicleOwnershipPassed();
	},

	eventsVehicleInformationUpdated:function () {
		return Ethereum.Events.vehicleInformationUpdated();
	},

	eventsHighlightRequestMade:function () {
		return Ethereum.Events.highlightRequestMade();
	},

	eventsHighlightSavedToChain:function () {
		return Ethereum.Events.highlightSavedToChain();
	},

	eventsHighlightDeleted:function () {
		return Ethereum.Events.highlightDeleted();
	},

	eventsErrorOccurred:function () {
		return Ethereum.Events.errorOccurred();
	}
});
