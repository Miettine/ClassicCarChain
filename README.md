# Classic Car Chain

Greetings,

What you see here is a work-in-progress project that will utilize the Ethereum block chain. (In-depth description will be added later)

This project will be a thesis for software development studies at Oulu University of Applied Sciences.

The documentation of this project will be primarily in Finnish, with an exception being a poster that will be created near the end of the project. The poster will be in English. Code comments and documentation will be in English, as well.

---

# Starting Classic Car Chain on the local machine

## Required software

- Some way to run a local Ethereum-node on your machine. You can use a Geth-executable or testrpc (see below).

- The files of this repository on your local computer.

- [Meteor-framework](https://www.meteor.com/)

- Any web browser

### Recommended software

- [testrpc](https://github.com/ethereumjs/testrpc) is a node server application that runs on the local computer. It mimics the functionality of the Ethereum-blockchain very closely. Good for purposes of developing or demoing the application.

- [git bash](https://git-scm.com/downloads) is recommended if you wish to use testrpc.

### Windows installation for demoing and development

On some computers I have tried this application with a geth-node, it might take up to 15 minutes to verify even the simplest transaction. This is why using testrpc is recommended during demoing and development.

#### Test RPC

Following instructions at [testrpc wiki](https://github.com/ethereumjs/testrpc/wiki/Installing-TestRPC-on-Windows) is helpful. Much of the required software can be downloaded from Visual Studio community edition installer.

If you run into problems, study console error messages and look for a solution. It is helpful to try both the windows command line and gitbash, because some installations require git.

One useful package is windows build tools:

npm install --global --production windows-build-tools

[Source here](http://stackoverflow.com/questions/21658832/npm-install-error-msb3428-could-not-load-the-visual-c-component-vcbuild-ex)

#### Truffle

https://nodejs.org/en/download/

## Starting the Classic Car Chain -application

### 1. Make sure that the application's web3 has a provider.

Start an ethereum-node or testrpc on your local machine.

If you need to, for example, change the port that the web3 uses, you can modify it in the code at [\ClassicCarChain\client\lib\ethereum\02-second\01-start\01-init.js](..\ClassicCarChain\client\lib\ethereum\02-second\01-start\01-init.js)

### 2. Start Meteor

Using the command line, navigate into the folder Meteor/ClassicCarChain/ in this repository. Start meteor with the 'meteor' -command.

### 3. Open the app in a web browser

Open any web browser and navigate to 

### 4. Deploy the contract

You may use web3, ethereum wallet, mist, the truffle framework's deployer or whatever you wish. You can find the contract's solidity-code  in [ContractDev/contract/ClassicCarChain.sol](../ContractDev/contract/ClassicCarChain.sol).

One easy way to deploy the contract is to use the javascript console and web3. Navigate to http://localhost:3000/ and copy and paste [this code](../deploy-classic-car-chain.js) into the browser console.

Once the contract is deployed, copy its address.

### 5. Navigate to the instance of the contract

In the web-browser, go to the address http://localhost:3000/[address]/contract/ Paste your contract address into '[address]'.

### 6. Enjoy!

If you wish to demo this application to someone, you might want to quickly create some data into the block chain. You can do this by going to the browser console and typing the command "Demo.init()". You should only need to do this once. For the demo data to properly work, the vehicle ownership must be on the first account in the list of accounts. Also, you will need to have at least three accounts on your local Ethereum-node.

If you wish to alter demo-data, you can find it from this file [\Meteor\ClassicCarChain\client\lib\ethereum\06-demo.js](..\Meteor\ClassicCarChain\client\lib\ethereum\06-demo.js)
