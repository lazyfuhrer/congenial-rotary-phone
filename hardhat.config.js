require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({ path: 'server/.env' }); 

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_PROVIDER_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};