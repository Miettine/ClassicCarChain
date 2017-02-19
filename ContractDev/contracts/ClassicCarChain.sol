pragma solidity ^0.4.9;

contract ClassicCarChain {

	address public vehicleOwner;
	
	string public vehicleModel;

	uint public originBlockNumber; 
	
	uint public vehicleManufacturingYear;
	
	/////////////////////////////////////////

	//mapping(uint => CCClib.Highlight) private highlights;

	/*
	function GetHighlightsArrayLength() public returns (uint){
		return highlightsArray.length;
	}
	*/
/*
	function AddNewToHighlights(CCClib.Highlight _h) private returns(bool) {
		if (HighlightExists(_h.id)){
			return false;
		}
		highlights[_h.id] = _h;

		highlightsArray.push(_h.id);

		return true;
	}*/

	/*function HighlightExists (uint _id) public returns(bool){
		for (uint i = 0; i< highlightsArray.length ; i++){
			if (highlightsArray[i]==_id) {
				return true;
			}
		}

		return false;
	}*/
/*
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
*/
//////////////////////////////////
/*
	function PromoteHighlightRequest(CCClib.HighlightRequest _h) private returns(bool) {
		if (!HighlightExists(_h.id)){
			return false;
		}
		higlights[_h.id] = _h;

		highlightsArray.push(_h.id);

		return true;
	}*/

	/////////////////////////////////////////

	/*
	function GetHighlightRequestsArrayLength() public returns (uint) {
		return highlightRequestsArray.length;
	}
	*/

/*
	function GetHighlight(uint _id) public returns (
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
	}*/

////O//||=================>

	event EHighlightRequestMade(
	
		address maker,
		uint requestCreationDateTime,
		uint requestedReward,
		string message
	);

	function EmitEvent_HighlightRequestMade (CCCHighlight _h) private {
		//EHighlightRequestMade(_h.maker(), _h.requestCreationDateTime(), _h.reward(), _h.Message());
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

	function EmitEvent_HighlightSavedToChain (CCCHighlight _h) private {
	    _h.Message();
	//	EHighlightSavedToChain(_h.id, _h.maker, _h.requestCreationDateTime, _h.reward, _h.message, _h.madeByOwner, _h.additionToChainDateTime);
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

	function EmitEvent_HighlightRequestRejected (address _h) private{
		//EHighlightRequestRejected(now, _h.id, _h.maker, _h.requestCreationDateTime, _h.reward, _h.message);
	}

	event EHighlightDeleted( 
		uint deletionDateTime, 
		string reasonForDeletion,

		address maker,
		uint requestCreationDateTime,
		uint paidReward,
		string message,
		bool madeByOwner,
		uint additionToChainDateTime
		);
		event derp(uint n);

	function EmitEvent_HighlightDeleted (CCCHighlight _h, string _reasonForDeletion) private{
	    uint a = _h.GetAdditionToChainDateTime();
	    
		//EHighlightDeleted(now, _reasonForDeletion, _h.maker, _h.requestCreationDateTime, _h.reward, _h.message, _h.madeByOwner, a);
		derp(a);
	}

	event EVehicleOwnershipPassed(address oldOwner, address newOwner, uint dateTime);

	//The left-side uint is the highlight id
	//A highlight begins its life in the requests-mapping.
	//If its allowed by the owner, the highlight request gets "promoted" into the highlights-mapping.

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

		//address memory h = CCClib.NewHighlight(highlightIndex, 0, _message);

		//AddNewToHighlights(h);

		//EmitEvent_HighlightSavedToChain(h);

	
	}
	
	function MakeHighlightRequest(uint _reward, string _message) NotByOwner() public {
	    
    	//CCClib.HighlightRequest memory h = CCClib.NewHighlightRequest (highlightIndex, _reward, _message);
	
	//	highlightRequests[highlightIndex] = h;
		
		//EmitEvent_HighlightRequestMade(h);

	}
	
	function DeleteExistingHighlight(uint _id, string _reasonForDeletion) OnlyByOwner() public {
		//Deleting a key in a mapping replaces the struct of that 
		//key with a struct posessing default-values.
		
		//EmitEvent_HighlightDeleted(highlights[_id], _reasonForDeletion);
		
		//delete highlights[_id];
	}
	
	function RejectHighlightRequest(uint _id) OnlyByOwner()  {

  		//EmitEvent_HighlightRequestRejected(highlightRequests[_id]);
		
	//	delete highlightRequests[_id];
	}

	function AcceptHighlightRequest(uint _id) OnlyByOwner() returns (bool)  {
		//TODO: Find out if this function needs to have the payable-keyword.
		//Is there some security restriction, that a contract cannot send funds if
		// the message sender doesn't send them?
		
		// Check if the owner actually has enough money.
	
	   // CCClib.HighlightRequest handledRequest = highlightRequests[_id];
	/*
		if (vehicleOwner.balance < handledRequest.reward) {
			return false;
		}
		
		// Send the money to the maker

		if ( handledRequest.maker.send(handledRequest.reward)) {

			//AddNewToHighlights(CCClib.NewHighlight(handledRequest));

			delete highlightRequests[_id];
			
			//EmitEvent_HighlightSavedToChain(highlights[_id]);
			
            //highlight index is not incremented here.
            
			return true;
		}
		
		return false;*/
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
/*
	struct HighlightRequestData {
		address highlightAddress;
		address maker;
		uint requestCreationDateTime;
		uint reward;
		string message;
	}
	
	struct HighlightData{
		address highlightAddress;
		address maker;
		uint requestCreationDateTime;
		uint reward;
		string message;

		bool madeByOwner;
		uint additionToChainDateTime;
	}
*/
/*
	function  NewHighlightRequest  (uint _id, uint _reward,string _message)internal returns ( HighlightRequestData){
		return HighlightRequest({
			id: _id,
			maker: msg.sender,
			requestCreationDateTime: now,
			reward: _reward,
			message: _message
		});
	}
	
	function NewHighlight (uint _id, uint _reward,string _message) internal returns ( HighlightData){
			
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
	
	function NewHighlight (Highlight _h) internal returns ( HighlightData){
		
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
	*/
	
	function  NewHighlightRequest  (uint _reward, string _message) internal returns ( address){
		return new CCCHighlight(msg.sender, _message, false, _reward ) ;
	}
	
	
	function NewHighlight  (string _message)  internal returns  ( address){

		return new CCCHighlight(msg.sender, _message, true, 0 ) ;
	}
	
	function GetHighlightData(CCCHighlight _h) internal returns ( 
	    address maker,
	    string message, 
	    uint reward, 
	    uint requestCreationDateTime, 
	    uint additionToChainDateTime, 
	    string,
	    bool madeByOwner, 
	    bool approvedToChain
	    ){
    maker =_h.maker;
        //message = _h.Message();
	}
}


contract CCCHighlight {

	// requested reward is zero if its made by owner
	// If the highlight was made by the owner, requestCreationDateTime is the same as the additiontochain datetime

	address public maker;
	/*	function Maker() public returns (address) {
	    return maker;
	}*/
	
	
	string  public  message ;
	function Message()  external returns (string) {
	    return message;
	}
	
	uint public reward=0; //The reward is essentially "requested reward" in HighlightRequest, in Highlights, it is "paid reward"
	uint public requestCreationDateTime = now;

	uint public additionToChainDateTime;
	function GetAdditionToChainDateTime() public returns (uint){
	    return additionToChainDateTime;
	}
	
	bool public madeByOwner;
	
	//Is true whenever this is promoted to a highlight. Is false when it is a higlight.
	bool public approvedToChain=false;
	
	enum HighlightType {
	    ExpertReview,
	    MaintenanceReport
	}
	
	address public classicCarChainContract;
	
	modifier OnlyFromCCC(){
	    if (msg.sender==classicCarChainContract){
	        _;
	    }
	}
	
	modifier OnlyIfApprovedToChain(){
	    if (approvedToChain) {
	        _;
	    }
	}
	
	modifier OnlyIfNotApprovedToChain(){
	    if (!approvedToChain) {
	        _;
	    }
	}

	function CCCHighlight(address _maker, string _message, bool _madeByOwner, uint _reward ) {
	    
	    maker = _maker;
	    message = _message;
	    classicCarChainContract=msg.sender;
	    madeByOwner = _madeByOwner;
		
	    if (madeByOwner) {
    	    PromoteHighlightRequest();
    	    return;
		}

	    reward = _reward;
	}
	
	function PromoteHighlightRequest() public OnlyFromCCC() OnlyIfNotApprovedToChain(){

    	additionToChainDateTime = now;
    	
    	approvedToChain = true;
	    
	}
	
	function DeleteHighlight() public OnlyFromCCC() OnlyIfApprovedToChain(){
	    selfdestruct(classicCarChainContract);
	}
}
