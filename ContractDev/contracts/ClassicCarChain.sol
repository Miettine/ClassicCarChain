pragma solidity ^0.4.6;

contract ClassicCarChain {

	address public vehicleOwner;
	
	string public vehicleModel;

	uint public originBlockNumber; 
	
	uint public vehicleManufacturingYear;

	uint public acceptedOfferAmount=0;

	bool public ownershipBeingTransferred = false;
	/*
	function GetOwnershipBeingTransferred() public returns (bool) {
		return ownershipBeingTransferred;
	}
*/
	address public upcomingOwner;

	function ClassicCarChain(string _model, uint _year) {
		vehicleOwner = msg.sender;
		//The one who created this contract to the network becomes the first vehicle owner.
		
		originBlockNumber = block.number;
		vehicleModel = _model;
		vehicleManufacturingYear = _year;
		ownershipBeingTransferred = false;
	}
	
	/// This index is used as an identifier of Highlights. It is incremented whenever a new highlight request is made.
	//You'll know that a highlight doesn't exist if a zero-value is returned.
	uint public highlightIndex=0;

	modifier OnlyByOwner() {
		if (msg.sender == vehicleOwner) {
			_;
		}
	}
	
	modifier NotByOwner() {
		if (msg.sender != vehicleOwner) {
			_;
		}
	}

	modifier OnlyByUpcomingOwner() {
		if (msg.sender == upcomingOwner) {
			_;
		}
	}

	modifier OnlyByOwnerOrUpcomingOwner() {
		if (msg.sender == upcomingOwner || msg.sender == vehicleOwner) {
			_;
		}
	}

	modifier OnlyIfOwnershipBeingTransferred(){
		if (ownershipBeingTransferred) {
			_;
		}
	}

	modifier OnlyIfOwnershipNotBeingTransferred(){
		if (!ownershipBeingTransferred) {
			_;
		}
	}

	function BeginOwnershipChange(address _upcomingOwner, uint _amount) private OnlyIfOwnershipNotBeingTransferred {
		upcomingOwner = _upcomingOwner;
		acceptedOfferAmount= _amount;
		ownershipBeingTransferred=true;

	}

	function CancelOwnershipChange() public OnlyByOwnerOrUpcomingOwner OnlyIfOwnershipBeingTransferred{

        if (upcomingOwner.send(acceptedOfferAmount)){
            acceptedOfferAmount=0;
    		upcomingOwner=0;
			ownershipBeingTransferred=false;
		}
	}

	function AcceptOwnershipChange() public OnlyByUpcomingOwner OnlyIfOwnershipBeingTransferred {

        if (vehicleOwner.send(acceptedOfferAmount)){
        	GiveVehicleOwnership(upcomingOwner);
    		acceptedOfferAmount=0;
    		upcomingOwner=0;
			ownershipBeingTransferred=false;

		}
	}

	/////////////////////////////////////////

	mapping(uint => CCClib.Highlight) private highlights;

	
	/////////////////////////////////////////
	
	//mapping(uint => address)  allOffers ;
	mapping(uint => CCClib.Offer) private offers;

	uint public offerIndex = 0;
	
	function GetOffer(uint _index) public returns (bool _initialized,address _maker, uint _amount){
	    
	    CCClib.Offer memory foundOffer = offers[_index];
	    
	    _initialized = foundOffer.initialized;
	    _maker = foundOffer.maker;
	    _amount = foundOffer.amount;
	}
	
	event EOfferRemoved(address maker, uint amount);
	event EOfferRejected(address maker, uint amount);

	function RemoveOrRejectOffer(uint _index) public returns (bool){

	    CCClib.Offer memory foundOffer = offers[_index];
	    
	    address sender = msg.sender; 
	    
	    bool senderIsVehicleOwner = sender == vehicleOwner;
	    bool senderIsOfferMaker = sender == foundOffer.maker;
	    
	    if (senderIsVehicleOwner || senderIsOfferMaker){
	        
	        if (foundOffer.maker.send(foundOffer.amount)){
	            
	            delete offers[_index];

	            if (senderIsVehicleOwner) {
	            	EOfferRejected(foundOffer.maker, foundOffer.amount);
	            } else {
					EOfferRemoved(foundOffer.maker, foundOffer.amount);
				}
	            
	            return true;
	        }
	    }
	    return false;
	}
	
	event EOfferAccepted(address maker, uint amount);

	function AcceptOffer(uint _index)   OnlyByOwner public returns (bool) {
	    CCClib.Offer memory foundOffer = offers[_index];
	    
        if (foundOffer.initialized){
     

			delete offers[_index];

			EOfferAccepted(foundOffer.maker, foundOffer.amount);

			//GiveVehicleOwnership(foundOffer.maker);
			BeginOwnershipChange(foundOffer.maker, foundOffer.amount);
			return true;
            
        }
	    
	    return false;
	}
	
	
	function MakeOffer() NotByOwner public payable {
	

		address sender= msg.sender;
		uint number =  offerIndex;
		CCClib.Offer memory newOffer = CCClib.Offer({id:offerIndex,
		initialized:true, 
		maker:sender, 
		amount:msg.value}); 

		//allOffers[number] = sender;
		offers[offerIndex]=newOffer;

		offerIndex++;
	}

	
	/////////////////////////////////////////

	function AddNewToHighlights(CCClib.Highlight _h) private {

	    highlights[_h.id]=_h;
        
    	highlightIndex += 1;
	}

	function GetHighlight(uint _id) public returns (
		uint _highlightType,

		bool _initialized,

		address _maker, 
		uint _requestCreationDateTime, 	
		uint _reward, 
		string _message,

		bool _approvedToChain,
		bool _madeByOwner,
		uint _additionToChainDateTime
		//MaintenanceTasks maintenanceData; //?
		) {
		
		CCClib.Highlight h = highlights[_id];
		
		_highlightType = h.highlightType;

		_initialized = h.initialized;
		_maker = h.maker;
		_requestCreationDateTime = h.requestCreationDateTime;
		_reward = h.reward;
		_message = h.message;

		_approvedToChain= h.approvedToChain;
		_madeByOwner = h.madeByOwner;
		_additionToChainDateTime = h.additionToChainDateTime;	
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

		delete highlights[_id];
	}
	
	function RejectHighlightRequest(uint _id) OnlyByOwner()  {

  		EmitEvent_HighlightRequestRejected(highlights[_id]);
  		
		delete highlights[_id];
	}

	function AcceptHighlightRequest(uint _id)  OnlyByOwner() returns (bool)   {
		//TODO: Find out if this function needs to have the payable-keyword.
		//Is there some security restriction, that a contract cannot send funds if
		// the message sender doesn't send them?
		
		// Check if the owner actually has enough money.
	
	    CCClib.Highlight handledRequest = highlights[_id];
		
		// Send the money to the maker

		uint requestedReward = handledRequest.reward;
		uint difference = msg.value-requestedReward;

		if (requestedReward > msg.value) {
			return false;
		}

		if ( handledRequest.maker.send(requestedReward)) {

		    CCClib.PromoteHighlightRequest(highlights[_id]);
			
			EmitEvent_HighlightSavedToChain(highlights[_id]);
            /*
			if (difference>0) {
				if (msg.sender.send(difference)){
					return true;
				}else {
					throw;
				} 
			}
*/
			return true;
		}

		return false;
	}
	
	function GiveVehicleOwnership(address _newOwner) private {
		if (_newOwner!=vehicleOwner){
			address oldOwner = vehicleOwner;
			
			EVehicleOwnershipPassed( oldOwner,  _newOwner, now);
			// The now-keyword returns the current block timestamp, as soon as this transaction finds its way into a mined block.
			// I remember hearing that in the real Ethreum network, blocks are mined each 10 minutes. The timestamp is quite accurate.
			vehicleOwner = _newOwner;
		}
	}

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


}

