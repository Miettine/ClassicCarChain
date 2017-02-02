pragma solidity ^0.4.6;

contract ClassicCarChain {

	/// Cool ideas to consider:
    
	
	// - [ ] Highlight categories. Different categories have different fields, such as "maintenance" and "expert review"
    // - [ ] Consider if the entire car could be sold with a function in this contract?
    // - [ ] How about auctioning the car within this contract? Giving users the ability to bid on the car?
    // Potential feature-creep -problem if I add auctioning as a part of this.
	// - [ ] Ping-pong bidding ability between the owner and the requester. 
	// The requester asks for money, the owner sends a counter-offer and a round of counter-offers are made
	// Each side can accept in turn or reject the transaction.
	// - [ ] Simplified highlight adding for the vehicle owner. The owner should not have to use the more complex system of requesting for a reward, the same way that other people do.
	// - [x] A spam-avoidance system. The owner should be able to give highlight request rights to specific addresses. 
	// - [x] A way to delete unwanted highlights from the chain. This is in case if the former owner of the car made
	// highlights on nights when they were drunk. A deletion should be publically broadcast to the block chain,
	// none the less. This is to prevent deleting highlights dishonestly.
	// - [x] A settings enumerator. If the vehicle becomes unpopular, the owner has no reason to give away highligh request rights.
	// This is just to make the it easier for the owner to accept requests.
	
	address public vehicleOwner;
	
	//struct VehicleOwner{
	//	string name;
	//	date becameOwner;
	//	string optionalContactInformation;
	//}
	
	string public vehicleModel;

	uint public originBlockNumber; 
	
	uint public vehicleManufacturingYear;
	
	/// If this is false, highlight requests can be made by anyone without asking for special permission
	/// If this is true, highlights can only be sent by people who have been given highlight request rights by the owner.
	/// Should be set to true on popular cars (or cars owned by celebrities), to eliminate highlight request spam.
	/// This may be set to false in unpopular cars that don't have a lot of visiblity, so that the owner has to go through less of a hassle in order to get new highlights.
	//bool strictHighlightRequestState = false;
	
	/*function SetHighlightRequestState (bool _newState) OnlyByOwner() {
		strictHighlightRequestState = _newState;
	}*/
	
	struct Highlight{
	    uint id;
		address maker;
		bool wasMadeByOwner;
		uint requestCreationDateTime;
		uint additionToChainDateTime;
		uint paidReward;
		string description;
	}
	
					//TODO: Security considerations. Only the owner and the highlight maker should ever
		//need to know the reward that was paid. I understood that all blockchain transactions are
		//public by their nature. However, I think this information should be as 
		//difficult as possible to obtain for those who do not need to know it.
	
	struct HighlightRequest{
	    
	    uint id;
		address maker;
		uint requestCreationDateTime;
		uint requestedReward;
		string description;
	}
	
	event EVehicleInformationUpdated(uint eventDateTime, string model, uint manufacturingYear);
	
	event EHighlightRequestMade(
	    uint highlightId,
		address maker,
		uint requestCreationDateTime,
		uint requestedReward,
		string description
		);
	
    event EHighlightSavedToChain(
        uint additionToChainDateTime, 
        bool madeByCurrentOwner,
		
 	    uint highlightId,
		address maker,
		uint requestCreationDateTime,
		uint paidReward,
		string description
        );
    
	event EHighlightRequestRejected( 
		uint rejectionDateTime,
		
	    uint highlightId,
		address maker,
		uint requestCreationDateTime,
		uint requestedReward,
		string description
	    );

	event EHighlightDeleted( 
	    uint deletionDateTime, 
	    string reasonForDeletion,
	    
	    uint highlightId,
		address maker,
		uint requestCreationDateTime,
		uint paidReward,
		string description
	    );

	event EVehicleOwnershipPassed(address oldOwner, address newOwner, uint dateTime);
	event EErrorOccurred(string message);
	
	Highlight[] public highlights;
	HighlightRequest[] public highlightRequests;
	
	function RemoveFromHighlights(uint _index) {
        if (_index >= highlights.length) return;

        for (uint i = _index; i<highlights.length-1; i++){
            highlights[i] = highlights[i+1];
        }
        delete highlights[highlights.length-1];
        highlights.length--;
        return highlights;
    }
	
		
	function RemoveFromHighlightRequests(uint _index)  {
        if (_index >= highlightRequests.length) return;

        for (uint i = _index; i<highlightRequests.length-1; i++){
            highlightRequests[i] = highlightRequests[i+1];
        }
        delete highlightRequests[highlightRequests.length-1];
        highlightRequests.length--;
        return highlightRequests;
    }
	
	//A highlight begins its life in the requests-array.
	//If its allowed by the owner, the highlight request gets "promoted" into the highlights-array.
	
	function GetHighlight(uint _id) 
	returns (
	    address _maker, 
		bool _wasMadeByOwner,
	    uint _requestCreationDateTime, 
	    uint _additionToChainDateTime, 
	    uint _paidReward, 
	    string _description
	    ) {
        
        Highlight h = highlights[_id];
        
        _maker = h.maker;
		_wasMadeByOwner = h.wasMadeByOwner;
        _requestCreationDateTime = h.requestCreationDateTime;
        _additionToChainDateTime = h.additionToChainDateTime;
        _paidReward = h.paidReward;
        _description = h.description;
    }
    
	function GetHighlightRequest(uint _id) 
	returns (
	address _maker,
		uint _requestCreationDateTime,
		uint _requestedReward,
		string _description
	    ) {

        HighlightRequest h = highlightRequests[_id];
        
        _maker = h.maker;
        _requestCreationDateTime = h.requestCreationDateTime;
        _requestedReward = h.requestedReward;
        _description = h.description;
    }
	
    function ClassicCarChain(string _model, uint _year) {
        vehicleOwner = msg.sender;
        //The one who created this contract to the network becomes the first vehicle owner.
        
		originBlockNumber = block.number;
        vehicleModel = _model;
	    vehicleManufacturingYear = _year;
    }
	
    function UpdateVehicleInformation(string _model, uint _year) OnlyByOwner()  {
	    vehicleManufacturingYear = _year;
        vehicleModel = _model;
	    
	    EVehicleInformationUpdated(now,vehicleModel,vehicleManufacturingYear);
    }
	
    function UpdateVehicleModel(string _model) OnlyByOwner()  {
        vehicleModel = _model;
	    
	    EVehicleInformationUpdated(now,vehicleModel,vehicleManufacturingYear);
    }
	
	function UpdateVehicleManufacturingYear(uint _year) OnlyByOwner()  {

	    vehicleManufacturingYear = _year;
	    
	    EVehicleInformationUpdated(now,vehicleModel,vehicleManufacturingYear);
    }
	
	function GetNumberOfHighlights() public constant returns(uint) {
		return highlights.length;
	}
	
	function GetNumberOfHighlightRequests() public constant returns(uint) {
		return highlightRequests.length;
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
    
	
	function AddHighlightAsOwner (string _message) {

		 EHighlightSavedToChain(
            now, 
			true,
			
     	    highlightIndex,
    		msg.sender,
    		now,
    		0,
    		_message
        );
		
        //highlights[highlightIndex] = 
			//EErrorOccurred ("Added to mapping");
       
	highlights.push(Highlight({
                id:highlightIndex, 
                maker:msg.sender, 
				wasMadeByOwner:true,
                requestCreationDateTime:now,
                additionToChainDateTime:now,
                paidReward:0,
                description:_message
        })
        );
		
        highlightIndex += 1;
	}
	
    function MakeHighlightRequest(uint _amountInEther, string _message) NotByOwner() {
        
        highlightRequests[highlightIndex] = 
        HighlightRequest(
            highlightIndex, // id
            msg.sender, // highlightMaker
            now,
            _amountInEther * 1 ether, // requestedReward
            _message // description
        );
        
    	EHighlightRequestMade(
    	    highlightIndex,
    		msg.sender,
    		now,
    		_amountInEther * 1 ether,
    	    _message
	    );
        
        highlightIndex += 1;
        
    }
    
    function DeleteExistingHighlight(uint _id, string _reasonForDeletion) OnlyByOwner()  {
        //From what I understand, deleting a key in a mapping replaces the struct of that 
        //key with a struct posessing default-values.
        
        Highlight highlightToBeDeleted =  highlights[_id];
        
        EHighlightDeleted( 
            now,
            _reasonForDeletion,
            _id, 
            highlightToBeDeleted.maker, 
             highlightToBeDeleted.requestCreationDateTime, 
             highlightToBeDeleted.paidReward, 
             highlightToBeDeleted.description
            );
            

		
        delete highlights[_id];
            
  

    }
    
    function RejectHighlightRequest(uint _id) OnlyByOwner()  {

        
        HighlightRequest highlightToRejected =  highlightRequests[_id];
  
        EHighlightRequestRejected( 
		now,
	    _id,
		highlightToRejected.maker,
		highlightToRejected.requestCreationDateTime,
	    highlightToRejected.requestedReward,
		highlightToRejected.description
	    );
	    
	    delete highlightRequests[_id];
    }

    function AcceptHighlightRequest(uint _id) OnlyByOwner() returns (bool)  {
        //TODO: Find out if this function needs to have the payable-keyword.
        //Is there some security restriction, that a contract cannot send funds if
        // the message sender doesn't send them?
        
        // Check if the owner actually has enough money.
    
        HighlightRequest handledRequest = highlightRequests[_id];
    
        if (vehicleOwner.balance < handledRequest.requestedReward) {
            return false;
        }
        
        // Send the money to the maker

        // Who exacly is the sender? Who pays for the transaction?
        // The contract? The message sender? Who?
        // Have scoured the internet for hours. Still don't understand who it is.
        if ( handledRequest.maker.send(handledRequest.requestedReward)) {

            // Remove the maker from the list of highlightRequests.
            
            address h_maker = handledRequest.maker;
            uint h_requestCreationDateTime = handledRequest.requestCreationDateTime;
            
            uint h_additionToChainDateTime=now;
            uint h_paidReward=handledRequest.requestedReward;
            string h_description=handledRequest.description;

            highlights[_id] = Highlight({
                id:_id, 
                wasMadeByOwner:false,
                maker:h_maker, 
                requestCreationDateTime:h_requestCreationDateTime,
                additionToChainDateTime:h_additionToChainDateTime,
                paidReward:h_paidReward,
                description:h_description
            });
                
            EHighlightSavedToChain(
                now,
				false,
				
         	    _id,
        		h_maker,
        		h_requestCreationDateTime,
        		h_paidReward,
        		h_description
            );
            
            delete highlightRequests[_id];
            
            return true;
        }
		
		EErrorOccurred("_makerAddress.send(requestedAmount) failed at Accept");
		return false;
    }
	
	function GiveVehicleOwnership(address _newOwner) OnlyByOwner()  {
        if (_newOwner!=vehicleOwner){
            address oldOwner = vehicleOwner;
            
            EVehicleOwnershipPassed( oldOwner,  _newOwner, now);
            // The now-keyword returns the current block timestamp, as soon as this transaction finds its way into a mined block.
            // I remember hearing that in the real Ethreum network, blocks are mined each 10 minutes. The timestamp is quite accurate.
            vehicleOwner = _newOwner;
        } else {
            EErrorOccurred("When transferring ownership, the new requested owner was the same as the current owner.");
        }
    }
}