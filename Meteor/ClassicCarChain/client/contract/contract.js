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
        return new BigNumber(Session.get('vehicleManufacturingYear'));

    },
    currentAccountIsOwner: function() {
        return Ethereum.currentAccount == this.vehicleOwner;
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