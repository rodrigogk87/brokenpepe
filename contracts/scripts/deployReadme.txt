how to deploy smart contract:

 taxAddress: address where all taxes are sent when the tokenLiquidityThreshold is met.
 contract.deploy(taxAddress);

 then to allow trading you should do:
 contract.startTrading();