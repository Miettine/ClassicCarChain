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
