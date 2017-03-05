Template.Header.helpers({

	goToPage:function (_pageName) {
		return "/"+Ethereum.contractAddress()+"/"+_pageName;
	}
	/*
	,	
	contract:function () {
		return "";
	},
	highlights:function () {
		return "";
	},
	requests:function () {
		return "";
	},
	history:function () {
		return "";
	},
	blockchain:function () {
		return "";
	}
	*/
});