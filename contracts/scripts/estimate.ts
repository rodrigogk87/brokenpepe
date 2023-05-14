import { ethers } from 'hardhat';
import { ChainId, Token, TokenAmount, Fetcher, Trade, Route, TradeType } from '@uniswap/sdk';

async function main() {
    //    const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
    const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_MUMBAI}`);

    const inputTokenAddress = '0xE857afe7EC8155D46c7D706444Fd75bb323fA5A0'; // Token 1
    const outputTokenAddress = '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889'; // Token 2
    //const inputAmount = '1000000000000000000000000000'; // 1k millons

    const inputAmount = '220000000000000000000000000';

    const inputToken = new Token(ChainId.MAINNET, inputTokenAddress, 18);
    const outputToken = new Token(ChainId.MAINNET, outputTokenAddress, 18);

    const pair = await Fetcher.fetchPairData(inputToken, outputToken, provider);
    const route = new Route([pair], inputToken);

    const trade = new Trade(route, new TokenAmount(inputToken, inputAmount), TradeType.EXACT_INPUT);

    console.log(`Estimated output amount: ${trade.outputAmount.toSignificant(6)}`);
    //Estimated output amount: 0.789661
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
