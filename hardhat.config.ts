require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");

module.exports = {
  solidity: "0.8.27",
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
};
