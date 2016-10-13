//pragma solidity ^0.4.2;

contract Beggar {

/*
The beggar deploys this contract, 
the address of the beggar is saved 
to this contract.
Afterwards, the beggar uses this contract
to ask people to send them money.

Useful example: http://solidity.readthedocs.io/en/develop/solidity-by-example.html
*/


     address beggarAddress; 
     
    address public beggedPerson;
    
    uint public beggedSum;

	
    // Events allow light clients to react on
    // changes efficiently
    event BegForMoneyEvent(address beggar, address giver, uint beggedSum);
    event BegAcceptedEvent(address beggar, address giver, uint beggedSum);
	event BegRejectedEvent(address beggar, address giver, uint beggedSum);


    // This is the constructor whose code is
    // run only when the contract is created.
    function Beggar() {
        beggarAddress = msg.sender;
    }

    function Beg( address _beggedPerson, uint _amount) {
        beggedPerson = _beggedPerson;
        beggedSum = _amount;
        
        BegForMoneyEvent(beggarAddress, _beggedPerson, _amount);
    }

    function Accept() returns (bool) {
        
        if (msg.sender != beggedPerson) return; 
        //This is a bit crummy. 
        //Anyone can execute this Accept-function, but nothing will happen.
        //Anyone can see this function, but only if the beggar has asked
        //that address for money, can the money be sent.
        
	    uint amount = msg.value;
		  
		//TODO: Check if the sender actually has enough money.
	
		if (beggedPerson.send(amount)) {
			BegAcceptedEvent( beggarAddress, msg.sender, beggedSum);
            return true;
        } else {
		    BegRejectedEvent( beggarAddress, msg.sender, beggedSum);
            //pendingReturns[msg.sender] = amount;
            return false;
        }
    }
}