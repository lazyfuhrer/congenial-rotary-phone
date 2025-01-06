const express = require('express');
const router = express.Router();
const { Web3 } = require('web3');
require('dotenv').config();

// Initialize web3 with your provider
const web3 = new Web3(process.env.ALCHEMY_PROVIDER_URL);

router.get('/currentBlock', async (req, res) => {
    try {
      const currentBlock = await web3.eth.getBlockNumber();
      res.json({ currentBlock: currentBlock.toString() });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;