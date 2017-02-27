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

    highlightIndex: function() {
        return Ethereum.highlightIndex();
    },

    vehicleOwner: function() {
        return Ethereum.vehicleOwner(); //Session.get('vehicleOwner');
    },

    vehicleModel: function() {
        return Ethereum.vehicleModel(); //Session.get('vehicleModel');
    },

    vehicleManufacturingYear: function() {
        //Web3 returns the number from the contract as a BigNumber. Need to get the integer from a bignumber object.
        return Ethereum.vehicleManufacturingYear();
        //TODO, FIXME: This returns an error when the page loads, apparently when the vehicleManufacturing year is not yet updated from the blockchain.
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