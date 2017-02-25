
Template.HighlightRequests.helpers({

    allHighlightRequests: function() {
        return Ethereum.Highlights.getRequests(); //Session.get('contractAddress');
    }
});