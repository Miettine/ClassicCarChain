    
 /*   // create a local collection, 
    var contractData = new Meteor.Collection('contract-data', {connection: null});

    // create a local persistence observer
    var contractDataObserver = new PersistentMinimongo(contractData);

    // create a handlebars helper to fetch the data
    Handlebars.registerHelper("contractAddress", function () {
      return contractData.find();
    });

    // that's it. just use the collection normally and the observer
    // will keep it sync'd to browser storage. the data will be stored
    // back into the collection when returning to the app (depending,
    // of course, on availability of localStorage in the browser).

    shoppingCart.insert({ item: 'DMB-01', desc: 'Discover Meteor Book', quantity: 1 });


Template.ContractAddress.events( {
    'submit form': function(event) {
        event.preventDefault();
        console.log("Form submitted");
        console.log(event.type);

        var address = event.target.newOwnerAddress.value;
        console.log("In ownershipFirm:"+address);


        Ethereum.giveVehicleOwnership(address);

    }
});*/