/*
Accounts.onLogin(function(){
	FlowRouter.go('recipe-book')
});
*/
/*
FlowRouter.triggers.enter([   
	function(context, redirect){

			FlowRouter.go('home');
			//You need to give the name, demoted by "name",
			//not the route, which is "/" or "recipe-book".
		console.log("go home");
	}
]);*/

FlowRouter.route('/', {
	name: 'no-contract',
	action(){
		BlazeLayout.render('NoContract');
	}
});

var address = FlowRouter.group({
    prefix: "/:address"
});

address.route('/', {
	name: 'home',
	action() {
		/*FlowRouter.setParams({prefix: address})
		FlowRouter.go('contract');*/
		FlowRouter.redirect('contract');
	}
});

address.route('/accounts', {
	name: 'accounts',
	action() {
		BlazeLayout.render('MainLayout', {main: 'Accounts'});
	}
});

address.route('/contract', {
	name: 'contract',
	action() {
		BlazeLayout.render('MainLayout', {main: 'Contract'});
		//main is a reference to the layout, 
	}
});

address.route('/highlights', {
	name: 'highlights',
	action() {
		BlazeLayout.render('MainLayout', {main: 'Highlights'});
		//main is a reference to the layout, 
	}
});

address.route('/requests', {
	name: 'requests',
	action() {
		BlazeLayout.render('MainLayout', {main: 'HighlightRequests'});
		//main is a reference to the layout, 
	}
});


address.route('/history', {
	name: 'history',
	action() {
		BlazeLayout.render('MainLayout', {main: 'Events'});
		//main is a reference to the layout, 
	}
});

address.route('/blockchain', {
	name: 'blocks',
	action() {

  		//Ethereum.setContractAddress(params);
		
		BlazeLayout.render('MainLayout', {main: 'Blocks'});
		//main is a reference to the layout, 
	}
});


//Reminder to self:
//The router lets you access different pages separated by "/"
//This script tells which layouts to load on which pages!
