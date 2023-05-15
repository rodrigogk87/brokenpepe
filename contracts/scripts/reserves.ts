import { ethers, providers } from "ethers";

const getReserves = async (): Promise<void> => {
    const provider: providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

    const pairAddress: string = "0x3f07A0a5aA9BA8fB4001D56a8F3fc6dA72695943";
    const pairAbi: string[] = [
        "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
    ];

    const pairContract: ethers.Contract = new ethers.Contract(pairAddress, pairAbi, provider);

    const reserves: ethers.BigNumber[] = await pairContract.getReserves();

    const reserve0: string = ethers.utils.formatEther(reserves[0].toString());
    const reserve1: string = ethers.utils.formatEther(reserves[1].toString());

    console.log(`Reserve 0: ${reserve0}`);
    console.log(`Reserve 1: ${reserve1}`);
    //107500000
    //300000000
}

getReserves();
