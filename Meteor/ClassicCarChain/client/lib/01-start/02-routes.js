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
/*
FlowRouter.route('/', {
	name: 'no-contract',
	action(){
		BlazeLayout.render('MainLayout', {main: 'NoContract'});
	}
});*/

FlowRouter.route('/:address', {
	name: 'home',
	action() {
		//Ethereum.setContractAddress(params._address);
		FlowRouter.go('contract');
	}
});

FlowRouter.route('/accounts', {
	name: 'accounts',
	action() {
		BlazeLayout.render('MainLayout', {main: 'Accounts'});
	}
});

FlowRouter.route('/:address/contract', {
	name: 'contract',
	action() {
		//Ethereum.setContractAddress(params._address);
		BlazeLayout.render('MainLayout', {main: 'Contract'});
		//main is a reference to the layout, 
	}
});

FlowRouter.route('/:address/highlights', {
	name: 'highlights',
	action() {
		BlazeLayout.render('MainLayout', {main: 'Highlights'});
		//main is a reference to the layout, 
	}
});

FlowRouter.route('/:_address/requests', {
	name: 'requests',
	action() {
		BlazeLayout.render('MainLayout', {main: 'HighlightRequests'});
		//main is a reference to the layout, 
	}
});


FlowRouter.route('/:_address/history', {
	name: 'history',
	action() {
		BlazeLayout.render('MainLayout', {main: 'Events'});
		//main is a reference to the layout, 
	}
});

FlowRouter.route('/:_address/blockchain', {
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
