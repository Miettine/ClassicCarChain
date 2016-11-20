if(typeof web3 === 'undefined'){
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));}




// contract abi
var abi = [{"constant":false,"inputs":[{"name":"_amountInEther","type":"uint256"}],"name":"Beg","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"philantropistAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_beggarAddress","type":"address"}],"name":"Accept","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"beggar","type":"address"},{"indexed":false,"name":"beggedSum","type":"uint256"}],"name":"BegForMoneyEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"beggar","type":"address"},{"indexed":false,"name":"beggedSum","type":"uint256"}],"name":"MoneyDonatedEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"beggar","type":"address"},{"indexed":false,"name":"beggedSum","type":"uint256"}],"name":"BegRejectedEvent","type":"event"}];

// creation of contract object
var MyContract = web3.eth.contract(abi);
var myContractInstance = MyContract.at('0x2e1fBA1e5d279f382E69aBb6EFA4CE25c245C485');


/*
//

// contract abi
var abi = [{"constant":false,"inputs":[{"name":"_amountInEther","type":"uint256"}],"name":"Beg","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"philantropistAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_beggarAddress","type":"address"}],"name":"Accept","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"beggar","type":"address"},{"indexed":false,"name":"beggedSum","type":"uint256"}],"name":"BegForMoneyEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"beggar","type":"address"},{"indexed":false,"name":"beggedSum","type":"uint256"}],"name":"MoneyDonatedEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"beggar","type":"address"},{"indexed":false,"name":"beggedSum","type":"uint256"}],"name":"BegRejectedEvent","type":"event"}];

// creation of contract object
var MyContract = web3.eth.contract(abi);
var myContractInstance = MyContract.at('0x2e1fBA1e5d279f382E69aBb6EFA4CE25c245C485')
*/