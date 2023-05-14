import { ethers } from 'ethers';
import hre from 'hardhat';
import '@nomiclabs/hardhat-ethers';

const main = async (): Promise<void> => {
    const contract: string = '0xE857afe7EC8155D46c7D706444Fd75bb323fA5A0';
    const privateKey: string = '';

    // Create a provider object
    //const provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
    const provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_MUMBAI}`);

    const signer: ethers.Wallet = new ethers.Wallet(privateKey, provider);

    const { abi } = require('../artifacts/contracts/BrokenPepe.sol/BrokenPepe.json');

    const pepe: ethers.Contract = new ethers.Contract(contract, abi, signer);

    const pair: any = await pepe.getPair();

    console.log(pair);//7 500 000pepe
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
