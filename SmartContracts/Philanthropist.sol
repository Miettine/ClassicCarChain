pragma solidity ^0.4.6;

contract Philantropist {

/*
The pilantropist is a rich guy who gives money to people who ask for it.

The philantropist owns the contract. Beggars can ask the philantropist for money

The philantropist can accept begs or choose to reject them.

Useful example: http://solidity.readthedocs.io/en/develop/solidity-by-example.html
*/


    address public philantropistAddress; 

    // This field allows key-value pairs to be saved.
    // Whenever a person begs, that person's address 
    // and the amount they begged is saved.
    mapping(address => uint) begs;
	
    // Events allow light clients to react on
    // changes efficiently
    //They allow me to see history of transactions.
    event BegMade(address beggar, uint beggedSum);
    event BegAccepted(address beggar, uint beggedSum);
	event BegRejected(address beggar, uint beggedSum);
	event RightsPassed(address oldPhilantropist, address newPhilantropist, uint dateTime);

    // This is the constructor whose code is
    // run only when the contract is created.
    function Philantropist() {
        philantropistAddress = msg.sender;
    }

    function Beg(uint _amountInEther) {
        //This function is not payable
		//Begging will overwrite the person's previous beg, whatever sum that may be.
        begs[msg.sender] = _amountInEther * 1 ether;
        
        BegMade(msg.sender, _amountInEther);
    }
    
    /// Following was taken from: 
    /// https://solidity.readthedocs.io/en/develop/common-patterns.html
    // Modifiers can be used to change
    // the body of a function.
    // If this modifier is used, it will
    // prepend a check that only passes
    // if the function is called from
    // a certain address.
    modifier OnlyByPhilantropist()
    {
        if (msg.sender != philantropistAddress)
            throw;
        // Do not forget the "_;"! It will
        // be replaced by the actual function
        // body when the modifier is used.
        _;
    }
    
    function Reject(address _beggarAddress) OnlyByPhilantropist()  {

        uint beggedAmount = begs[_beggarAddress];
        
        begs[_beggarAddress]=0; //Zero this, just in case I misunderstood how the delete keyword works.
        delete begs[_beggarAddress];
            
        BegRejected(_beggarAddress, beggedAmount);

    }

    function Accept(address _beggarAddress) OnlyByPhilantropist() returns (bool)  {
        //TODO: Find out if this function needs to have the payable-keyword.
        //Is there some security restriction, that a contract cannot send funds if
        // the message sender doesn't send them?
        
        //Does this function need a return value?
        
        
        // Check if the beggar's address is valid. 
        //If the address supplied by the philantropist 
        //is not found on the list of beggars, cancel this function call.
        
        //https://www.reddit.com/r/ethereum/comments/3j64hz/how_can_you_figure_out_if_a_certain_key_exists_in/
        //if (_beggarAddress )
        
        //Aaaargh! I don't understand how to do this :(
		
        //Maybe it works like: if begs[_beggarAddress]!=null 
		//Maybe begs[_beggarAddress] simply returns zero if a person with that address hasn't begged?
		//I just need to make sure this program doesn't crash on this part, if the beggar address is not found.
		
        // Check if the philantropist actually has enough money.
        
        uint beggedAmount = begs[_beggarAddress];
         
        if (philantropistAddress.balance < beggedAmount) {
            throw;
            // `throw` terminates and reverts all changes to
            // the state and to Ether balances. It is often
            // a good idea to use this if functions are
            // called incorrectly. But watch out, this
            // will also consume all provided gas.
        }
        
        // Send the money to the beggar

        //Not entirely sure what the if-clause is needed for.
        //I think it checks if the transaction was successful.
        if ( _beggarAddress.send(beggedAmount)) {
            
            // Remove the beggar from the list of begs.
            
            begs[_beggarAddress]=0;
            delete begs[_beggarAddress];
            
            BegAccepted(_beggarAddress, beggedAmount);
            
            return true;
        }
        return false;
    }
    
    function GivePhilantropistRights(address _newPhilantropist) OnlyByPhilantropist()  {
    //This function gives away the rights of the philantropist. This is equivalent to selling the classic car, 
    //where the ownership of this contract is given along with it. 
        address oldPhilantropist = philantropistAddress;
    
        
        RightsPassed( oldPhilantropist,  _newPhilantropist, now);
        // The now-keyword returns the current block timestamp, as soon as this transaction finds its way into a mined block.
        // I remember hearing that in the real Ethreum network, blocks are mined each 10 minutes. The timestamp is quite accurate.
        philantropistAddress = _newPhilantropist;
    }
    
    /// Cool ideas to consider:
    
    //Consider if the entire car could be sold with a function in this contract? :)
    //How about auctioning the car within this contract? Giving users the ability to bid on the car?
    //Potential feature-creep -problem if I add auctioning as a part of this.

}