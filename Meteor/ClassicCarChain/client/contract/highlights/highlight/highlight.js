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

Template.Highlights.events( {

    "click .delete-highlight": function(){
        console.log("You clicked delete "+ this.id);
        Ethereum.Highlights.delete(this.id, "");
    }
});