Template.Highlights.helpers({
    getMaker: function() {
    	if (this.madeByOwner) {
    		return this.maker+", vehicle owner";
    	}
    	return this.maker;
        
    },
    highlightStyle: function() {
		if (this.madeByOwner) {
			return "owner-highlight";
		}
		return "highlight";
	}
});