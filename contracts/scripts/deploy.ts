import { ethers } from "hardhat";

async function main() {

  // Replace these with actual addresses
  const BrokePepe = await ethers.getContractFactory("BrokenPepe");
  //param taxReserve address
  const brokePepe = await BrokePepe.deploy("0x0A426EB9a7A6baB9798d5A5823bEE4a2343b24d3", { gasLimit: 5000000 });

  await brokePepe.deployed();

  await brokePepe.startTrading({ gasLimit: 5000000 });

  console.log(`BrokePepe deployed to ${brokePepe.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
