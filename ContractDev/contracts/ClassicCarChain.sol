pragma solidity ^0.4.6;

contract ClassicCarChain {

	struct Vehicle {
		address currentOwner;
		string model;
		date manufacturingYear;
	}
	
	// Highlight
	
	struct Highlight{
		address maker;
		string optionalContactInformation;
		string description;
		date date;
	}
	
}

// ProfessionalOpinion : Highlight
// Maintenance : Highlight
// NotableEvent : Highlight

// Highlight {
//	date
//  
// }