pragma solidity ^0.4.6;

contract ClassicCarChain {


	address public vehicleOwner;
	
	string public vehicleModel;

	uint public originBlockNumber; 
	
	uint public vehicleManufacturingYear;
	
    /// This index is used as an identifier of Highlights. It is incremented whenever a new highlight request is made.
	uint public highlightIndex=0;
	


	mapping highlights (uint => Highlight);
	mapping highlightRequests (uint => HighlightRequest);

	event EHighlightRequestMade(
	    uint highlightId,
		address maker,
		uint requestCreationDateTime,
		uint requestedReward,
		string message
	);

	event EHighlightSavedToChain(
		uint highlightId,
		address maker,
		uint requestCreationDateTime,
		uint paidReward,
		string message,

		uint additionToChainDateTime,
		bool madeByOwner
	);

	event EVehicleInformationUpdated(uint eventDateTime, string model, uint manufacturingYear);
	
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
	
	//Highlight[] public highlights;
	//HighlightRequest[] public highlightRequests;
	
	mapping(uint => Highlight) private highlights;
	mapping(uint => HighlightRequest) private highlightRequests;
	//The left-side uint is the highlight id
	//A highlight begins its life in the requests-mapping.
	//If its allowed by the owner, the highlight request gets "promoted" into the highlights-mapping.
	
	function GetHighlight(uint _id) 
	returns (
	    address _maker, 
	    uint _requestCreationDateTime, 	
	    uint _additionToChainDateTime, 
	    uint _paidReward, 
	    string _description
	    ) {
        
        Highlight h = highlights[_id];
        
        _maker = h.maker;
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
    
    // Came up with this idea in an attempt to find out if a key exists in a mapping
    //mapping(address => address) private highlightRights;
    
	//modifier OnlyIfHaveHighlightRights()
    //{
    //    if (msg.sender == highlightRights[msg.sender]) {
	//		_;
	//	} 
    //}
    
	/*function GiveHighlightRequestRights(address _givenAddress) OnlyByOwner() {
	    highlightRights[_givenAddress] = _givenAddress;
	}
		
	function RevokeHighlightRequestRights(address _givenAddress) OnlyByOwner() {
	    delete highlightRights[_givenAddress];
	}*/
	
	function AddHighlightAsOwner (string _message) {

		
        //highlights[highlightIndex] = 
			//EErrorOccurred ("Added to mapping");
       
	highlights[highlightIndex]=Highlight({
        
                maker:msg.sender, 
				wasMadeByOwner:true,
                requestCreationDateTime:now,
                additionToChainDateTime:now,
                paidReward:0,
                description:_message
        });
		
        highlightIndex += 1;
	}
	
    function MakeHighlightRequest(uint _amountInEther, string _message) NotByOwner() {
        
        highlightRequests[highlightIndex] = 
        HighlightRequest(
            msg.sender, // highlightMaker
            now,
            _amountInEther * 1 ether, // requestedReward
            _message // description
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
                wasMadeByOwner:false,
                maker:h_maker, 
                requestCreationDateTime:h_requestCreationDateTime,
                additionToChainDateTime:h_additionToChainDateTime,
                paidReward:h_paidReward,
                description:h_description
            });
                
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

contract HighlightRequest {

	//The owner cannot make highlight requests. Only highlights.

	uint public highlightId;
	address public maker;
	string public message;
	uint public reward; //The reward is essentially "requested reward" in HighlightRequest, in Highlights, it is "paid reward"
	uint public requestCreationDateTime;

	event EHighlightRequestMade(
	    uint highlightId,
		address maker,
		uint requestCreationDateTime,
		uint requestedReward,
		string message
	);

	function HighlightRequest( uint _highlightId,uint _requestedReward, string _message ) {
		highlightId = _highlightId;
		maker = msg.sender;
		reward = _requestedReward;
		message = _message;
		requestCreationDateTime = now;

		EHighlightRequestMade(highlightId, maker, requestCreationDateTime, reward, message);
		
	}
}

contract Highlight is HighlightRequest {

	// requested reward is zero if its made by owner
	// If the highlight was made by the owner, requestCreationDateTime is the same as the additiontochain datetime

	uint public additionToChainDateTime;
	bool public madeByOwner;

	event EHighlightSavedToChain(
		uint highlightId,
		address maker,
		uint requestCreationDateTime,
		uint paidReward,
		string message,

		uint additionToChainDateTime,
		bool madeByOwner
	);

	function Highlight( uint _highlightId, uint _requestedReward, string _message, uint _requestCreationDateTime, bool _madeByOwner ) {
		additionToChainDateTime = now;
		madeByOwner = _madeByOwner;

		if (madeByOwner) {
			requestCreationDateTime = now;
			//Else this value gets inherited.
		}

		EHighlightSavedToChain(highlightId, maker, requestCreationDateTime, reward, message, additionToChainDateTime, madeByOwner);
	}

	//Would like to have two constructors. Onw which upgrades a highlight request, another which allows for owner to create it.
}

library Hlib {

	struct HighlightRequest {
		uint id;
		address maker;
		uint requestCreationDateTime;
		uint reward;
		string description;
	}
	
	struct Highlight{
		HighlightRequest highlightRequest;

		bool wasMadeByOwner;
		uint additionToChainDateTime;
	}

	function private (HighlightRequest _request, bool _o, uint _a) returns (Highlight){

	}
}