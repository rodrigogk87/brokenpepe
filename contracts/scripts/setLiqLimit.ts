import { ethers } from 'ethers';
import '@nomiclabs/hardhat-ethers';

const main = async (): Promise<void> => {
    const contract: string = '0x89ec9355b1Bcc964e576211c8B011BD709083f8d';
    const privateKey: string = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

    // Create a provider object
    const provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

    const signer: ethers.Wallet = new ethers.Wallet(privateKey, provider);

    const { abi } = require('../artifacts/contracts/BrokenPepe.sol/BrokenPepe.json');

    const pepe: ethers.Contract = new ethers.Contract(contract, abi, signer);


    let tokenLiquidityThreshold = ethers.utils.parseEther('1000000000').toString();

    const tokenLiquidityThresholdTx = await pepe.setTokenLiquidityThreshold(tokenLiquidityThreshold);

    await tokenLiquidityThresholdTx.wait();

    const newLiquidityThreshold = await pepe.tokenLiquidityThreshold();

    console.log(newLiquidityThreshold);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
