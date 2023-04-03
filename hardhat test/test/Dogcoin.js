const { expect } = require('chai');
const { ethers } = require('hardhat');
let Dogcoin, dogcoin, owner, addr1;
describe('Dogcoin', function () {
    //testing minting
    describe('Minting', function () {

        this.beforeEach(async function () {
             [owner, addr1] = await ethers.getSigners();
             Dogcoin = await ethers.getContractFactory('DogCoing');
             dogcoin = await Dogcoin.deploy();
             await dogcoin.deployed();
        });

        //testing amount is a multiple of 1000
        it('should throw an error if the amount is not a multiple of 1000', async function () {
            await expect(dogcoin._mint(2300)).to.be.revertedWith('Amount must be a multiple of 1000');
        });
        //testing _mint function is only callable by owner
        it('should throw an error if the function is not called by owner', async function () {
            await expect(dogcoin.connect(addr1)._mint(1000)).to.be.revertedWith('not allowed');
        });
        //testing total supply is updated after minting
        it('should update total supply after minting', async function () {
            const [owner, addr1] = await ethers.getSigners();
            const Dogcoin = await ethers.getContractFactory('DogCoing');
            const dogcoin = await Dogcoin.deploy();
            await dogcoin.deployed();
            await dogcoin._mint(20000);
            expect(await dogcoin.getTotalSupply()).to.equal(20000);
            expect(await dogcoin.getUsersBalance(owner.address)).to.equal(20000);
            expect(await dogcoin._mint(1000)).to.emit(dogcoin, 'totalSupplyChanged').withArgs(1000);
        });
    });
});
