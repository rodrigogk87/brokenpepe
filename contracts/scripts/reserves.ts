import { ethers, providers } from "ethers";

const getReserves = async (): Promise<void> => {
    const provider: providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

    const pairAddress: string = "0x91AE7683D0fF324e1813FB9AAb8cBDd5C9c9a591";
    const pairAbi: string[] = [
        "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
    ];

    const pairContract: ethers.Contract = new ethers.Contract(pairAddress, pairAbi, provider);

    const reserves: ethers.BigNumber[] = await pairContract.getReserves();

    const reserve0: string = ethers.utils.formatEther(reserves[0].toString());
    const reserve1: string = ethers.utils.formatEther(reserves[1].toString());

    console.log(`Reserve 0: ${reserve0}`);
    console.log(`Reserve 1: ${reserve1}`);
}

getReserves();
