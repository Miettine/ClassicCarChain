pragma solidity ^0.4.6;

contract ClassicCarChain {

	
	/// Cool ideas to consider:
    
    // - Consider if the entire car could be sold with a function in this contract?
    // - How about auctioning the car within this contract? Giving users the ability to bid on the car?
    // Potential feature-creep -problem if I add auctioning as a part of this.
	// - Some ping-pong bidding ability between the owner and the requester. 
	// The requester asks for money, the owner sends a counter-offer and a round of counter-offers are made
	// Each side can accept in turn or reject the transaction.
	// - A spam-avoidance system. The owner should be able to give highlight request rights
	
	address public vehicleOwner;
	string vehicleModel;
	date manufacturingYear;
	
	struct Highlight{
		address highlightMaker;
		string optionalContactInformation;
		string description;
		date date;
	}
	
	event HighlightRequestMade(address maker, uint sum);
    event HighlightSavedToChain(address maker, uint beggedSum);
	event HighlightRejected(address maker, uint beggedSum);
	event VehicleOwnershipPassed(address oldOwner, address newOwner, uint dateTime);
	event ErrorOccurred(string message);
	
	mapping(address => Highlight) highlightRequests;
	
    function ClassicCarChain() {
        vehicleOwner = msg.sender;
    }
	
	modifier OnlyByOwner()
    {
        if (msg.sender == vehicleOwner) {
		
			_;
		}
    }
	
	function GiveVehicleOwnership(address _newOwner) OnlyByOwner()  {
		//This function gives away the rights of the owner.
		//where the ownership of this contract is given along with it. 
        address oldOwner = ownerAddress;
    
        
        OwnershipPassed( oldOwner,  _newOwner, now);
        // The now-keyword returns the current block timestamp, as soon as this transaction finds its way into a mined block.
        // I remember hearing that in the real Ethreum network, blocks are mined each 10 minutes. The timestamp is quite accurate.
        ownerAddress = _newOwner;
    }
	
	function GetBeg(address _address) returns (uint) {
		return highlightRequests[_address];
	}
	
	function GetOwnerAddress() returns (address){
		return ownerAddress;
	}

    function Beg(uint _amountInEther) {
        //This function is not payable
		//Begging will overwrite the person's previous beg, whatever sum that may be.
        highlightRequests[msg.sender] = _amountInEther * 1 ether;
        
        BegMade(msg.sender, _amountInEther);
    }
    
    function Reject(address _makerAddress) OnlyByOwner()  {

        uint beggedAmount = highlightRequests[_makerAddress];
        
        highlightRequests[_makerAddress]=0; //Zero this, just in case I misunderstood how the delete keyword works.
        delete highlightRequests[_makerAddress];
            
        BegRejected(_makerAddress, beggedAmount);

    }

    function Accept(address _makerAddress) OnlyByOwner() returns (bool)  {
        //TODO: Find out if this function needs to have the payable-keyword.
        //Is there some security restriction, that a contract cannot send funds if
        // the message sender doesn't send them?
        
        // Check if the owner actually has enough money.
        
        uint beggedAmount = highlightRequests[_makerAddress];
         
        if (ownerAddress.balance < beggedAmount) {
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
        if ( _makerAddress.send(beggedAmount)) {

            // Remove the maker from the list of highlightRequests.
            
            highlightRequests[_makerAddress]=0;
            delete highlightRequests[_makerAddress];
            
            BegAccepted(_makerAddress, beggedAmount);
            
            return true;
        }
		
		ErrorOccurred("_makerAddress.send(beggedAmount) failed at Accept");
		return false;
    }
}