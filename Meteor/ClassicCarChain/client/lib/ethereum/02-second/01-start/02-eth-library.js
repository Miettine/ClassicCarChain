
Library = (function() {	
	'use strict';

	return {
		
	}
}());


C = (function() {	
	//C stands for constants
	'use strict';

	return {


	}
}());

Helpers = (function() {	
	'use strict';

	var f_convertNumber = function(_bigNumber) {
		//console.log("f_convertNumber");

		if (_bigNumber !=null){
			//console.log(_bigNumber.toNumber());


			if (_bigNumber.toNumber !=null){
				return _bigNumber.toNumber();
			}
			
			return _bigNumber.c[0];
		}
		return "err";
	}

	var f_convertDate = function(_seconds){
		//console.log(_seconds);
		return new Date(70, 0, 0, 0, 0, f_convertNumber( _seconds), 0);
	}

	return {
		convertBigNumber: f_convertNumber,
		convertDate: f_convertDate
	}
}());