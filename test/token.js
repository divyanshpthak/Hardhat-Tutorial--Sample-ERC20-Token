// const { inputToConfig } = require("@ethereum-waffle/compiler");
const { expect } = require("chai");
// const { ethers } = require("ethers");

describe("Token contract",function(){
    let Token;
    let hardhatToken;
    let owner;
    let add1;
    let add2;
    let addrs;

    beforeEach(async function(){
        Token= await ethers.getContractFactory("Token");
        [owner,add1,add2,...addrs]= await ethers.getSigners();
        hardhatToken= await Token.deploy();

    });

    describe("Deployment", function(){
     it("Should set the owner right",async function(){
        expect(await hardhatToken.owner()).to.equal(owner.address);

     });

     it("Should assign the total supply to the owner",async function(){
        const ownerBalance= await hardhatToken.balanceOf(owner.address);
        expect (await hardhatToken.totalSupply()).to.equal(ownerBalance);
     });

    describe("Transaction",function(){
        it("Should transfer tokens between accounts",async function(){
            //owner to add1.address
            await hardhatToken.transfer(add1.address,20);
            const add1Balance= await hardhatToken.balanceOf(add1.address);
            expect(add1Balance).to.equal(20);

            //transfer from add1 to add2
            await hardhatToken.connect(add1).transfer(add2.address,10);
            const add2Balance= await hardhatToken.balanceOf(add2.address);
            expect(add2Balance).to.equal(10);
        });

        it("Should fail if sender does not have enough tokens",async function(){
            const initialOwnerBalance= await hardhatToken.balanceOf(owner.address);
            await expect(hardhatToken.connect(add1).transfer(owner.address,1)).to.be.revertedWith("Not enough Tokens");
            expect (await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
        });

        it("Should update balances after transfer", async function(){
            const initialOwnerBalance= await hardhatToken.balanceOf(owner.address);
            await hardhatToken.transfer(add1.address,5);
            await hardhatToken.transfer(add2.address,10);
            const finalOwnerBalance= await hardhatToken.balanceOf(owner.address);
            expect (finalOwnerBalance).to.equal(initialOwnerBalance-15);

            const add1Balance= await hardhatToken.balanceOf(add1.address);
            const add2Balance= await hardhatToken.balanceOf(add2.address);
            expect(add1Balance).to.equal(5);
            expect(add2Balance).to.equal(10);
            
        })
     });
    });


});