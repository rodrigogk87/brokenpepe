import { ethers } from 'hardhat';

async function main() {
    const [deployer] = await ethers.getSigners();
    const BrokePepeFactory = await ethers.getContractFactory("BrokenPepe");

    const dummyAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

    // Estimate the gas for deployment
    const gasEstimate = await deployer.estimateGas(BrokePepeFactory.getDeployTransaction(dummyAddress));
    console.log(`Estimated gas for deployment: ${gasEstimate.toString()}`);

    const brokePepe = await BrokePepeFactory.deploy(dummyAddress, { gasLimit: 30000000 });
    await brokePepe.deployed();
    console.log(`BrokePepe deployed to ${brokePepe.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

    //Estimated gas for deployment: 5207403