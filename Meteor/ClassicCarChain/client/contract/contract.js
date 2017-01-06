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
        var bigNumber = Session.get('vehicleManufacturingYear');
        return bigNumber.c[0];

    },
    currentAccountIsOwner: function() {
        return Account.getCurrentAccount() === this.vehicleOwner;
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