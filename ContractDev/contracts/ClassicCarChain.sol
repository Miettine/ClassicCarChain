pragma solidity ^0.4.9;

contract ClassicCarChain {

	address public vehicleOwner;
	
	string public vehicleModel;

	uint public originBlockNumber; 
	
	uint public vehicleManufacturingYear;
	



	event EHighlightRequestMade(
	
		address maker,
		uint requestCreationDateTime,
		uint requestedReward,
		string message
	);

	function EmitEvent_HighlightRequestMade (Highlight _h) private {
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

	function EmitEvent_HighlightSavedToChain (Highlight _h) private {
	    //_h.Message();
	//	EHighlightSavedToChain(_h.id, _h.maker, _h.requestCreationDateTime, _h.reward, _h.message, _h.madeByOwner, _h.additionToChainDateTime);
	}

	event EHighlightRequestRejected( 
		uint rejectionDateTime,
		
		uint highlightId,
		address maker,
		uint requestCreationDateTime,
		uint requestedReward,
		string message
		);

	function EmitEvent_HighlightRequestRejected (address _h) private{
		
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

	function EmitEvent_HighlightDeleted (Highlight _h, string _reasonForDeletion) private{
	    uint a = _h.GetAdditionToChainDateTime();
	    
		//EHighlightDeleted(now, _reasonForDeletion, _h.maker, _h.requestCreationDateTime, _h.reward, _h.message, _h.madeByOwner, a);
		derp(a);
	}

	event EVehicleOwnershipPassed(address oldOwner, address newOwner, uint dateTime);

	//The left-side uint is the highlight id
	//A highlight begins its life in the requests-mapping.
	//If its allowed by the owner, the highlight request gets "promoted" into the highlights-mapping.


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

	}
	
	function DeleteExistingHighlight(uint _id, string _reasonForDeletion) OnlyByOwner() public {
		
	}
	
	function RejectHighlightRequest(uint _id) OnlyByOwner()  {

	}

	function AcceptHighlightRequest(uint _id) OnlyByOwner() returns (bool)  {
		
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
	
	struct HighlightData{
		address highlightAddress;
		address maker;
		uint requestCreationDateTime;
		uint reward;
		string message;

		bool madeByOwner;
		uint additionToChainDateTime;
	}
	
	function  NewHighlightRequest  (uint _reward, string _message) internal returns ( Highlight){
		return new Highlight(msg.sender, _message, false, _reward ) ;
	}
	
	
	function NewHighlight  (string _message)  internal returns  ( Highlight){

		return new Highlight(msg.sender, _message, true, 0 ) ;
	}
	
	function GetHighlightData(Highlight _h) external returns ( 
	    address _maker,
	    string _message, 
	    uint _reward, 
	    uint _requestCreationDateTime, 
	    uint _additionToChainDateTime, 

	    bool _madeByOwner, 
	    bool _approvedToChain
	    ){
	 	//HighlightData  data = _h.data;
	}
}





contract Highlight {

	// requested reward is zero if its made by owner
	// If the highlight was made by the owner, requestCreationDateTime is the same as the additiontochain datetime


	address private maker;
	/*function Maker() external returns (address) {
	    return maker;
	}*/
	
	
	string  private  message ;
	/*function Message()  public returns (string) {
	    return message;
	}*/
	
	uint public reward=0; //The reward is essentially "requested reward" in HighlightRequest, in Highlights, it is "paid reward"
	uint public requestCreationDateTime = now;

	uint public additionToChainDateTime;
	function GetAdditionToChainDateTime() public returns (uint){
	    return additionToChainDateTime;
	}
	
	bool public madeByOwner;
	
	//Is true whenever this is promoted to a highlight. Is false when it is a higlight.
	bool public approvedToChain=false;
	
	HighlightTypes public highlightType = HighlightTypes.ExpertReview;

	enum HighlightTypes {
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

	function Highlight(address _maker, string _message, bool _madeByOwner, uint _reward ) {
	    
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
