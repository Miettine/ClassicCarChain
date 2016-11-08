Template.Recipe.events({
	'click .add-to-menu': function(){
		console.log('click');
		Meteor.call('toggleMenuItem', this._id, true);
	}
});

Template.Recipe.events({
	'click .toggle-menu': function(){
		console.log('click');
		Meteor.call('toggleMenuItem', this._id, false);
	}
});