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

Template.EventHighlightRequestMade.helpers({
/*

*/
    requestCreationDateTime: function() {
        return Helpers.convertBigNumber(this.requestCreationDateTime);
    },
    highlightId: function() {
        return Helpers.convertBigNumber(this.highlightId);
    },
    maker: function() {
        return maker;
    },
    requestedReward: function() {
        return Helpers.convertBigNumber(this.requestedReward);
    },
    description: function() {
        return this.description;
    }
});

Template.EventHighlightSavedToChain.helpers({
/*

*/
    additionToChainDateTime: function() {
        return Helpers.convertBigNumber(this.additionToChainDateTime);
    },
    madeByCurrentOwner: function() {
        return this.madeByCurrentOwner;
    },
    highlightId: function() {
        return Helpers.convertBigNumber(this.highlightId);
    },
    maker: function() {
        return this.maker;
    },
    requestCreationDateTime: function() {
        return Helpers.convertBigNumber(this.requestCreationDateTime);
    },
    paidReward: function() {
        return Helpers.convertBigNumber(this.paidReward);
    },     
    description: function() {
        return this.description;
    }
});

Template.EventHighlightRequestRejected.helpers({

    rejectionDateTime: function() {
        return Helpers.convertBigNumber(this.rejectionDateTime);
    },
    highlightId: function() {
        return Helpers.convertBigNumber(this.highlightId);
    },
    maker: function() {
        return this.maker;
    },
    requestCreationDateTime: function() {
        return Helpers.convertBigNumber(this.requestCreationDateTime);
    },
    requestedReward: function() {
        return Helpers.convertBigNumber(this.requestedReward);
    },
    description: function() {
        return this.description;
    }
});

Template.EventHighlightDeleted.helpers({

    deletionDateTime: function() {
        return Helpers.convertBigNumber(this.deletionDateTime);
    },
    reasonForDeletion: function() {
        return this.reasonForDeletion;
    },
    highlightId: function() {
        return Helpers.convertBigNumber(this.highlightId);
    },
    maker: function() {
        return this.maker;
    },
    requestCreationDateTime: function() {
        return Helpers.convertBigNumber(this.requestCreationDateTime);
    },
    paidReward: function() {
        return Helpers.convertBigNumber(this.paidReward);
    },
    description: function() {
        return this.description;
    }
});

Template.EventHighlightDeleted.helpers({
/*
<template name="EventErrorOccurred">
    <section class="event">
        <h4>message: {{message}}</h4>
        <p></p>
    </section>
</template>
*/

    message: function() {
        return message;
    }
});
