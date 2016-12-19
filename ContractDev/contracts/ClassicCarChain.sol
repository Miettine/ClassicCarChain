pragma solidity ^0.4.7;

contract ClassicCarChain {

	
	/// Cool ideas to consider:
    
    // - Consider if the entire car could be sold with a function in this contract?
    // - How about auctioning the car within this contract? Giving users the ability to bid on the car?
    // Potential feature-creep -problem if I add auctioning as a part of this.
	// - Some ping-pong bidding ability between the owner and the requester. 
	// The requester asks for money, the owner sends a counter-offer and a round of counter-offers are made
	// Each side can accept in turn or reject the transaction.
	// - A spam-avoidance system. The owner should be able to give highlight request rights to specific addresses. 
	// If a contract like this were to become very popular in the future, the 
	// - A way to delete unwanted highlights from the chain. This is in case if the former owner of the car made
	// highlights on nights when they were drunk. A deletion should be publically broadcast to the block chain,
	// none the less. This is to prevent deleting highlights dishonestly.
	// - A settings enumerator. If the vehicle becomes unpopular, the owner has no reason to give away highligh request rights.
	// This is just to make the it easier for the owner to accept requests.
	
	address vehicleOwner;
	string vehicleModel;
	uint manufacturingYear;
	
	uint public numberOfHighlightRequests=0;
	
	struct Highlight{
	    uint id;
		address maker;
		string optionalContactInformation;
		string description;
		uint date;
	}
	
	
	//struct VehicleOwner{
	//	string name;
	//	date becameOwner;
	//	string optionalContactInformation;
	//}
	
	//struct HighlightMaker {
	//	string name;
	//	int numberOfHighlightsMade;
	//	string optionalContactInformation;
	//}
	
	event HighlightRequestMade(address maker, uint highlightId);
    event HighlightSavedToChain(address maker, uint highlightId);
	event HighlightRejected(address maker, uint highlightId);
	event HighlightDeleted(address maker, uint highlightId);
	event VehicleOwnershipPassed(address oldOwner, address newOwner, uint dateTime);
	event ErrorOccurred(string message);
	
	mapping(uint => Highlight) public highlights;
	mapping(uint => Highlight) private highlightRequests;
	//The left-side uint is the highlight id
	
	mapping(uint => uint) private highlightRequestRewards;
	//The left-side uint is the highlight id, the right side is the reward in wei.
	
    function ClassicCarChain() {
        vehicleOwner = msg.sender;
    }
	
	modifier OnlyByOwner()
    {
        if (msg.sender == vehicleOwner) {
		
			_;
		}
    }
	
	function GetOwnerAddress() returns (address){
		return vehicleOwner;
	}

    function MakeHighlightRequest(uint _amountInEther,string _optionalContactInformation, string _message) {

        uint thisId = numberOfHighlightRequests;

        highlightRequests[thisId] = 
        Highlight(thisId,
        msg.sender,
        _optionalContactInformation,
        _message,
        now);
        
        highlightRequestRewards[thisId] = _amountInEther;
        
    //  id;
		// highlightMaker;
		// optionalContactInformation;
		// description;
		// date;
        
        HighlightRequestMade(msg.sender, thisId);
        
        numberOfHighlightRequests += 1;
    }
    
    function RejectHighlightRequest(uint _id) OnlyByOwner()  {


        delete highlightRequests[_id];
            
        HighlightRejected(highlightRequests[_id].maker, _id);
  

    }

    function Accept(uint _id) OnlyByOwner() returns (bool)  {
        //TODO: Find out if this function needs to have the payable-keyword.
        //Is there some security restriction, that a contract cannot send funds if
        // the message sender doesn't send them?
        
        // Check if the owner actually has enough money.
        
        uint requestedAmount = highlightRequestRewards[_id];
         
        if (vehicleOwner.balance < requestedAmount) {
            throw;
            // `throw` terminates and reverts all changes to
            // the state and to Ether balances. It is often
            // a good idea to use this if functions are
            // called incorrectly. But watch out, this
            // will also consume all provided gas.
        }
        
        // Send the money to the maker

        //Not entirely sure what the if-clause is needed for.
        //I think it checks if the transaction was successful.
        if ( highlightRequests[_id].maker.send(requestedAmount)) {

            // Remove the maker from the list of highlightRequests.
            
            highlights[_id] = highlightRequests[_id];
            
            HighlightSavedToChain(highlightRequests[_id].maker, _id);
            
            return true;
        }
		
		ErrorOccurred("_makerAddress.send(requestedAmount) failed at Accept");
		return false;
    }
	
		
	function GiveVehicleOwnership(address _newOwner) OnlyByOwner()  {
		//This function gives away the rights of the owner.
		//where the ownership of this contract is given along with it. 
        address oldOwner = vehicleOwner;
    
        
        VehicleOwnershipPassed( oldOwner,  _newOwner, now);
        // The now-keyword returns the current block timestamp, as soon as this transaction finds its way into a mined block.
        // I remember hearing that in the real Ethreum network, blocks are mined each 10 minutes. The timestamp is quite accurate.
        vehicleOwner = _newOwner;
    }
}