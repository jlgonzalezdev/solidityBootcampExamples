// SPDX-License-Identifier: UNLICENSED .
pragma solidity ^0.8.18;

struct Payment {
    address recipient;
    uint256 amount;
}

contract DogCoing {
    uint256 totalSupply;
    address owner;
    mapping (address => uint256) private usersBalance;
    mapping (address => Payment[]) private payments;

    event totalSupplyChanged (uint256 totalSupply);
    event transferExecuted (address recipient,uint256 amount);

    constructor(){
        totalSupply = 0;
        owner = msg.sender;
        usersBalance[owner] = totalSupply;
    }

    modifier onlyOwner(){
        require(msg.sender==owner, "not allowed");
        _;
    }

    function getTotalSupply() public view returns(uint256)
    {
        return totalSupply;
    }

    function increaseSupplyBy1000() public onlyOwner{
        totalSupply += 1000;
         usersBalance[owner] += 1000;
        emit totalSupplyChanged(totalSupply);
    }

    function _mint(uint256 amount) public onlyOwner {
        //validate amount is a multiple of 1000
        require(amount % 1000 == 0, "Amount must be a multiple of 1000");
        totalSupply += amount;
        usersBalance[owner] += amount;
        emit totalSupplyChanged(totalSupply);
    }

    function getUsersBalance(address user) public view returns(uint256){
        return usersBalance[user];
    }

    function transfer(address recipient, uint256 amount) public {
        require(usersBalance[msg.sender] > amount, "not enough balance to transfer");
        usersBalance[msg.sender]-= amount;
        usersBalance[recipient]+= amount;
        Payment memory _payment;
        _payment.recipient = recipient;
        _payment.amount = amount;
        payments[msg.sender].push(_payment);
        emit transferExecuted(recipient, amount);
    }
}