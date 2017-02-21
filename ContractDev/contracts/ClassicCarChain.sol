pragma solidity ^0.4.6;

contract ClassicCarChain {

	address public vehicleOwner;
	
	string public vehicleModel;

	uint public originBlockNumber; 
	
	uint public vehicleManufacturingYear;
	
	/// This index is used as an identifier of Highlights. It is incremented whenever a new highlight request is made.
	uint public highlightIndex=0;

	/////////////////////////////////////////

//Due to design considerations, it is important that this mapping and array are not made public. Only use other functions in this contract to modify them.

	//mapping(uint => CCClib.Highlight) private highlights;
	CCClib.Highlight[] private highlights;
	
	/////////////////////////////////////////
	
	function GetHighlightsArrayLength() public returns (uint){
		return highlights.length;
	}

	function AddNewToHighlights(CCClib.Highlight _h) private returns(bool) {
		if (HighlightExists(_h.id)){
			return false;
		}


		highlights.push(_h);

		return true;
	}
	
	function HighlightExists (uint _id) public returns(bool){
		for (uint i = 0; i< highlights.length ; i++){
			if (highlights[i].id==_id) {
				return true;
			}
		}

		return false;
	}

	function GetHighlight(uint _index) public returns (
		address _maker, 
		uint _requestCreationDateTime, 	
		uint _reward, 
		string _message,

		bool _madeByOwner,
		uint _additionToChainDateTime
		) {
		
		CCClib.Highlight h = highlights[_index];
		
		_maker = h.maker;
		_requestCreationDateTime = h.requestCreationDateTime;
		_reward = h.reward;
		_message = h.message;

		_madeByOwner = h.madeByOwner;
		_additionToChainDateTime = h.additionToChainDateTime;	
	}
	/*
		function GetHighlightById(uint _id) public {
		
		CCClib.Highlight h = highlights[_id];
		
		_maker = h.maker;
		_requestCreationDateTime = h.requestCreationDateTime;
		_reward = h.reward;
		_message = h.message;

		_madeByOwner = h.madeByOwner;
		_additionToChainDateTime = h.additionToChainDateTime;	
	}
*/

////O//||=================>

	event EHighlightRequestMade(
		uint highlightId,
		address maker,
		uint requestCreationDateTime,
		uint requestedReward,
		string message
	);

	function EmitEvent_HighlightRequestMade (CCClib.Highlight _h) private {
		EHighlightRequestMade(_h.id, _h.maker, _h.requestCreationDateTime, _h.reward, _h.message);
	}

	event EHighlightSavedToChain(
		uint highlightId,
		address maker,
		uint requestCreationDateTime,
		uint paidReward,
		string message,

		bool madeByOwner,
		uint additionToChainDateTime

	);

	function EmitEvent_HighlightSavedToChain (CCClib.Highlight _h) private {
		EHighlightSavedToChain(_h.id, _h.maker, _h.requestCreationDateTime, _h.reward, _h.message, _h.madeByOwner, _h.additionToChainDateTime);
	}

///

	event EHighlightRequestRejected( 
		uint rejectionDateTime,
		
		uint highlightId,
		address maker,
		uint requestCreationDateTime,
		uint requestedReward,
		string message
		);

	function EmitEvent_HighlightRequestRejected (CCClib.Highlight _h) private{
		EHighlightRequestRejected(now, _h.id, _h.maker, _h.requestCreationDateTime, _h.reward, _h.message);
	}

	event EHighlightDeleted( 
		uint deletionDateTime, 
		string reasonForDeletion,
		
		uint highlightId,
		address maker,
		uint requestCreationDateTime,
		uint paidReward,
		string message,
		bool madeByOwner,
		uint additionToChainDateTime
		);

	function EmitEvent_HighlightDeleted (CCClib.Highlight _h, string _reasonForDeletion) private{
		EHighlightDeleted(now, _reasonForDeletion, _h.id, _h.maker, _h.requestCreationDateTime, _h.reward, _h.message, _h.madeByOwner, _h.additionToChainDateTime);
	}

	event EVehicleOwnershipPassed(address oldOwner, address newOwner, uint dateTime);

	function ClassicCarChain(string _model, uint _year) {
		vehicleOwner = msg.sender;
		//The one who created this contract to the network becomes the first vehicle owner.
		
		originBlockNumber = block.number;
		vehicleModel = _model;
		vehicleManufacturingYear = _year;
	}
	
	modifier OnlyByOwner()
	{
		if (msg.sender == vehicleOwner) {
		
			_;
		}
	}
	
		modifier NotByOwner()
	{
		if (msg.sender != vehicleOwner) {
		
			_;
		}
	}
	
	function AddHighlightAsOwner (string _message) OnlyByOwner() public {

		CCClib.Highlight memory h = CCClib.NewHighlight(highlightIndex, 0, _message);

		AddNewToHighlights(h);

		EmitEvent_HighlightSavedToChain(h);

		highlightIndex += 1;
	}
	
	function MakeHighlightRequest(uint _reward, string _message) NotByOwner() public {
	    
    	CCClib.Highlight memory h = CCClib.NewHighlightRequest (highlightIndex, _reward, _message);
	
		highlights[highlightIndex] = h;
		
		EmitEvent_HighlightRequestMade(h);

		highlightIndex += 1;
	}
	
	function DeleteExistingHighlight(uint _id, string _reasonForDeletion) OnlyByOwner() public {
		//Deleting a key in a mapping replaces the struct of that 
		//key with a struct posessing default-values.
		
		EmitEvent_HighlightDeleted(highlights[_id], _reasonForDeletion);
		
		delete highlights[_id];
	}
	
	function RejectHighlightRequest(uint _id) OnlyByOwner()  {

  		EmitEvent_HighlightRequestRejected(highlights[_id]);
		
		delete highlights[_id];
	}

	function AcceptHighlightRequest(uint _id) OnlyByOwner() returns (bool)  {
		//TODO: Find out if this function needs to have the payable-keyword.
		//Is there some security restriction, that a contract cannot send funds if
		// the message sender doesn't send them?
		
		// Check if the owner actually has enough money.
	
	    CCClib.Highlight handledRequest = highlights[_id];
	
		if (vehicleOwner.balance < handledRequest.reward) {
			return false;
		}
		
		// Send the money to the maker

		if ( handledRequest.maker.send(handledRequest.reward)) {

			//PromoteHighlightRequest(CCClib.NewHighlight(handledRequest));
			
			EmitEvent_HighlightSavedToChain(highlights[_id]);
			
            //highlight index is not incremented here.
            
			return true;
		}
		
		return false;
	}
	
	function GiveVehicleOwnership(address _newOwner) OnlyByOwner()  {
		if (_newOwner!=vehicleOwner){
			address oldOwner = vehicleOwner;
			
			EVehicleOwnershipPassed( oldOwner,  _newOwner, now);
			// The now-keyword returns the current block timestamp, as soon as this transaction finds its way into a mined block.
			// I remember hearing that in the real Ethreum network, blocks are mined each 10 minutes. The timestamp is quite accurate.
			vehicleOwner = _newOwner;
		}
	}
}



