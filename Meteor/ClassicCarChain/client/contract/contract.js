//ContractCollection = new Mongo.Collection('contract');
/*
Template.Contract.onCreated(function contractTemplateCreated() {
    Session.set('contractAddress', Ethereum.contractAddress());
});

*/

Template.Contract.helpers({

    contractAddress: function() {
        return Ethereum.contractAddress(); //Session.get('contractAddress');
    },

    vehicleOwner: function() {
        return Ethereum.vehicleOwner(); //Session.get('vehicleOwner');
    },

    vehicleModel: function() {
        return Ethereum.vehicleModel(); //Session.get('vehicleModel');
    },

    vehicleManufacturingYear: function() {
        //Web3 returns the number from the contract as a BigNumber. Need to get the integer from a bignumber object.
        var bigNumber = Session.get('vehicleManufacturingYear');
        return bigNumber.c[0];
        //TODO, FIXME: This returns an error when the page loads, apparently when the vehicleManufacturing year is not yet updated from the blockchain.
    },

    currentAccountIsOwner: function() {
        var current = Account.current(); //Session.get('currentAccount')
        var sessionVehicleOwner = Ethereum.vehicleOwner(); //Session.get('vehicleOwner');
        var currentAndOwnerAreSame = current === sessionVehicleOwner;
        console.log("current:"+current+" sessionVehicleOwner:"+sessionVehicleOwner+" currentAccountIsOwner:"+currentAndOwnerAreSame);
        //If either is undefined, then ownership cannot be determined
        return currentAndOwnerAreSame && (current != undefined) && (sessionVehicleOwner != undefined);
        //TODO: Test this function if an account other than Etherbase is used to deploy the contract.
    }
});


/*
contract.observe({
    added: function() {
            console.log("added");
        
    },
    changed: function() {
            console.log("changed");
        
    },
    removed: function() {
            console.log("removed");
        
    },
});*/