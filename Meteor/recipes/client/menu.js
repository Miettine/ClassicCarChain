Template.Menu.onCreated(function(){
	var self = this;

	//autorun unsubscribes from any old subscriptions.
	self.autorun(function() {
		self.subscribe('recipes');
	});
});

Template.Menu.helpers({
	
	recipe: ()=>{
		return Recipes.find({inMenu: true});
	}
});