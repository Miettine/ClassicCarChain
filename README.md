# ClassicCarChain

Greetings,

What you see here is a work-in-progress project that will utilize the Ethereum block chain. (In-depth description will be added later)

This project will be a thesis for software development studies at Oulu University of Applied Sciences.

The documentation of this project will be primarily in Finnish, with an exception being a poster that will be created near the end of the project. The poster will be in English. Code comments and documentation will be in English, as well.

---

# Starting Classic Car Chain on the local machine

## Requirements

- Some way to run a local Ethereum-node on your machine. You can use a Geth-executable or [testrpc](https://github.com/ethereumjs/testrpc).

- The files of this repository on your local computer. (git clone, or just download the files)

- [Meteor-framework](https://www.meteor.com/)

- Any web browser


## Instructions

1. Make sure that the application's web3 has a provider.

1.1. If you are aiming to remotely contact a geth-node on another computer, you will need to modify the code a little bit. In your local repository, Go to \ClassicCarChain\client\lib\ethereum\02-second\01-start. Modify the file 01-init.js and change the address of the web3-provider into the address where your remote geth-node is running. (This functionality is untested)

1.2.  If you only wish to run this application locally, start a geth-executable or testrpc on your local machine.

2. Deploy the contract into the network one way or another. You may use web3, ethereum wallet, mist, the truffle framework's deployer or whatever you wish. You can find the contract's solidity-code (ClassicCarChain.sol) in ContractDev/contract/.

2.1. If you have the truffle framework installed and wish to use it to deploy the contract into your network, navigate to ContractDev/ in the command line (git bash is good if you are using truffle on windows) and run the command: 'truffle migrate'

3. Once the contract is deployed, copy its address.

4. Using the command line, navigate into the folder Meteor/ClassicCarChain/ in this repository. Start meteor.

5. In a web-browser, go to the address http://localhost:3000/<address>/contract/ Paste your contract address into '<address>'.

6. Enjoy!
