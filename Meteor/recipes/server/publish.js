Meteor.publish('recipes',function(){ 
	return Recipes.find({
		author: this.userId
	});
});

Meteor.publish('recipeSingle',function(givenRecipeId){ 

	check (id, String); //Checks if the id is a string

	return Recipes.find ({
		_id: givenRecipeId
	});
});