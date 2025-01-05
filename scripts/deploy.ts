require("@nomicfoundation/hardhat-toolbox");
const hre = require("hardhat");

// This script is used to deploy the CrowdFunding contract on any blockchain

async function main() {
  // Create an instance of the CrowdFunding contract
  const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");

  // Deploy the contract on the blockchain
  const crowdFunding = await CrowdFunding.deploy();

  // Wait for the contract to be mined
  await crowdFunding.waitForDeployment();

  // Get the contract address
  const address = await crowdFunding.getAddress();

  // Log the address of the deployed contract
  console.log("CrowdFunding deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
