const express = require('express');
const router = express.Router();
const { Web3 } = require('web3');
// import contract abi
const { abi: contractABI } = require('../../../artifacts/contracts/MyContract.sol/MyContract.json');
require('dotenv').config();

// Initialize web3 with your provider
const web3 = new Web3(process.env.ALCHEMY_PROVIDER_URL);

const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Get myNumber from the contract
router.get('/myNumber', async (req, res) => {
    try {
        const number = await contract.methods.myNumber().call();
        res.json({ myNumber: number.toString() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});  

// Set myNumber in the contract
router.post('/setMyNumber', async (req, res) => {
    try {
        const { number, fromAddress } = req.body;

        // Create the transaction
        const tx = contract.methods.setMyNumber(number);
        const gas = await tx.estimateGas({ from: fromAddress });

        // Get the data for the transaction
        const data = tx.encodeABI();

        // Create transaction object
        const transactionObject = {
            from: fromAddress,
            to: contractAddress,
            gas: web3.utils.toHex(gas), // Convert gas to hex string
            data: data
        };

        // Return the transaction object that needs to be signed by the client
        res.json({
            transactionObject,
            message: 'Transaction created successfully. Sign and send this transaction using your Web3 wallet.'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;