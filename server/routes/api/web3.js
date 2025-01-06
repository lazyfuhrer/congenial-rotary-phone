const express = require('express');
const router = express.Router();
const { Web3 } = require('web3');
const { abi: contractABI } = require('../../../artifacts/contracts/SimpleStorage.sol/SimpleStorage.json');
require('dotenv').config();

// Initialize web3 with your provider
const web3 = new Web3(process.env.ALCHEMY_PROVIDER_URL);

const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractABI, contractAddress);



module.exports = router;