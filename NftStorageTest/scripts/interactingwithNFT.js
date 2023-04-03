// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
const MyNftWithData = await hre.ethers.getContractAt("MyNftWithData", "0xd36BF666073Bdc3879A677C5c654310de63926A1");

// let nftId = await MyNftWithData.mintNFT("0x0ee6B19bbecd6d56bcbD66EB0C5E6a550a5D8C25", "ipfs://bafkreiacfwugvellgnbeqzajzcxshxpe3zof7dbiqvu27aqfbnqiokabiq/");
// let receipt = await nftId.wait();
// console.log(receipt.events[0].args);

//show balance of contract
let balance = await MyNftWithData.balanceOf("0x051a97C5791dE0d25D1A5258C3c499E06F4386Bb");
console.log(balance);

//show owner of token
let owner = await MyNftWithData.ownerOf(1);
console.log(owner);

//show tokenURI
let tokenURI = await MyNftWithData.tokenURI(1);
console.log(tokenURI);

//show token owner for tokenId
let tokenOwner = await MyNftWithData.ownerOf(8);
console.log(tokenOwner);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
