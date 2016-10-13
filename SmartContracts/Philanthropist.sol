pragma solidity ^0.4.2;

contract Philantropist {

/*
The pilantropist is a rich guy who gives money to people who ask for it.

The philantropist owns the contract. Beggars can ask the philantropist for money

he philantropist can accept begs.

Useful example: http://solidity.readthedocs.io/en/develop/solidity-by-example.html
*/


    address public philantropistAddress; 

    // This field allows key-value pairs to be saved.
    // Whenever a person begs, that person's address 
    // and the amount they begged is saved.
     mapping(address => uint) begs;
	
    // Events allow light clients to react on
    // changes efficiently
    //They allow me to see history of 
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

    function Accept(address _beggar) returns (bool) {
       
        //1: Only the Philantropist is allowed to accept begs. No-one else. 
        if (msg.sender != philantropistAddress)   throw; 
        
        //2: Check if the beggar's address is valid. 
        //If the address supplied by the philantropist 
        //is not found on the list of beggars, cancel this function call.
        
        
        
        //3: Check if the philantropist actually has enough money.
        
         uint amount = begs[_beggar];
         
         if (philantropistAddress.balance < amount) {
             throw;
         }
        
        //4: Send the money to the beggar
        
        
        
        //5: remove the beggar from the list of begs.

    }
}