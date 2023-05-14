import { ethers } from 'ethers';
import routerABI from './abi/uniswapv2.json';
import { abi } from '../artifacts/contracts/BrokenPepe.sol/BrokenPepe.json'

async function swap() {
    // Connect to the Ethereum network using an Infura API key
    // Create a wallet object
    const privateKey: string = '';

    //const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
    const provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_MUMBAI}`);

    const signer = new ethers.Wallet(privateKey, provider);
    // Load the SushiSwap router contract
    const routerAddress: string = '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506'; // SushiSwap router address
    const router = new ethers.Contract(routerAddress, routerABI, signer);

    // Set up the swap parameters
    const tokenIn: string = '0xE857afe7EC8155D46c7D706444Fd75bb323fA5A0'; // bepp token address
    const tokenOut: string = '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889'; // WETH token address
    const amountIn = ethers.utils.parseEther('100000000'); // 107500000 pepe
    const amountOutMin = 0; // Minimum amount of WETH we're willing to accept in exchange for 1 DAI
    const deadline: number = Math.floor(Date.now() / 1000) + 60 * 1; // 1 minute deadline

    const from: string = signer.address;

    // Approve the SushiSwap router to spend pepe on our behalf
    const pepeAddress: string = '0xE857afe7EC8155D46c7D706444Fd75bb323fA5A0'; // pepe token address
    const pepe = new ethers.Contract(pepeAddress, abi, signer);

    const approveTx = await pepe.approve(routerAddress, amountIn);
    await approveTx.wait();

    // Perform the swap
    const path = [tokenIn, tokenOut];
    const to = from;
    const swapTx = await router.swapExactTokensForTokensSupportingFeeOnTransferTokens(
        amountIn,
        amountOutMin,
        path,
        to,
        deadline
    );
    console.log('Swap successful!', swapTx);
};

swap();
