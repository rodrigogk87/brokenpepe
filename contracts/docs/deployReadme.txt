Deployment:
taxAddress: address where all taxes are sent when the tokenLiquidityThreshold is met.
contract.deploy(taxAddress);

then to allow trading you should do:
contract.startTrading();

Distribution:
1t tokens will be minted to the contract creator (owner)
token allocations should be made manually sending them to the desired wallets.

Liquidity:
You should provide the liquidity to uniswapv2 (both the token and eth).
if you need the pair contract you can do a request to contract.getPair() that will return
the bpp/weth pair address