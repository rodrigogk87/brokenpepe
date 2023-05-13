import { ethers } from 'ethers';
import hre from 'hardhat';
import '@nomiclabs/hardhat-ethers';



async function main() {
  const contract: string = '0x9A86494Ba45eE1f9EEed9cFC0894f6C5d13a1F0b';
  const privateKey: string = '0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e';//'0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0';

  // Create a provider object
  const provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

  const signer: ethers.Wallet = new ethers.Wallet(privateKey, provider);

  // Load the contract ABI
  const { abi } = require('../artifacts/contracts/BrokenPepe.sol/BrokenPepe.json');

  const pepe: ethers.Contract = await new ethers.Contract(contract, abi, signer);
  const transferAM: ethers.BigNumber = ethers.utils.parseEther('10000000');
  //await pepe.approve('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', transferAM);
  const transfer: ethers.ContractTransaction = await pepe.transfer('0xdD2FD4581271e230360230F9337D5c0430Bf44C0', transferAM);

  let tx = await transfer.wait();
  console.log(tx);
}

main().catch((error: Error) => {
  console.error(error);
  process.exitCode = 1;
});
