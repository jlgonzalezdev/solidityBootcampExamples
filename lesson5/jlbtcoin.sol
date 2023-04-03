// contracts/BEP20.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import openzeppelin token contract
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract jlbtcoin is ERC20 {
    constructor() ERC20Detailed("jlbtcoin", "JLBT", 18) public {
    }
}

