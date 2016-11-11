Template.RecipeSingle.onCreated(function(){
	var self = this;

	//autorun unsubscribes from any old subscriptions.
	self.autorun(function(){

		var wantedRecipeId = FlowRouter.getParam('id');

		self.subscribe('recipeSingle',wantedRecipeId );
		//Pay attention to the way how you gave the parameter
		//to the subscribe-function.
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