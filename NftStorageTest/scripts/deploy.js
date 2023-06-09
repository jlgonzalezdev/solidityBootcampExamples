// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const factory = await hre.ethers.getContractFactory("MyNftWithData", 0x7d22550ad4b60cccd4975465d2803a8c008d6406bdfcb7e69e2fc78f654a2aa4);
  const NFT = await factory.deploy();

  await NFT.deployed();

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
