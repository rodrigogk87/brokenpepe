import { ethers } from 'ethers';
import hre from 'hardhat';
import '@nomiclabs/hardhat-ethers';

const main = async (): Promise<void> => {
    const contract: string = '0x021DBfF4A864Aa25c51F0ad2Cd73266Fde66199d';
    const privateKey: string = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

    // Create a provider object
    const provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

    const signer: ethers.Wallet = new ethers.Wallet(privateKey, provider);

    const { abi } = require('../artifacts/contracts/BrokenPepe.sol/BrokenPepe.json');

    const pepe: ethers.Contract = new ethers.Contract(contract, abi, signer);

    const pair: any = await pepe.getPair();

    const balanceETH: ethers.BigNumber = await provider.getBalance(contract);
    const balance: ethers.BigNumber = await pepe.balanceOf(contract);
    //const contractBalance = pepe.balance();

    console.log(pair, balanceETH.toString(), balance.toString());//7 500 000pepe
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
