Template.RecipeSingle.onCreated(function(){
	var self = this;
	self.autorun(function(){
		//autorun unsubscribes from any old subscriptions.
		self.subscribe('recipes');
	});
});

Template.RecipeSingle.helpers({
	//I messed up here at first, because I wrote "recipe", instaed of "recipes"
	recipe: ()=>{
		var wantedRecipeId = FlowRouter.getParam('id');
		//gets the id from the url.
		return Recipes.findOne({

			//findOne finds one recipe? Based on what criteria?
			_id: wantedRecipeId
			//
		});
	}
});