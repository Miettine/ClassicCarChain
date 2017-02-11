pragma solidity ^0.4.9;

contract Controller {
    
    Object object;
    
    
    function Controller(){
        object = new Object(this, "I control you");
    }
    
    function ChangeObjectText(string _text){
        object.SetText( _text);
    }
    
}

contract Object {
    
    address controller;
    string text ;
    
    function Object(address _controller,string _text) {
        controller=_controller;
        text=_text;
        
    }
    
    function SetText(string _text){
        if (msg.sender==controller) {
            
            text=_text;
        }
    }
    
    
}