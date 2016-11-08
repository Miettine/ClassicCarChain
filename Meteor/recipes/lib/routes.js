Accounts.onLogin(function(){
	FlowRouter.go('recipe-book')
});

Accounts.onLogout(function(){
	FlowRouter.go('home')
});

FlowRouter.triggers.enter([
	function(context, redirect){
		if (!Meteor.userId()){
			FlowRouter.go('home');
			//You need to give the name, demoted by "name",
			//not the route, which is "/" or "recipe-book".
		}
	}
]);

FlowRouter.route('/', {
	name: 'home',
	action(){
		if (Meteor.userId()){
			//If userId exists
			FlowRouter.go('recipe-book')
		}
		BlazeLayout.render('HomeLayout');
	}
});

//Reminder to self:
//The router lets you access different pages separated by "/"
//This script tells which layouts to load on which pages!

FlowRouter.route('/reseptikirja', {
	name: 'recipe-book',
	action() {
		BlazeLayout.render('MainLayout', {main: 'Recipes'});
		//main is a reference to the layout, 
	}
});

FlowRouter.route('/resepti/:id', {
	name: 'recipe',
	action(){
		BlazeLayout.render('MainLayout', {main: 'RecipeSingle'});
		//main is a reference to the layout, 
	}
});