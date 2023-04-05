require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      forking: {
        url: "https://bitter-fabled-patina.bsc.discover.quiknode.pro/a07f5b68bc05f060e78188d5f2dc26831fc81348/",
        blockNumber: 27061683
      },
    },
  },
};
