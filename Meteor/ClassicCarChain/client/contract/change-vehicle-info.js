Template.ChangeVehicleInfo.events( {
	'submit form': function(event) {
		event.preventDefault();

		var model = event.target.newModel.value;
		var manufacturingYear = event.target.newManufacturingYear.value;

		Ethereum.updateVehicleModel(model);
		//Ethereum.updateVehicleManufacturingYear(manufacturingYear);
		// TODO: Only submit these if the value has changed!

	}
});