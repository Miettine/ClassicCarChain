pragma solidity ^0.4.6;

contract ClassicCarChain {

	address public vehicleOwner;
	
	string public vehicleModel;

	uint public originBlockNumber; 
	
	uint public vehicleManufacturingYear;
	
	/// This index is used as an identifier of Highlights. It is incremented whenever a new highlight request is made.
	uint public highlightIndex=0;
	
	mapping(uint => CCClib.Highlight) private highlights;
	mapping(uint => CCClib.HighlightRequest) private highlightRequests;

	event EHighlightRequestMade(
		uint highlightId,
		address maker,
		uint requestCreationDateTime,
		uint requestedReward,
		string message
	);

	function EmitEvent_HighlightRequestMade (CCClib.HighlightRequest _h) private {
		EHighlightRequestMade(_h.id, _h.maker, _h.requestCreationDateTime, _h.reward, _h.message);
	}

////O//||=================>
	
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

	function EmitEvent_HighlightRequestRejected (CCClib.HighlightRequest _h) private{
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

	//The left-side uint is the highlight id
	//A highlight begins its life in the requests-mapping.
	//If its allowed by the owner, the highlight request gets "promoted" into the highlights-mapping.
	
	CCClib.Highlight[] private highlightsArray;

	function HighlightExists (uint _id) private returns(bool){
		for (uint i = 0; i< highlightsArray.length ; i++){

		}

		if (exists){
			return true;
		}
		return false;
	}

	function GetHighlight(uint _id) 
	returns (
		address _maker, 
		uint _requestCreationDateTime, 	
		uint _reward, 
		string _message,

		bool _madeByOwner,
		uint _additionToChainDateTime
		) {
		
		CCClib.Highlight h = highlights[_id];
		
		_maker = h.maker;
		_requestCreationDateTime = h.requestCreationDateTime;
		_reward = h.reward;
		_message = h.message;

		_madeByOwner = h.madeByOwner;
		_additionToChainDateTime = h.additionToChainDateTime;	
	}

	/*
	C# pseudo-code
	/// returns: if highlight with given id exists.
	public bool GetHighlight(int _id, out Highlight _highlight){
		if (!exists) {
			_highlight = null; //What if type is not nullable?
			return false
		}
		_highlight = highlight;
		return true;
	}



	*/
	
	function GetHighlightRequest(uint _id) 
	returns (
		address _maker,
		uint _requestCreationDateTime,
		uint _requestedReward,
		string _message
		) {

		CCClib.HighlightRequest h = highlightRequests[_id];
		
		_maker = h.maker;
		_requestCreationDateTime = h.requestCreationDateTime;
		_requestedReward = h.reward;
		_message = h.message;
	}

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
	
	function AddHighlightAsOwner (string _message) OnlyByOwner() {

		highlights[highlightIndex] = CCClib.NewHighlight (highlightIndex, 0, _message);

		EmitEvent_HighlightSavedToChain(highlights[highlightIndex]);

		highlightIndex += 1;
	}
	
	function MakeHighlightRequest(uint _reward, string _message) NotByOwner() {
	 
		highlightRequests[highlightIndex] = CCClib.NewHighlightRequest (highlightIndex, _reward, _message);
		
		EmitEvent_HighlightRequestMade(highlightRequests[highlightIndex]);

		highlightIndex += 1;
	}
	
	function DeleteExistingHighlight(uint _id, string _reasonForDeletion) OnlyByOwner()  {
		//Deleting a key in a mapping replaces the struct of that 
		//key with a struct posessing default-values.
		
		EmitEvent_HighlightDeleted(highlights[_id], _reasonForDeletion);
		
		delete highlights[_id];
	}
	
	function RejectHighlightRequest(uint _id) OnlyByOwner()  {

  		EmitEvent_HighlightRequestRejected(highlightRequests[_id]);
		
		delete highlightRequests[_id];
	}


	function AcceptHighlightRequest(uint _id) OnlyByOwner() returns (bool)  {
		//TODO: Find out if this function needs to have the payable-keyword.
		//Is there some security restriction, that a contract cannot send funds if
		// the message sender doesn't send them?
		
		// Check if the owner actually has enough money.
	
		HighlightRequest handledRequest = highlightRequests[_id];
	
		if (vehicleOwner.balance < handledRequest.reward) {
			return false;
		}
		
		// Send the money to the maker

		if ( handledRequest.maker.send(handledRequest.reward)) {

			highlights[handledRequest.id] = CCClib.NewHighlight(handledRequest);

		   	EmitEvent_HighlightSavedToChain(handledRequest);
			
			delete highlightRequests[handledRequest.id];

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

	struct HighlightRequest {
		uint id;
		address maker;
		uint requestCreationDateTime;
		uint reward;
		string message;
	}
	
	struct Highlight{
		uint id;
		address maker;
		uint requestCreationDateTime;
		uint reward;
		string message;

		bool madeByOwner;
		uint additionToChainDateTime;
	}

	function  NewHighlightRequest  (uint _id, uint _reward,string _message)internal returns (HighlightRequest){
		return HighlightRequest({
			id: _id,
			maker: msg.sender,
			requestCreationDateTime: now,
			reward: _reward,
			message: _message
		});
	}
	
	function NewHighlight (uint _id, uint _reward,string _message) internal returns (Highlight){
			
		return Highlight({
			id:_id,
			maker:msg.sender,
			requestCreationDateTime:now,
			reward:_reward,
			message:_message,

			madeByOwner:true,
			additionToChainDateTime:now
		});
	}
	
	function NewHighlight (HighlightRequest _h) internal returns (Highlight){
		
		return Highlight({
			id:_h.id,
			maker:_h.maker,
			requestCreationDateTime:_h.requestCreationDateTime,
			reward:_h.reward,
			message:_h.message,

			madeByOwner:false,
			additionToChainDateTime:now
		});
	}
}