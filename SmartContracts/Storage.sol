pragma solidity ^0.4.0;

///Created by Lauri Johannes Miettinen in fall 2016.

/// I created this simple contract to simply test the Solidity online compiler 
/// and get introduced to the workflow of creating smart contracts.

/// https://ethereum.github.io/browser-solidity/

contract Storage {
    uint storedNumber;

    function SetNumber(uint x) {
        storedNumber = x;
    }

    function GetNumber() constant returns (uint retVal) {
        return storedNumber;
    }
}