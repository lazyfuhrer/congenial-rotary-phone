const express = require('express');
const router = express.Router();
const { Web3 } = require('web3');
const { abi: contractABI } = require('../../../artifacts/contracts/SimpleStorage.sol/SimpleStorage.json');
require('dotenv').config();

// Initialize web3 with your provider
const web3 = new Web3(process.env.ALCHEMY_PROVIDER_URL);

const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractABI, contractAddress);

router.get('/getData', async (req, res) => {
    try {
        const data = await contract.methods.get().call();
        res.json({ value: data.toString() });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data from contract' });
    }
});

module.exports = router;