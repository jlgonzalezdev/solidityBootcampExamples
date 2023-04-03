require("@nomiclabs/hardhat-ethers");

//const API_KEY = process.env.API_KEY;


// provider - 
const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-2-s3.binance.org:8545/", { name: "BSC testnet", chainId: 97 });



async function main() {
   //use getStorageAt to get the value of the storage slot
    const message = await provider.getStorageAt("0xc0bff855b6b8dd54295c8211ba4f14bcb3d87445", 2);
    console.log("The message is: " + message); 
}
main();