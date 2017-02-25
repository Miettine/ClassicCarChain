Template.AddHighlightAsOwner.events( {
	'submit form': function(event) {
		event.preventDefault();

		var message = event.target.message.value;

		Ethereum.Highlights.addHighlightAsOwner(message);

	}
});