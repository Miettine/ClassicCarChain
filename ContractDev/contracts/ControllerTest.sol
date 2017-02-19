pragma solidity ^0.4.9;

contract Master {
    
    Slave slave;
    
    
    function Master(){
        slave = new Slave(this, "I control you");
    }
    
    function ChangeSlaveText(string _text){
        slave.SetText( _text);
    }
    
}

contract Slave {
    
    address public master;
    string public text ;
    
    function Slave(address _master,string _text) {
        master=_master;
        text=_text;
        
    }
    
    function SetText(string _text){
        if (msg.sender==master) {
            
            text=_text;
        }
    }
    
    
}