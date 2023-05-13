import { ethers } from 'ethers';
import hre from 'hardhat';
import '@nomiclabs/hardhat-ethers';



async function main() {
  const contract: string = '0x49149a233de6E4cD6835971506F47EE5862289c1';
  const privateKey: string = '0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0';

  // Create a provider object
  const provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

  const signer: ethers.Wallet = new ethers.Wallet(privateKey, provider);

  // Load the contract ABI
  const { abi } = require('../artifacts/contracts/BrokenPepe.sol/BrokenPepe.json');

  const mrETH: ethers.Contract = await new ethers.Contract(contract, abi, signer);
  const transferAM: ethers.BigNumber = ethers.utils.parseEther('30000000');
  const transfer: ethers.ContractTransaction = await mrETH.transfer('0xdD2FD4581271e230360230F9337D5c0430Bf44C0', transferAM);

  let tx = await transfer.wait();
  console.log(tx);
}

main().catch((error: Error) => {
  console.error(error);
  process.exitCode = 1;
});
