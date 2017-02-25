
Template.Highlights.helpers({

    allHighlights: function() {
        return Ethereum.Highlights.get(); //Session.get('contractAddress');
    }
});