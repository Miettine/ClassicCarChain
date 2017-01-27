Template.EventVehicleOwnershipPassed.helpers({

    dateTime: function() {
	  	var bigNumber = this.dateTime;
        return bigNumber.c[0]; 
    },

    oldOwner: function() {
        return this.oldOwner; 
    },
    newOwner: function() {
        return this.newOwner; 
    }		
});

Template.EventVehicleInformationUpdated.helpers({

    dateTime: function() {
        var bigNumber = this.eventDateTime;
        return bigNumber.c[0]; 
    },

    model: function() {
        return this.model; 
    },
    
    manufacturingYear: function() {
        var bigNumber = this.manufacturingYear;
        return bigNumber.c[0]; 
    }
});


Template.EventHighlightSavedToChain.helpers({
    additionToChainDateTime: function() {
        var bigNumber = this.additionToChainDateTime;
        return bigNumber.c[0];
    },

    highlightId: function() {
        var bigNumber = this.highlightId;
        return bigNumber.c[0];
    },

    maker: function() {
        return this.maker;
    },

    requestCreationDateTime: function() {
        var bigNumber = this.requestCreationDateTime;
        return bigNumber.c[0]; 
    },

    paidReward: function() {
        var bigNumber = this.paidReward;
        return bigNumber.c[0]; 
    },
            
    description: function() {
        return this.maker;
    }
});
