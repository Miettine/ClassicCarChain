import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.Block.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  EthBlocks.init();
  EthAccounts.init();
});


Template.Block.helpers({
 /* counter() {
    return Template.instance().counter.get();
  },*/
    currentBlock: function(){
        return EthBlocks.latest.number;
    }

});

Template.StorageNumber.helpers({
 /* counter() {
    return Template.instance().counter.get();
  },*/

    storageNumber: function () {
      var abi =[ { "constant": true, "inputs": [], "name": "GetNumber", "outputs": [ { "name": "retVal", "type": "uint256", "value": "42" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "x", "type": "uint256" } ], "name": "SetNumber", "outputs": [], "payable": false, "type": "function" } ];
      // '0x06060405234610000575b6090806100176000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806306a5312b146040578063331bb01b146060575b6000565b34600057604a607a565b6040518082815260200191505060405180910390f35b34600057607860048080359060200190919050506085565b005b600060005490505b90565b806000819055505b5056';
      //Still trying to figure out what "ABI" even is. I think it may be that JSON-text, or it could be a bunch of binary data.

      // creation of contract object
      var contractAddress = "0x9E79d08e2ce653E9D1770CA101423f447c5f2d13";
      var contract = web3.eth.contract(contractAddress, abi);
      return contract.call().GetNumber();
    }
});
