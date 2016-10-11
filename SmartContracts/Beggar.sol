pragma solidity ^0.4.2;

contract Beggar {

/*
The beggar deploys this contract, 
the address of the beggar is saved 
to this contract.
Afterwards, the beggar uses this contract
to ask people to send them money.

Useful example: http://solidity.readthedocs.io/en/develop/solidity-by-example.html
*/

    mapping (address => uint) public balances; 
	//Do I need something like this?
	//I think that this is needed only if I'm making a token.
	//My intention is to make a contract that can send Ether, not tokens.

     address public beggarAddress; 
    //I'm not sure if this is correct. From what I understood, 
    //this field is stored to this contract object.
    address public beggedPerson;
    
    uint public beggedSum;

    mapping(address => uint) pendingReturns;
	
    // Events allow light clients to react on
    // changes efficiently
    //Not sure if I actually need these.
    event BegForMoneyEvent(address beggar, address giver, uint beggedSum);
    event BegAcceptedEvent(address beggar, address giver, uint beggedSum);


    // This is the constructor whose code is
    // run only when the contract is created.
    function Beggar(address _beggarAddress) {
        beggarAddress = _beggarAddress;
    }

    function Beg( address _beggedPerson, uint _amount) {
        beggedPerson = _beggedPerson;
        beggedSum = _amount;
        
        BegForMoneyEvent( beggarAddress, _beggedPerson, _amount);
    }

    function Accept() {
        
        if (msg.sender != beggedPerson) return; 
        //This is a bit crummy. 
        //Anyone can execute this Accept-function, but nothing will happen.
        //Anyone can see this function, but only if the beggar has asked
        //that address for money, can the money be sent.
        
        if (balances[msg.sender] < beggedSum) return;
        
        balances[msg.sender] -= beggedSum;
        balances[beggarAddress] += beggedSum;
        
        
        BegAcceptedEvent( beggarAddress, msg.sender, beggedSum);
    }
}