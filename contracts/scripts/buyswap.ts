import { ethers } from 'ethers';
import routerABI from './abi/uniswapv2.json';
import { abi } from '../artifacts/contracts/BrokenPepe.sol/BrokenPepe.json'

async function swap() {
    // Connect to the Ethereum network using an Infura API key
    // Create a wallet object
    const privateKey: string = '0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e';

    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

    const signer = new ethers.Wallet(privateKey, provider);
    // Load the SushiSwap router contract
    const routerAddress: string = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'; // SushiSwap router address
    const router = new ethers.Contract(routerAddress, routerABI, signer);

    // Set up the swap parameters
    const tokenOut: string = '0x96E303b6D807c0824E83f954784e2d6f3614f167'; // bepp token address
    const tokenIn: string = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'; // WETH token address
    const amountIn = ethers.utils.parseEther('0.1'); // 0.1 ETH
    const amountOutMin = 0; // Minimum amount of WETH we're willing to accept in exchange for 1 DAI
    const deadline: number = Math.floor(Date.now() / 1000) + 60 * 1; // 1 minute deadline

    const from: string = signer.address;

    // Approve the SushiSwap router to spend pepe on our behalf
    const pepeAddress: string = '0x96E303b6D807c0824E83f954784e2d6f3614f167'; // pepe token address
    const pepe = new ethers.Contract(pepeAddress, abi, signer);

    const approveTx = await pepe.approve(routerAddress, amountIn);
    await approveTx.wait();

    // Perform the swap
    const path = [tokenIn, tokenOut];
    const to = from;
    const swapTx = await router.swapExactETHForTokens(
        amountOutMin,
        path,
        to,
        deadline,
        { gasLimit: 30000000, value: amountIn }
    );
    console.log('Swap successful!', swapTx);
};

swap();
