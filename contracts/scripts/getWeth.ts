import { ethers } from 'ethers';

//const provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
const provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_MUMBAI}`);

const privateKey: string = '';
//"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; eth main
const wethContractAddress: string = '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889';//mumbai wmatic

const abi: string[] = [
    'function deposit() payable',
    'function balanceOf(address account) view returns (uint256)'
];

const wrapEth = async (amount: ethers.BigNumber) => {
    const signer: ethers.Wallet = new ethers.Wallet(privateKey, provider);
    const wethContract: ethers.Contract = new ethers.Contract(wethContractAddress, abi, signer);

    const balanceBefore: ethers.BigNumber = await wethContract.balanceOf(signer.address);

    const tx: ethers.ContractTransaction = await wethContract.deposit({
        value: amount// set gas price to 100 gwei
    });
    await tx.wait();

    const balanceAfter: ethers.BigNumber = await wethContract.balanceOf(signer.address);
    const wrappedAmount: ethers.BigNumber = balanceAfter.sub(balanceBefore);

    console.log(`Successfully wrapped ${ethers.utils.formatEther(wrappedAmount)} ETH into WETH`);
}

// Example usage: wrap 1 ETH into WETH
wrapEth(ethers.utils.parseEther('0.1'));
