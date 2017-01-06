//ContractCollection = new Mongo.Collection('contract');
/*
Template.Contract.onCreated(function contractTemplateCreated() {
    Ethereum.vehicleOwner(function(e, val) {
        Session.set('vehicleOwner', val);
    });

});*/

Template.Contract.helpers({

    contractAddress: function() {
        return Ethereum.contractAddress();
        
    },

    vehicleOwner: function() {
        return Session.get('vehicleOwner');
        
    },

    vehicleModel: function() {
        return Session.get('vehicleModel');
        
    },

    vehicleManufacturingYear: function() {
        //Web3 returns the number from the contract as a BigNumber. Need to get the integer from a bignumber object.
        var bigNumber = Session.get('vehicleManufacturingYear');
        return bigNumber.c[0];
    },

    currentAccountIsOwner: function() {
        var current = Session.get('currentAccount')
        var sessionVehicleOwner = Session.get('vehicleOwner');
        var bool = current == sessionVehicleOwner;
        console.log("Account.getCurrentAccount():"+current+" sessionVehicleOwner:"+sessionVehicleOwner+" currentAccountIsOwner:"+bool);
        return bool;
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