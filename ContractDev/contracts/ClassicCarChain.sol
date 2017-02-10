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

	function EmitEvent_HighlightRequestMade private(HighlightRequest _h){
		EHighlightRequestMade(_h.id, _h.maker, _h.requestCreationDateTime, _h.requestedReward, _h.message);
	}

///
	event EHighlightSavedToChain(
		uint highlightId,
		address maker,
		uint requestCreationDateTime,
		uint paidReward,
		string message,

		bool madeByOwner,
		uint additionToChainDateTime

	);

	function EmitEvent_HighlightSavedToChain private(Highlight _h) {
		EHighlightSavedToChain(_h.id, _h.maker, _h.requestCreationDateTime, _h.reward, _h.description, _h.madeByOwner, _h.additionToChainDateTime);
	}
///
	event EHighlightRequestRejected( 
		uint rejectionDateTime,
		
	    uint highlightId,
		address maker,
		uint requestCreationDateTime,
		uint requestedReward,
		string description,
		bool madeByOwner,
		uint additionToChainDateTime
	    );

	function EmitEvent_HighlightSavedToChain private(Highlight _h){
		EHighlightRequestRejected(now, _h.id, _h.maker, _h.requestCreationDateTime, _h.reward, _h.description, _h.madeByOwner, _h.additionToChainDateTime);
	}

	

	event EHighlightDeleted( 
	    uint deletionDateTime, 
	    string reasonForDeletion,
	    
	    uint highlightId,
		address maker,
		uint requestCreationDateTime,
		uint paidReward,
		string description,
		bool madeByOwner,
		uint additionToChainDateTime
	    );
	function EmitEvent_HighlightDeleted private(Highlight _h, string _reasonForDeletion) {
		EHighlightDeleted(now, reasonForDeletion, _h.id, _h.maker, _h.requestCreationDateTime, _h.reward, _h.description, _h.madeByOwner, _h.additionToChainDateTime);
	}

	event EVehicleOwnershipPassed(address oldOwner, address newOwner, uint dateTime);
	
/*
	struct Highlight{
		uint id;
		address maker;
		uint requestCreationDateTime;
		uint reward;
		string description;

		bool madeByOwner;
		uint additionToChainDateTime;
	}
*/

	//The left-side uint is the highlight id
	//A highlight begins its life in the requests-mapping.
	//If its allowed by the owner, the highlight request gets "promoted" into the highlights-mapping.
	/*
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
    */
    /*
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
	
	function AddHighlightAsOwner (string _message) {

		
        highlightIndex += 1;
	}
	
    function MakeHighlightRequest(uint _amountInEther, string _message) NotByOwner() {
        

        
        highlightIndex += 1;
        
    }
    
    function DeleteExistingHighlight(uint _id, string _reasonForDeletion) OnlyByOwner()  {
        //From what I understand, deleting a key in a mapping replaces the struct of that 
        //key with a struct posessing default-values.
        /*
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
           */ 
  

    }
    
    function RejectHighlightRequest(uint _id) OnlyByOwner()  {

        /*
        HighlightRequest highlightToRejected =  highlightRequests[_id];
  
        EHighlightRequestRejected( 
		now,
	    _id,
		highlightToRejected.maker,
		highlightToRejected.requestCreationDateTime,
	    highlightToRejected.requestedReward,
		highlightToRejected.description
	    );
	    
	    delete highlightRequests[_id];*/
    }

    function AcceptHighlightRequest(uint _id) OnlyByOwner() returns (bool)  {
        //TODO: Find out if this function needs to have the payable-keyword.
        //Is there some security restriction, that a contract cannot send funds if
        // the message sender doesn't send them?
        
        // Check if the owner actually has enough money.
    /*
        HighlightRequest handledRequest = highlightRequests[_id];
    
        if (vehicleOwner.balance < handledRequest.requestedReward) {
            return false;
        }
        */
        // Send the money to the maker

        if ( true/*handledRequest.maker.send(handledRequest.requestedReward)*/) {

           
            
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
		string description;
	}
	
	struct Highlight{
		uint id;
		address maker;
		uint requestCreationDateTime;
		uint reward;
		string description;

		bool madeByOwner;
		uint additionToChainDateTime;
	}

	function  NewHighlightRequest  (uint _id, uint _reward,string _description)private returns (HighlightRequest){
	    return HighlightRequest({
			id: _id,
			maker: msg.sender,
			requestCreationDateTime: now,
			reward: _reward,
			description: _description
		});
	}
	
	function NewHighlightByOwner (uint _id, uint _reward,string _description) private returns (Highlight){
		
		    
	    return Highlight({
			id:_id,
			maker:msg.sender,
			requestCreationDateTime:now,
			reward:_reward,
			description:_description,

			madeByOwner:true,
			additionToChainDateTime:now
		});
	}
	
	function NewHighlight (HighlightRequest _h) private returns (Highlight){
		
	    return Highlight({
			id:_h.id,
			maker:_h.maker,
			requestCreationDateTime:_h.requestCreationDateTime,
			reward:_h.reward,
			description:_h.description,

			madeByOwner:false,
			additionToChainDateTime:now
		});
	}
}