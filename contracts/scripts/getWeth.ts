import { ethers } from 'ethers';

const provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
const privateKey: string = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
const wethContractAddress: string = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';

const abi: string[] = [
    'function deposit() payable',
    'function balanceOf(address account) view returns (uint256)'
];

const wrapEth = async (amount: ethers.BigNumber) => {
    const signer: ethers.Wallet = new ethers.Wallet(privateKey, provider);
    const wethContract: ethers.Contract = new ethers.Contract(wethContractAddress, abi, signer);

    const balanceBefore: ethers.BigNumber = await wethContract.balanceOf(signer.address);

    const tx: ethers.ContractTransaction = await wethContract.deposit({
        value: amount,
        gasLimit: 30000000 // set gas price to 100 gwei
    });
    await tx.wait();

    const balanceAfter: ethers.BigNumber = await wethContract.balanceOf(signer.address);
    const wrappedAmount: ethers.BigNumber = balanceAfter.sub(balanceBefore);

    console.log(`Successfully wrapped ${ethers.utils.formatEther(wrappedAmount)} ETH into WETH`);
}

// Example usage: wrap 1 ETH into WETH
wrapEth(ethers.utils.parseEther('100'));
