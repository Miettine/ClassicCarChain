pragma solidity ^0.4.8;

contract Master {
    
    Slave slave;
	
	address public slaveAddres;
	
	uint public slaveNumber=0;
    
    function Master(){
        slave = new Slave(this, 999);
		slaveAddres = slave;
		
		slaveText=slave.GetNumber();
    }
    
    function ChangeSlaveNumber(uint _num){
        slave.SetNumber( _num);
		slaveText=slave.GetNumber();
    }
    
}

contract Slave {
    
    address public master;
    uint public number ;
    
    function Slave(address _master,uint _num) {
        master=_master;
        number=_num;
        
    }
    
    function SetNumber(uint _num){
        if (msg.sender==master) {
            
            number=_num;
        }
    }
	
	function GetNumber() public returns (uint) {
		return number;
	}
}