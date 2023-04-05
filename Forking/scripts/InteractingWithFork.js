const hre = require("hardhat");

async function main() {
 //print the network name
    console.log("Network name: ", hre.network.name);
//print the network id
    console.log( await hre.ethers.provider.send("eth_chainId"));
//print the block number
    console.log("Block number: ", await hre.ethers.provider.getBlockNumber());

//Defining PancakeSwap pair address
const pairAddress = "0x3516B306DD2adF32B10B652ED47ffe381457514a";
//Defining pair abi
const pairAbi = [
    "function token0() external view returns (address)",
    "function token1() external view returns (address)",
    "function factory() external view returns (address)",
]

//call factory funtion to get the factory address of the pair
const pairContract = new hre.ethers.Contract(pairAddress, pairAbi, hre.ethers.provider);
console.log("Factory address: ", await pairContract.factory());
//call token0 function to get the token0 address of the pair
console.log("Token0 address: ", await pairContract.token0());
//call token1 function to get the token1 address of the pair
console.log("Token1 address: ", await pairContract.token1());

//Interacting with LEGO-USD pair
const LegoUsdPairAddress = "0xb95817627a289EDB10C4fe6a126f41665Eb6B8B9";
const LegoUsdPairAbi = [
    "function token0() external view returns (address)",
    "function token1() external view returns (address)",
    "function factory() external view returns (address)",
    "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)"
];
const LegoUsdPairContract = new hre.ethers.Contract(LegoUsdPairAddress, LegoUsdPairAbi, hre.ethers.provider);
console.log("Factory address: ", await LegoUsdPairContract.factory());
console.log("Token0 address: ", await LegoUsdPairContract.token0());
console.log("Token1 address: ", await LegoUsdPairContract.token1());
const reserves = await LegoUsdPairContract.getReserves();
console.log("Reserves: ", reserves);
//print reserves timestamp in date format
console.log("Reserves timestamp: ", new Date(reserves[2] * 1000));

//Defining LEGO token address
const legoTokenAddress = "0x520EbCcc63E4d0804b35Cda25978BEb7159bF0CC";
//Defining LEGO token abi
const legoTokenAbi = [
    "function name() external view returns (string)",
    "function symbol() external view returns (string)",
    "function decimals() external view returns (uint8)",
    "function totalSupply() external view returns (uint256)",
    "function balanceOf(address account) external view returns (uint256)",
    "function transfer(address recipient, uint256 amount) external returns (bool)",
    "function allowance(address owner, address spender) external view returns (uint256)",
    "function approve(address spender, uint256 amount) external returns (bool)"
];
const legoContract = new hre.ethers.Contract(legoTokenAddress, legoTokenAbi, hre.ethers.provider);

//Impersonating an account
const walletToImpersonate = "0xffefE959d8bAEA028b1697ABfc4285028d6CEB10";
const impersonatedSigner = await hre.ethers.provider.getSigner(walletToImpersonate);

//print Lego balance of the account
const txId = await legoContract.balanceOf(walletToImpersonate);

console.log("Lego balance for imporsonated account: ", await legoContract.balanceOf(walletToImpersonate));

//deining busd token address
const busdAddress = "0x55d398326f99059fF775485246999027B3197955";
//defining busd token abi
const busdAbi = [
    "function name() external view returns (string)",
    "function symbol() external view returns (string)",
    "function decimals() external view returns (uint8)",
    "function totalSupply() external view returns (uint256)",
    "function balanceOf(address account) external view returns (uint256)",
    "function transfer(address recipient, uint256 amount) external returns (bool)",
    "function allowance(address owner, address spender) external view returns (uint256)",
    "function approve(address spender, uint256 amount) external returns (bool)"
];

const busdContract = new hre.ethers.Contract(busdAddress, busdAbi, impersonatedSigner);
console.log("Busd balance for imporsonated account: ", await busdContract.balanceOf(walletToImpersonate));

//defining pancake router v2 address
const pancakeRouterV2Address = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
//defining pancake router v2 abi
const pancakeRouterV2Abi = [
    "function getAmountsOut(uint amountIn, address[] memory path) external view returns (uint[] memory amounts)",
    "function getAmountsIn(uint amountOut, address[] memory path) external view returns (uint[] memory amounts)",
    "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
    "function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
    "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)",
    "function swapExactTokensForTokensSupportingFeeOnTransferTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external",
    "function swapExactETHForTokensSupportingFeeOnTransferTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable",
    "function swapExactTokensForETHSupportingFeeOnTransferTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external"
];
const pancakeRouterV2Contract = new hre.ethers.Contract(pancakeRouterV2Address, pancakeRouterV2Abi, impersonatedSigner);

//approve busd to pancake router v2
const approveBusdTx = await busdContract.approve(pancakeRouterV2Address, hre.ethers.utils.parseUnits("100", 18));
console.log("Approve busd tx: ", approveBusdTx);
//approve lego to pancake router v2
//const approveLegoTx = await legoContract.connect(impersonatedSigner).approve(pancakeRouterV2Address, hre.ethers.utils.parseUnits("100", 18));
//console.log("Approve lego tx: ", approveLegoTx);
//swap 100 busd to lego
const busdToLegoPath = [busdAddress, legoTokenAddress];
const busdToLegoAmountIn = hre.ethers.utils.parseUnits("100", 18);
const busdToLegoAmountOutMin = hre.ethers.utils.parseUnits("0.00000001", 18);
const busdToLegoDeadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time
const busdToLegoTx = await pancakeRouterV2Contract.connect(impersonatedSigner).swapExactTokensForTokens(
    busdToLegoAmountIn,
    busdToLegoAmountOutMin,
    busdToLegoPath,
    walletToImpersonate,
    busdToLegoDeadline
);
console.log("Swap busd to lego tx: ", busdToLegoTx);


}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
