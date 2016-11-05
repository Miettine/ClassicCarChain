FlowRouter.route('/', {
	name: 'home',
	action(){
		BlazeLayout.render('HomeLayout');
	}
});

//Reminder to self:
//The router lets you access different pages separated by "/"
//This script tells which layouts to load on which pages!

FlowRouter.route('/recipe-book', {
	name: 'recipe-book',
	action(){
		BlazeLayout.render('MainLayout', {main: 'Recipes'});
		//main is a reference to the layout, 
	}
});