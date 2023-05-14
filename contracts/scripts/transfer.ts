import { ethers } from 'ethers';
import hre from 'hardhat';
import '@nomiclabs/hardhat-ethers';


/*

    Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
    Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

    Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
    Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

    Account #2: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC (10000 ETH)
    Private Key: 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a

    Account #3: 0x90F79bf6EB2c4f870365E785982E1f101E93b906 (10000 ETH)
    Private Key: 0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6

    Account #4: 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 (10000 ETH)
    Private Key: 0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a

    Account #5: 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc (10000 ETH)
    Private Key: 0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba

    Account #18: 0xdD2FD4581271e230360230F9337D5c0430Bf44C0 (10000 ETH)
    Private Key: 0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0

    Account #19: 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199 (10000 ETH)
    Private Key: 0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e
  */

async function main() {
  const contract: string = '0x837a41023CF81234f89F956C94D676918b4791c1';
  const privateKey: string = '0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0';//'0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0';

  // Create a provider object
  const provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

  const signer: ethers.Wallet = new ethers.Wallet(privateKey, provider);

  // Load the contract ABI
  const { abi } = require('../artifacts/contracts/BrokenPepe.sol/BrokenPepe.json');

  const pepe: ethers.Contract = await new ethers.Contract(contract, abi, signer);
  const transferAM: ethers.BigNumber = ethers.utils.parseEther('90000000');
  //await pepe.approve('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', transferAM);
  const transfer: ethers.ContractTransaction = await pepe.transfer('0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', transferAM);

  let tx = await transfer.wait();
  console.log(tx);
  //100000000
  //  7500000
}

main().catch((error: Error) => {
  console.error(error);
  process.exitCode = 1;
});
