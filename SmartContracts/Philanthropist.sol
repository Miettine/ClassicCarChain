pragma solidity ^0.4.2;

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
    event BegForMoneyEvent(address beggar, uint beggedSum);
    event MoneyDonatedEvent(address beggar, uint beggedSum);
	event BegRejectedEvent(address beggar, uint beggedSum);

    // This is the constructor whose code is
    // run only when the contract is created.
    function Philantropist() {
        philantropistAddress = msg.sender;
    }

    function Beg( uint _amountInEther) {
        begs[msg.sender] += _amountInEther;
        
        BegForMoneyEvent(msg.sender, _amountInEther);
    }

    function Accept(address _beggarAddress) returns (bool) {
       
        //1: Only the Philantropist is allowed to accept begs. No-one else. 
        if (msg.sender != philantropistAddress){
            throw; //Reminder to self: throw consumes all provided gas!
            //http://solidity.readthedocs.io/en/develop/solidity-by-example.html
            //See Voting-example
        }
        
        //2: Check if the beggar's address is valid. 
        //If the address supplied by the philantropist 
        //is not found on the list of beggars, cancel this function call.
        
        //https://www.reddit.com/r/ethereum/comments/3j64hz/how_can_you_figure_out_if_a_certain_key_exists_in/
        //if (_beggarAddress )
        
        //Aaaargh! I don't understand how to do this :(
		
        //Maybe it works like: if begs[_beggarAddress]!=null 
		//Maybe begs[_beggarAddress] simply returns zero if a person with that address hasn't begged?
		//I just need to make sure this program doesn't crash on this part, if the beggar address is not found.
		
		
        //3: Check if the philantropist actually has enough money.
        
         uint amount = begs[_beggarAddress];
         
         if (philantropistAddress.balance < amount) {
             throw;
         }
        
        //4: Send the money to the beggar

        if (!msg.sender.send(amount))
            throw;
        //Not entirely sure what the if-clause is needed for.
        //I think it checks if the transaction was successful and throws if it wasn't.
        
        //5: remove the beggar from the list of begs.
        
        begs[_beggarAddress]=0; //Zero this, just in case I misunderstood how the delete keyword works.
        delete begs[_beggarAddress];

    }
}