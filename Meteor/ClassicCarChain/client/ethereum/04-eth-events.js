Ethereum = (function (Events) {

	var allEventsArray=[];

	var events = Ethereum.contractInstance.allEvents({fromBlock: 0, toBlock: 'latest'});

	events.watch(function(error, result){
		if (err) {
			console.log("events, error: "+err);

			return;
		}
		
		allEventsArray.push(result.args);

		Session.set('allEventsArray', allEventsArray);
		console.log("allEventsArray: "+result.args);
		// append details of result.args to UI
	});

	Events.allEvents = function () {
		return allEventsArray;
	};

	return Events;
}(Ethereum));