require('dotenv').config();
const fs = require('fs');
const { providers, Wallet, Contract } = require('ethers');
const { parseEther, parseUnits } = require('@ethersproject/units');
const usdcAbi = require('./usdc.abi.json');

const rpcUrl = process.env.RPC_URL;
const privateKey = process.env.PRIVATE_KEY;

const provider = new providers.JsonRpcProvider(rpcUrl);
const wallet = new Wallet(privateKey, provider);

const csvFile = 'addresses.csv';

const USDC_AMOUNT = parseUnits('25', 6);
const ARB_GOERLI_ETHER_AMOUNT = parseEther('1');

const USDC_ADDRESS = '0x04FC936a15352a1b15b3B9c56EA002051e3DB3e5';

fs.readFile(csvFile, 'utf8', async (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const usdc = new Contract(USDC_ADDRESS, usdcAbi, wallet);

    const addresses = data.trim().split('\n');

    for (const address of addresses) {
        console.log(`Attempting to fund ${address}`);

        const usdcTx = await usdc.transfer(address, USDC_AMOUNT);
        await usdcTx.wait();
        console.log(`Sent ${USDC_AMOUNT} USDC to ${address}, Transaction hash: https://testnet.arbiscan.io/tx/${usdcTx.hash}`);

        const ethTx = await wallet.sendTransaction({
            to: address,
            value: ARB_GOERLI_ETHER_AMOUNT
        });
        await ethTx.wait();
        console.log(`Sent ${ARB_GOERLI_ETHER_AMOUNT} Ether to ${address}, Transaction hash: https://testnet.arbiscan.io/tx/${ethTx.hash}`);

        console.log(`--------------------------------------------------------`);
    }
})