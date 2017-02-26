Template.Highlights.helpers({
    getMaker: function() {
    	if (this.madeByOwner) {
    		return address +", vehicle owner"
    	}
    	return address;
        
    },
    highlightStyle: function() {
		if (this.madeByOwner) {
			return "owner-highlight";
		}
		return "highlight";
	}
});