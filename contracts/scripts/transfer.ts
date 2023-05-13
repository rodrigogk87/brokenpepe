import { ethers } from 'ethers';
import hre from 'hardhat';
import '@nomiclabs/hardhat-ethers';



async function main() {
  const contract: string = '0x6212cb549De37c25071cF506aB7E115D140D9e42';
  const privateKey: string = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

  // Create a provider object
  const provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

  const signer: ethers.Wallet = new ethers.Wallet(privateKey, provider);

  // Load the contract ABI
  const { abi } = require('../artifacts/contracts/BrokenPepe.sol/BrokenPepe.json');

  const mrETH: ethers.Contract = await new ethers.Contract(contract, abi, signer);
  const transferAM: ethers.BigNumber = ethers.utils.parseEther('100000000');
  const transfer: ethers.ContractTransaction = await mrETH.transfer('0xdD2FD4581271e230360230F9337D5c0430Bf44C0', transferAM);

  console.log(transfer);
}

main().catch((error: Error) => {
  console.error(error);
  process.exitCode = 1;
});
