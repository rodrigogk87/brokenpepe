import { ethers } from 'ethers';
import hre from 'hardhat';
import '@nomiclabs/hardhat-ethers';



async function main() {
  const contract: string = '0x021DBfF4A864Aa25c51F0ad2Cd73266Fde66199d';
  const privateKey: string = '0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e';//'0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0';

  // Create a provider object
  const provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

  const signer: ethers.Wallet = new ethers.Wallet(privateKey, provider);

  // Load the contract ABI
  const { abi } = require('../artifacts/contracts/BrokenPepe.sol/BrokenPepe.json');

  const pepe: ethers.Contract = await new ethers.Contract(contract, abi, signer);
  const transferAM: ethers.BigNumber = ethers.utils.parseEther('30000000');
  const transfer: ethers.ContractTransaction = await pepe.transfer('0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', transferAM);

  let tx = await transfer.wait();
  console.log(tx);
}

main().catch((error: Error) => {
  console.error(error);
  process.exitCode = 1;
});
