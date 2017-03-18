
Library = (function() {	
	'use strict';

	return {
		
	}
}());

Helpers = (function() {	
	'use strict';

	var f_convertNumber = function(_bigNumber) {
		if (_bigNumber !=null){
			return _bigNumber.c[0];
		}
		return "err";
	}

	var f_convertDate = function(_seconds){
		return new Date(0, 0, 0, 0, 0, f_convertNumber( _seconds), 0);
	}

	return {
		convertBigNumber: f_convertNumber,
		convertDate: f_convertDate
	}
}());