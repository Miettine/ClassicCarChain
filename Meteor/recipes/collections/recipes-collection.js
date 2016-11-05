Recipes = new Mongo.Collection('recipes');
//Meteor.collection was the old way of doing it. Mongo is the new way.

Recipes.allow({
	insert: function(userId,doc) {
		return !!userId; //Checks if a user id exists. If it doesn't exist, it means the user isn't signed in.
		//In that case, the user isn't allowed to insert.
	}
});

Ingredient = new SimpleSchema({
	name: {
		type: String,
	},
	amount: {
		type: String,

	}
});

RecipeSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Nimi"
	},
	description: {
		type: String,
		label: "Kuvaus"
	},
	ingredients: {
		type: [Ingredient]
		//The type is an array of ingredients!
	},
	author: {
		type: String,
		label: "Tekijä",
		autoValue: function(){
			return this.userId
		},
		autoform:{
			type: "hidden"
		}
	},
	createdAt: {
		type: Date,
		label: "CreatedAt",
		autoValue: function(){
			return new Date(); //Returns current date.
		},	
		autoform:{
			type: "hidden"
		}
	}
});

Recipes.attachSchema(RecipeSchema);