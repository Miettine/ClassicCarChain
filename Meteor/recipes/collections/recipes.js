Recipes = new Meteor.Collection('recipes');

RecipeSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Name"
	},
	description: {
		type: String,
		label: "Description"
	},
	author: {
		type: String,
		label: "Author",
		autoValue: function(){
			return this.userId
		}
	}, 
	createdAt: {
		type: Date,
		label: "CreatedAt",
		autoValue: function(){
			return new Date(); //Returns current date.
		}
	}
});

Recipes.attachSchema(RecipeSchema);