const { Web3 } = require('web3');
require('dotenv').config({ path: '../server/.env' }); 
const fs = require('fs');

// Get the contract ABI and bytecode
const contractJSON = require('../artifacts/contracts/MyContract.sol/MyContract.json');
const abi = contractJSON.abi;
const bytecode = contractJSON.bytecode;

async function deploy() {
    try {
        const web3 = new Web3(process.env.ALCHEMY_PROVIDER_URL);
        const account = web3.eth.accounts.privateKeyToAccount('0x' + process.env.PRIVATE_KEY);
        web3.eth.accounts.wallet.add(account);

        const contract = new web3.eth.Contract(abi);

        const deploy = contract.deploy({
            data: bytecode,
            arguments: [42]
        });

        const gas = await deploy.estimateGas();

        const tx = await deploy.send({
            from: account.address,
            gas: gas
        });

        console.log('Contract deployed at:', tx.options.address);

        const envPath = '../server/.env';
        let envContent = fs.readFileSync(envPath, 'utf8');
        const contractAddressRegex = /^CONTRACT_ADDRESS=.*/m;
        envContent = envContent.replace(contractAddressRegex, `CONTRACT_ADDRESS=${tx.options.address}`);
        fs.writeFileSync(envPath, envContent);

    } catch (error) {
        console.error('Error deploying contract:', error);
    }
}

deploy();