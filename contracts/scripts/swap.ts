import { ethers } from 'ethers';
import routerABI from './abi/uniswapv2.json';
import { abi } from '../artifacts/contracts/BrokenPepe.sol/BrokenPepe.json'

async function swap() {
    // Connect to the Ethereum network using an Infura API key
    // Create a wallet object
    const privateKey: string = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

    const signer = new ethers.Wallet(privateKey, provider);
    // Load the SushiSwap router contract
    const routerAddress: string = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'; // SushiSwap router address
    const router = new ethers.Contract(routerAddress, routerABI, signer);

    // Set up the swap parameters
    const tokenIn: string = '0x64f5219563e28EeBAAd91Ca8D31fa3b36621FD4f'; // bepp token address
    const tokenOut: string = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'; // WETH token address
    const amountIn = ethers.utils.parseEther('107500000'); // 107500000 pepe
    const amountOutMin = 0; // Minimum amount of WETH we're willing to accept in exchange for 1 DAI
    const deadline: number = Math.floor(Date.now() / 1000) + 60 * 1; // 1 minute deadline

    const from: string = signer.address;

    // Approve the SushiSwap router to spend pepe on our behalf
    const pepeAddress: string = '0xAA5c5496e2586F81d8d2d0B970eB85aB088639c2'; // pepe token address
    const pepe = new ethers.Contract(pepeAddress, abi, signer);

    const approveTx = await pepe.approve(routerAddress, amountIn);
    await approveTx.wait();

    // Perform the swap
    const path = [tokenIn, tokenOut];
    const to = from;
    const swapTx = await router.swapExactTokensForETHSupportingFeeOnTransferTokens(
        amountIn,
        amountOutMin,
        path,
        to,
        deadline,
        { gasLimit: 30000000 }
    );
    console.log('Swap successful!', swapTx);
};

swap();
