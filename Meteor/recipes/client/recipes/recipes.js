Meteor.subscribe('recipes'); //Uhh? What does ths mean? What does it subscribe to?

Template.Recipes.helpers({
	//I messed up here at first, because I wrote "recipe", instaed of "recipes"
	recipes: ()=>{
		return Recipes.find({
//Gets content of the recipes schema (or whatever its supposed to be called)
// from the database 
		});
	}
});