library CCClib {


	struct Highlight{
		uint id;
		address maker;
		uint requestCreationDateTime;
		uint reward;
		string message;

        bool approvedToChain;
		bool madeByOwner;
		uint additionToChainDateTime;
		mapping(string => bool) maintenanceData;
	}
	
	function  NewHighlightRequest  (uint _id, uint _reward,string _message)internal returns ( Highlight){
		return Highlight({
			id: _id,
			maker: msg.sender,
			requestCreationDateTime: now,
			reward: _reward,
			message: _message,
			approvedToChain: false,
			madeByOwner: false,
			additionToChainDateTime:0
		});
	}
	
	function NewHighlight (uint _id, uint _reward,string _message) internal returns ( Highlight){
			
		return Highlight({
			id: _id,
			maker: msg.sender,
			requestCreationDateTime: now,
			reward: _reward,
			message: _message,
			approvedToChain: true,
			madeByOwner: true,
			additionToChainDateTime:now
		});
	}
	
	function bleh(uint[] maints, bool[] done) {
	    
	}
		
	function NewHighlight (uint _id, uint _reward,string _message, string[] maints) internal returns ( Highlight){
			
		return Highlight({
			id: _id,
			maker: msg.sender,
			requestCreationDateTime: now,
			reward: _reward,
			message: _message,
			approvedToChain: true,
			madeByOwner: true,
			additionToChainDateTime:now
		});
	}
	
	function PromoteHighlight (Highlight _h) internal returns ( Highlight){
		
		_h.approvedToChain=true;
		_h.additionToChainDateTime=now;
	}
}
