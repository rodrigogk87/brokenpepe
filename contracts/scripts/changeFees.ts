import { ethers } from 'ethers';
import '@nomiclabs/hardhat-ethers';

const main = async (): Promise<void> => {
    const contract: string = '0xaE2abbDE6c9829141675fA0A629a675badbb0d9F';
    const privateKey: string = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

    // Create a provider object
    const provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

    const signer: ethers.Wallet = new ethers.Wallet(privateKey, provider);

    const { abi } = require('../artifacts/contracts/BrokenPepe.sol/BrokenPepe.json');

    const feeContract: ethers.Contract = new ethers.Contract(contract, abi, signer);

    let classes = [
        { name: "poors", balanceThreshold: ethers.utils.parseEther('500000000'), fee: 1000 },
        { name: "borderline", balanceThreshold: ethers.utils.parseEther('5000000000'), fee: 750 },
        { name: "middleclass", balanceThreshold: ethers.utils.parseEther('9000000000'), fee: 500 },
        { name: "upperclass", balanceThreshold: ethers.utils.parseEther('15000000000'), fee: 250 }
    ];

    for (let cls of classes) {
        const setFeeThresholdTx = await feeContract.setFeeThreshold(cls.name, cls.balanceThreshold, cls.fee);
        await setFeeThresholdTx.wait();

        const newFeeThreshold = await feeContract.feeThresholds(cls.name);
        console.log(`New threshold for ${cls.name}: ${newFeeThreshold.balanceThreshold.toString()}, ${newFeeThreshold.fee.toString()}`);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
