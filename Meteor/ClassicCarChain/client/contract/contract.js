//ContractCollection = new Mongo.Collection('contract');


    /* Goal:
    Create a method for this interface to transfer vehicle ownership rights.

    1. Some dropdown that lets you choose which account to transfer the rights to.
    No, wrong. Not a dropdown, because the address can be anyone in the world. Not just someone who happens to use the same computer.
    2. A button that calls the smart contract. Button is required because this is a critical control that can be used to cause damage.
    3. Make a transaction by using web3. I have yet to do this, but this case is good practice.

    Possible problems:
    - Managing passwords. I understood that testrpc makes it automatic. If so, then how does this translate into using it with mist?
    - I have yet to handle the case that the user tries to transfer ownership rights to themselves. This is nonsensical, and I have yet to do anything to stop the user from doing this.
    - Is the "vehicle owner" field in the interface reactive already? I should be able to see that field updated if I refresh the page, tho.
    */

Template.Contract.helpers({

    vehicleOwner: function() {
        return Ethereum.vehicleOwnerAddress();
    },

    vehicleModel: function() {
        return Ethereum.vehicleModel();
    },

    vehicleManufacturingYear: function() {
        return Ethereum.vehicleManufacturingYear();
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