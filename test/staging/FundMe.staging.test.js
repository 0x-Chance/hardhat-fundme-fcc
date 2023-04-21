const { getNamedAccounts, ethers, network } = require("hardhat");
const { assert, expect } = require("chai");
const { developementChains } = require("../../helper-hardhat-config");

developementChains.includes(network.name)
  ? describe.skip
  : describe(FundMe, async function () {
      let fundMe;
      let deployer;
      const sendValue = ethers.utils.parseEther("1");
      beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer;
        fundMe = await ethers.getContract(fundMe, deployer);
      });
      it("allows people to fund and withdraw", async function () {
        await fundMe.fund({ value: sendValue });
      });
    });
