// migrations/2_deploy_contracts.js
const SimpleContract = artifacts.require("SimpleStorage");

module.exports = function(deployer) {
  deployer.deploy(SimpleContract, 100, { gas: 9007199254740991 }); // Deploying with initial data value of 100 and higher gas limit
};
