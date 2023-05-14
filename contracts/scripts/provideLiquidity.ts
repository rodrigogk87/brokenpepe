import { ethers } from 'ethers';
import routerABI from './abi/uniswapv2.json';
import "dotenv/config";

const tokenAAddress: string = "0xE857afe7EC8155D46c7D706444Fd75bb323fA5A0";
//"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; eth main
const tokenBAddress: string = "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889"//mumbai
const amountA: string = "2000000000000000000000000000";//2k millons
const amountB: string = "100000000000000000";//0.1 eth

const routerAddress: string = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506";

const addLiquidity = async (): Promise<void> => {
    //const provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
    const provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_MUMBAI}`);

    const privateKey: string = '';
    const signer = new ethers.Wallet(privateKey, provider);
    const { abi } = require('../artifacts/contracts/BrokenPepe.sol/BrokenPepe.json');
    const tokenA = new ethers.Contract(tokenAAddress, abi, signer);
    const address = await signer.getAddress();

    const tokenB = new ethers.Contract(tokenBAddress, [
        "function balanceOf(address owner) view returns (uint256)",
        "function approve(address spender, uint256 amount) returns (bool)",
        "function allowance(address owner,address spender) external view returns (uint256)"
    ], signer);

    const router = new ethers.Contract(routerAddress, routerABI, signer);

    await tokenA.approve(router.address, amountA);
    await tokenB.approve(router.address, amountB);

    const allow1 = await tokenA.allowance(address, router.address);

    const allow2 = await tokenB.allowance(address, router.address);

    console.log(allow1.toString(), allow2.toString());
    //7500000 contract

    //300000000
    //3eth

    const deadline: number = Math.floor(Date.now() / 1000) + 3600;

    const tx = await router.addLiquidity(
        tokenAAddress,
        tokenBAddress,
        amountA,
        amountB,
        0,
        0,
        address,
        deadline
    );

    console.log("Liquidity added to pair with tx hash:", tx);
}

addLiquidity();
