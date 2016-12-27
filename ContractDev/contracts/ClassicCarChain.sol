pragma solidity ^0.4.6;

contract ClassicCarChain {

	/// Cool ideas to consider:
    
    // - [ ] Consider if the entire car could be sold with a function in this contract?
    // - [ ] How about auctioning the car within this contract? Giving users the ability to bid on the car?
    // Potential feature-creep -problem if I add auctioning as a part of this.
	// - [ ] Some ping-pong bidding ability between the owner and the requester. 
	// The requester asks for money, the owner sends a counter-offer and a round of counter-offers are made
	// Each side can accept in turn or reject the transaction.
	// - [x] A spam-avoidance system. The owner should be able to give highlight request rights to specific addresses. 
	// - [x] A way to delete unwanted highlights from the chain. This is in case if the former owner of the car made
	// highlights on nights when they were drunk. A deletion should be publically broadcast to the block chain,
	// none the less. This is to prevent deleting highlights dishonestly.
	// - [x] A settings enumerator. If the vehicle becomes unpopular, the owner has no reason to give away highligh request rights.
	// This is just to make the it easier for the owner to accept requests.
	
	address vehicleOwner;
	
	//struct VehicleOwner{
	//	string name;
	//	date becameOwner;
	//	string optionalContactInformation;
	//}
	
	string public vehicleModel;
	uint public vehicleManufacturingYear;
	
    /// This index is used as an identifier of Highlights. It is incremented whenever a new highlight request is made.
	uint public highlightIndex=0;
	
	/// If this is false, highlight requests can be made by anyone without asking for special permission
	/// If this is true, highlights can only be sent by people who have been given highlight request rights by the owner.
	/// Should be set to true on popular cars (or cars owned by celebrities), to eliminate highlight request spam.
	/// This may be set to false in unpopular cars that don't have a lot of visiblity, so that the owner has to go through less of a hassle in order to get new highlights.
	bool strictHighlightRequestState = true;
	
	function SetHighlightRequestState (bool _newState) OnlyByOwner() {
		strictHighlightRequestState = _newState;
	}
	
	struct Highlight{
	    uint id;
		address maker;
		
		uint requestedReward;
		//TODO: Security considerations. Only the owner and the highlight maker should ever
		//need to know the reward that was paid. I understood that all blockchain transactions are
		//public by their nature. However, I think this information should be as 
		//difficult as possible to obtain for those who do not need to know it.
		
		string optionalContactInformation;
		string description;
		uint date;
	}
	

	
	//struct HighlightMaker {
	//	string name;
	//	int numberOfHighlightsMade;
	//	string optionalContactInformation;
	//}
	
	event VehicleInformationUpdated(string model, uint manufacturingYear);
	event HighlightRequestMade(address maker, uint highlightId);
    event HighlightSavedToChain(address maker, uint highlightId);
	event HighlightRequestRejected(address maker, uint highlightId);
	event HighlightDeleted(address maker, uint highlightId);
	event VehicleOwnershipPassed(address oldOwner, address newOwner, uint dateTime);
	event ErrorOccurred(string message);
	
	mapping(uint => Highlight) public highlights;
	mapping(uint => Highlight) private highlightRequests;
	//The left-side uint is the highlight id
	//A highlight begins its life in the requests-mapping.
	//If its allowed by the owner, the highlight request gets "promoted" into the highlights-mapping.
	
    function ClassicCarChain(string _model, uint _year) {
        vehicleOwner = msg.sender;
        //The one who created this contract to the network becomes the first vehicle owner.
        
        vehicleModel = _model;
	    vehicleManufacturingYear = _year;
    }
	
    function ChangeVehicleInformation(string _model, uint _year) OnlyByOwner()  {
        vehicleModel = _model;
	    vehicleManufacturingYear = _year;
	    
	    VehicleInformationUpdated(vehicleModel,vehicleManufacturingYear);
    }
	
	modifier OnlyByOwner()
    {
        if (msg.sender == vehicleOwner) {
		
			_;
		}
    }
    
    // Came up with this idea in an attempt to find out if a key exists in a mapping
    mapping(address => address) private highlightRights;
    
	//modifier OnlyIfHaveHighlightRights()
    //{
    //    if (msg.sender == highlightRights[msg.sender]) {
	//		_;
	//	} 
    //}
    
	function GetOwnerAddress() returns (address){
		return vehicleOwner;
	}
	
	function GiveHighlightRequestRights(address _givenAddress) OnlyByOwner() {
	    highlightRights[_givenAddress] = _givenAddress;
	}
		
	function RevokeHighlightRequestRights(address _givenAddress) OnlyByOwner() {
	    delete highlightRights[_givenAddress];
	}
	
    function MakeHighlightRequest(uint _amountInEther,string _optionalContactInformation, string _message) {

        if (msg.sender == highlightRights[msg.sender] 
		|| msg.sender == vehicleOwner 
		|| strictHighlightRequestState == false) {
		
            highlightRequests[highlightIndex] = 
            Highlight(
            highlightIndex, // id
            msg.sender, // highlightMaker
            _amountInEther * 1 ether, // requestedReward
            _optionalContactInformation, // optionalContactInformation
            _message, // description
            now // date
            );
            
            HighlightRequestMade(msg.sender, highlightIndex);
            
            highlightIndex += 1;
        }
    }
    
    function DeleteExistingHighlight(uint _id) OnlyByOwner()  {
        //From what I understand, deleting a key in a mapping replaces the struct of that 
        //key with a struct posessing default-values.
        
        delete highlights[_id];
            
        HighlightDeleted(highlightRequests[_id].maker, _id);
    }
    
    function RejectHighlightRequest(uint _id) OnlyByOwner()  {

        delete highlightRequests[_id];
            
        HighlightRequestRejected(highlightRequests[_id].maker, _id);
    }

    function AcceptHighlightRequest(uint _id) OnlyByOwner() returns (bool)  {
        //TODO: Find out if this function needs to have the payable-keyword.
        //Is there some security restriction, that a contract cannot send funds if
        // the message sender doesn't send them?
        
        // Check if the owner actually has enough money.
        
        uint requestedReward = highlightRequests[_id].requestedReward;
         
        if (vehicleOwner.balance < requestedReward) {
            return false;
            // `throw` terminates and reverts all changes to
            // the state and to Ether balances. It is often
            // a good idea to use this if functions are
            // called incorrectly. But watch out, this
            // will also consume all provided gas.
        }
        
        // Send the money to the maker

        // Who exacly is the sender? Who pays for the transaction?
        // The contract? The message sender? Who?
        // Have scoured the internet for hours. Still don't understand who it is.
        if ( highlightRequests[_id].maker.send(requestedReward)) {

            // Remove the maker from the list of highlightRequests.
            
            highlights[_id] = highlightRequests[_id];

            highlights[_id].date = now;
            //Modify the date so that it becomes the date when it was actually added to the chain.

            delete highlightRequests[_id];
            
            HighlightSavedToChain(highlightRequests[_id].maker, _id);
            
            return true;
        }
		
		ErrorOccurred("_makerAddress.send(requestedAmount) failed at Accept");
		return false;
    }
	
	function GiveVehicleOwnership(address _newOwner) OnlyByOwner()  {
	    
        address oldOwner = vehicleOwner;
        
        VehicleOwnershipPassed( oldOwner,  _newOwner, now);
        // The now-keyword returns the current block timestamp, as soon as this transaction finds its way into a mined block.
        // I remember hearing that in the real Ethreum network, blocks are mined each 10 minutes. The timestamp is quite accurate.
        vehicleOwner = _newOwner;
    }
}