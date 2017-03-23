Template.Events.helpers({

	getEvent:function (_key) {
		console.log(_key);
		console.log(Session.get(_key));
		return Session.get(_key);
	}
});