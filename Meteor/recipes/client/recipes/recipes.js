//Meteor.subscribe('recipes'); 
//Uhh? What does ths mean? 
//What does it subscribe to?

/*
In a real application, there could be thousands of users.
You cannot make all of them subscribe to what happens in
the recipe-schema. The user only needs to know what happens
to recipes that they own.
*/

Template.Recipes.onCreated(function(){
	var self = this;
	self.autorun(function(){
		//autorun unsubscribes from any old subscriptions.
		self.subscribe('recipes');
	});
});

Template.Recipes.helpers({
	//I messed up here at first, because I wrote "recipe", instaed of "recipes"
	recipes: ()=>{
		return Recipes.find({
//Gets content of the recipes schema (or whatever its supposed to be called)
// from the database 
		});
	}
});