library CCClib {
    
    	
	struct Offer{
	    uint id;
	    bool initialized;
	    address maker;
	    uint amount;
	}
	

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


	function GetMaintenanceStatus(Highlight _h) internal returns (
	    bool _eng,
	    bool _tires,
	    bool _pedals,
	    bool _brakes,
	    bool _interior
	    ){

        MaintenanceTasks memory data = _h.maintenanceData;
	        _eng = data.engine;
	        _eng = data.tires;
	        _eng = data.pedals;
	        _eng = data.brakes;
	        _eng = data.interior;
	        
	}
	
	function  NewHighlightRequest  (uint _id, uint _reward,string _message)internal returns ( Highlight){
		Highlight memory h;
		
		 h.id=_id;
		 h.initialized=true;
		 h.highlightType = uint(HighlightTypes.Review);

		 h.maker= msg.sender;
		 h.requestCreationDateTime=now;
		 h.reward=_reward;
		 h.message=_message;
		
		 h.approvedToChain=false;
		 h.madeByOwner=false;
		return h;
		
	}
	
	function NewHighlight (uint _id, string _message) internal returns ( Highlight){

		Highlight memory h;
		
		h.id=_id;
		h.initialized=true;
		h.highlightType = uint(HighlightTypes.Review);

		h.maker= msg.sender;
		h.requestCreationDateTime=now;
		h.reward=0;
		h.message=_message;
		
	 	h.approvedToChain=true;
	 	h.madeByOwner=true;
	 	h.additionToChainDateTime = now;

		return h;
	
	}


	function NewMaintenanceHighlightRequest  (uint _id, uint _reward,string _message, uint[] _maints, uint[] _status) internal returns ( Highlight){

		Highlight memory h = NewHighlightRequest(_id, _reward, _message);

		h.highlightType= uint(HighlightTypes.Maintenance);

		//h.maintenanceData = CreateMaintenanceData( _status) ;

        
		return h;
	}

	function NewMaintenanceHighlight (uint _id, string _message, uint[] _maints, uint[] _status) internal returns ( Highlight){
		
		Highlight memory h = NewHighlight(_id, _message);

		h.highlightType= uint(HighlightTypes.Maintenance);
		
		//h.maintenanceData = CreateMaintenanceData(_status);

		return h;
	}

    function PromoteHighlightRequest ( Highlight storage h) internal {
    	h.approvedToChain=true;
	   	h.additionToChainDateTime=now;
    }
}
