import { ethers } from 'ethers';
import routerABI from './abi/uniswapv2.json';

const tokenAAddress: string = "0x24EcC5E6EaA700368B8FAC259d3fBD045f695A08";
const tokenBAddress: string = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const amountA: string = (ethers.utils.parseEther('60000000000000')).toString();
const amountB: string = "10000000000000000000";//10 eth
const routerAddress: string = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

const addLiquidity = async (): Promise<void> => {
    const provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
    const privateKey: string = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
    const signer = new ethers.Wallet(privateKey, provider)
    const { abi } = require('../artifacts/contracts/BrokenPepe.sol/BrokenPepe.json');
    const tokenA = new ethers.Contract(tokenAAddress, abi, signer);
    const address = await signer.getAddress();

    const tokenB = new ethers.Contract(tokenBAddress, [
        "function balanceOf(address owner) view returns (uint256)",
        "function approve(address spender, uint256 amount) returns (bool)",
        "function allowance(address owner,address spender) external view returns (uint256)"
    ], signer);

    const router = new ethers.Contract(routerAddress, routerABI, signer);

    await tokenA.approve(router.address, amountA, { gasLimit: 30000000 });
    await tokenB.approve(router.address, amountB, { gasLimit: 30000000 });

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
        deadline,
        { gasLimit: 30000000 }
    );

    console.log("Liquidity added to pair with tx hash:", tx);
}

addLiquidity();
