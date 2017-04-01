Template.Highlights.helpers({
    getMaker: function() {
    	if (this.madeByOwner) {
    		return this.maker+", vehicle owner";
    	}
    	return this.maker;
        
    }
    /*,
    //The plan was to display a different css-style whether the viewer was a regular viewer or the owner.
    highlightStyle: function() {
		if (this.madeByOwner) {
			return "container";
		}
		return "container";
	}*/
});

Template.Highlights.events( {

    'submit form': function(event) {
        event.preventDefault();

        console.log("You clicked delete "+ this.id);
        var text = event.target.reasonForDeletion.value;

        Ethereum.Highlights.delete(this.id, text);
    }
});

