/*
Accounts.onLogin(function(){
	FlowRouter.go('recipe-book')
});
*/

FlowRouter.triggers.enter([   
	function(context, redirect){

			FlowRouter.go('home');
			//You need to give the name, demoted by "name",
			//not the route, which is "/" or "recipe-book".
		
	}
]);

FlowRouter.route('/', {
	name: 'home',
	action(){

		BlazeLayout.render('HomeLayout');
	}
});

//Reminder to self:
//The router lets you access different pages separated by "/"
//This script tells which layouts to load on which pages!
/*
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

FlowRouter.route('/ruokalista', {
	name: 'menu',
	action() {
		BlazeLayout.render('MainLayout', {main: 'Menu'});
		//This renders into mainLayout a template called "Menu"
	}
});*/