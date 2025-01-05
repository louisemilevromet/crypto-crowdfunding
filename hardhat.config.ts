require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("dotenv").config();

const { NEXT_PUBLIC_API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: NEXT_PUBLIC_API_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000,
  },
};
