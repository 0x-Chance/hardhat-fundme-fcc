const { getNamedAccounts } = require("hardhat");

async function main() {
  const { deployer } = await getNamedAccounts;
  const fundMe = await ethers.getContract("FundMe", deployer);
  console.log("Withdrawing funds from contract");
  const transactionResponse = await fundMe.withdraw();
  await transactionResponse.wait(1);
  console.log("funds have been withdrawn");
}

main();
