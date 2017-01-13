Template.Event.helpers({

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
