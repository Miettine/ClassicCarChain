if(typeof web3 === 'undefined'){
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

EthAccounts.init();
EthBlocks.init();
