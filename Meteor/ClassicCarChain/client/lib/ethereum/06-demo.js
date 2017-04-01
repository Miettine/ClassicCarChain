
Demo = (function() {	
	//C stands for constants
	'use strict';

	return {
		init: function(){

			var accountBeforeDemo = Account.current();

			Account.setCurrent(web3.eth.accounts[0]);

			Ethereum.Highlights.addAsOwner("Changed tires to winter tires.");
			Ethereum.Highlights.addAsOwner("Timing belt snapped when I was driving in Oulu. Changed it myself. Will this curse ever be lifted from our city?");

			Account.setCurrent(web3.eth.accounts[1]);

			Ethereum.Highlights.makeRequest( new BigNumber("0.5e18") , "Went for a joyride with my buddy who owns this car. What a great experience!");
			Ethereum.Offers.make(new BigNumber("30e18"));

			Account.setCurrent(web3.eth.accounts[2]);

			Ethereum.Highlights.makeRequest(new BigNumber("0.7e18"),"Blown tire fixed, by Välivainio Bensis.");
			Ethereum.Offers.make(new BigNumber("32e18"));

			Account.setCurrent(web3.eth.accounts[3]);

			Ethereum.Highlights.makeRequest(new BigNumber("1e18"), "Class Win at the Greenwich Concours. First place!");
			Ethereum.Offers.make(new BigNumber("35e18"));

			Account.setCurrent(accountBeforeDemo);
		}

	}
}());