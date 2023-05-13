import { ethers } from 'hardhat';
import { ChainId, Token, TokenAmount, Fetcher, Trade, Route, TradeType } from '@uniswap/sdk';

async function main() {
    const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');

    const inputTokenAddress = '0x9A86494Ba45eE1f9EEed9cFC0894f6C5d13a1F0b'; // Token 1
    const outputTokenAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'; // Token 2
    const inputAmount = '7500000000000000000000000'; // 7,500,000.000000 in Wei

    const inputToken = new Token(ChainId.MAINNET, inputTokenAddress, 18);
    const outputToken = new Token(ChainId.MAINNET, outputTokenAddress, 18);

    const pair = await Fetcher.fetchPairData(inputToken, outputToken, provider);
    const route = new Route([pair], inputToken);

    const trade = new Trade(route, new TokenAmount(inputToken, inputAmount), TradeType.EXACT_INPUT);

    console.log(`Estimated output amount: ${trade.outputAmount.toSignificant(6)}`);
    //Estimated output amount: 0.0695727
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
