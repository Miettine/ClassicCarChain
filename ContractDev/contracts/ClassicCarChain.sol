pragma solidity ^0.4.6;

contract ClassicCarChain {

	address public vehicleOwner;
	
	string public vehicleModel;

	uint public originBlockNumber; 
	
	uint public vehicleManufacturingYear;
	
	/// This index is used as an identifier of Highlights. It is incremented whenever a new highlight request is made.
	//You'll know that a highlight doesn't exist if a zero-value is returned.
	uint public highlightIndex=0;

	/////////////////////////////////////////

	mapping(uint => CCClib.Highlight) private highlights;
	uint[] private highlightsArray;
	
	/////////////////////////////////////////
	
	function GetIndexFromHighlightsArray(uint _index) public returns (uint){
		return highlightsArray[_index];
	}

	function GetHighlightsArrayLength() public returns (uint){
		return highlightsArray.length;
	}

	function AddNewToHighlights(CCClib.Highlight _h) private {

	    highlights[_h.id]=_h;
        highlightsArray.push(_h.id);
        
    	highlightIndex += 1;
	}

	function RemoveFromHighlights(uint _id) private {

	    delete highlights[_id];

	    for (uint i = 0; i< highlightsArray.length ; i++){
			if (highlightsArray[i]==_id) {
				CCClib.RemoveFromArray(i, highlightsArray);
			}
		}
	}

 

	/*
	modifier HighlightExists (uint _id) public {
		bool exists= false;
		for (uint i = 0; i< highlights.length ; i++){
			if (highlights[_id].id==_id) {
				exists=true;
			}
		}

		return false;
	}
	*/

	function GetHighlight(uint _id) public returns (
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

		CCClib.Highlight memory h = CCClib.NewHighlight(highlightIndex, _message);

		AddNewToHighlights(h);

		EmitEvent_HighlightSavedToChain(h);

	}
	
	function MakeHighlightRequest(uint _reward, string _message) NotByOwner() public {
	    
    	CCClib.Highlight memory h = CCClib.NewHighlightRequest (highlightIndex, _reward, _message);
	
		AddNewToHighlights(h);
		
		EmitEvent_HighlightRequestMade(h);

	
	}
	
	function DeleteExistingHighlight(uint _id, string _reasonForDeletion) OnlyByOwner() public returns (bool) {
		//Deleting a key in a mapping replaces the struct of that 
		//key with a struct posessing default-values.
		
		EmitEvent_HighlightDeleted(highlights[_id], _reasonForDeletion);

		RemoveFromHighlights(_id);
	}
	
	function RejectHighlightRequest(uint _id) OnlyByOwner()  {

  		EmitEvent_HighlightRequestRejected(highlights[_id]);
		
		RemoveFromHighlights(_id);
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

			highlights[_id].approvedToChain=true;
		    highlights[_id].additionToChainDateTime=now;
			
			EmitEvent_HighlightSavedToChain(highlights[_id]);
            
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
	
	

	
	
	
	
	
	////O//||=================>




/// Events


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
}

library CCClib {

	


	struct Highlight{
		uint id;
		bool initialized;
		uint highlightType;

		address maker;
		uint requestCreationDateTime;
		uint reward;
		string message;
		
		bool approvedToChain;
		bool madeByOwner;
		uint additionToChainDateTime;
		MaintenanceTasks maintenanceData;
	}
	
	struct MaintenanceTasks {
	    bool engine;
	    bool tires;
    	bool pedals;
		bool brakes;
		bool interior;
	}

	function CreateMaintenanceData  (bool[] _status) internal returns (MaintenanceTasks) {

		if (_status.length != 5){
			throw;
		}

        MaintenanceTasks memory tasks = MaintenanceTasks({
            engine:_status[0],
            tires:_status[1],
            pedals:_status[2],
            brakes:_status[3],
            interior:_status[4]
        });
        
        return tasks;

	}

	enum HighlightTypes {
		Review,
		Maintenance
	}

	//https://ntgroup.studio.crasman.fi/pub/web/vianor/pdf/Vianor_perushuolto_plus.pdf
/*
	enum MaintenanceTasks {
		Engine,
		Tires,
		Pedals,
		Brakes,
		Interior
	}*/
/*
	enum MaintenanceOutcome {
		NotChecked,
		Checked,
		FoundFault,
		FoundFaultAndFixed
	}
*//*
	function GetMaintenanceStatus(Highlight storage _h, MaintenanceTasks _task) internal returns ( uint){

		return uint(_h.maintenanceData[ uint (_task) ]);
	}*/
	
	function  NewHighlightRequest  (uint _id, uint _reward,string _message)internal returns ( Highlight){
		Highlight memory newHighlightReq;
		
		 newHighlightReq.id=_id;
		 newHighlightReq.initialized=true;
		 newHighlightReq.highlightType = uint(HighlightTypes.Review);

		 newHighlightReq.maker= msg.sender,
		 newHighlightReq.requestCreationDateTime=now;
		 newHighlightReq.reward=_reward;
		 newHighlightReq.message=_message
		
		 newHighlightReq.approvedToChain=false
		 newHighlightReq.madeByOwner=false
		return newHighlightReq;
		/*
		return Highlight({
		 id:_id,
		 initialized:true,
		 highlightType:uint(HighlightTypes.Review),

		 maker: msg.sender,
		 requestCreationDateTime:now,
		 reward:0,
		 message:_message,
		
		 approvedToChain:false,
		 madeByOwner:false,
		 additionToChainDateTime:0

		});*/
	}
	
	function NewHighlight (uint _id, string _message) internal returns ( Highlight){

		Highlight memory newHighlight;
		
		newHighlight.id=_id;
		newHighlight.initialized=true;
		newHighlight.highlightType = uint(HighlightTypes.Review);

		newHighlight.maker= msg.sender,
		newHighlight.requestCreationDateTime=now;
		newHighlight.reward=0;
		newHighlight.message=_message;
		
	 	newHighlight.approvedToChain=true;
	 	newHighlight.madeByOwner=true;
	 	newHighlight.additionToChainDateTime = now;

		return newHighlight;
		/*return Highlight({
		 id:_id,
		 initialized:true,
		 highlightType:uint(HighlightTypes.Review),

		 maker: msg.sender,
		 requestCreationDateTime:now,
		 reward:0,
		 message:_message,
		
		 approvedToChain:true,
		 madeByOwner:true,
		 additionToChainDateTime:now
		
		});*/
	}


	function NewMaintenanceHighlightRequest  (uint _id, uint _reward,string _message, uint[] _maints, uint[] _status) internal returns ( Highlight){

		 Highlight memory h = NewHighlightRequest(_id, _reward, _message);
		
		//h.maintenanceData = CreateMaintenanceData(_maints, _status) ;
        //// Set maintenance data in the contract. Cannot do it here in the library.
        
		return h;
	}

	function NewMaintenanceHighlight (uint _id, string _message, uint[] _maints, uint[] _status) internal returns ( Highlight){
		
		Highlight memory h = NewHighlight(_id, _message);

		h.highlightType= uint(HighlightTypes.Maintenance);
		
		//h.maintenanceData = CreateMaintenanceData(_maints, _status);
		//// Set maintenance data in the contract. Cannot do it here in the library.

		return h;
	}



	function RemoveFromArray(uint _index, uint[] storage _array) internal /*returns(uint[])*/ {
        if (_index >= _array.length) return;

        for (uint i = _index; i<_array.length-1; i++){
            _array[i] = _array[i+1];
        }
        delete _array[_array.length-1];
        _array.length--;
        //return _array;
    }
	/*
	function bleh(uint[] maints, bool[] done) {
	    if (maints.length != done.length) {
	    	return;
	    }
	}*/
}
