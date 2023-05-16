import { ethers } from "hardhat";

async function main() {
    const BrokePepe = await ethers.getContractFactory("BrokenPepe");
    const brokePepe = await BrokePepe.deploy("0x70997970C51812dc3A010C7d01b50e0d17dc79C8", { gasLimit: 30000000 });

    const receipt = await brokePepe.deployTransaction.wait();
    console.log(`Gas used for deployment: ${receipt.gasUsed.toString()}`);

    await brokePepe.deployed();
    console.log(`BrokePepe deployed to ${brokePepe.address}`);

    const transaction = await brokePepe.startTrading({ gasLimit: 5000000 });
    const startTradingReceipt = await transaction.wait();

    console.log(`Gas used for startTrading: ${startTradingReceipt.gasUsed.toString()}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
