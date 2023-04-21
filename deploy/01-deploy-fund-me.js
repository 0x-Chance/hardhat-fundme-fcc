// function deployFunc( ) {
//     console.log("hi");
// };

const { network } = require("hardhat");

// module.exports = async (hre) =>{
//     const {getNamedAccounts, deployments} = hre;
//}
const {
  networkConfig,
  developementChains,
} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  //const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]; // we have modularized our code

  let ethUsdPriceFeedAddress;

  //when going for localhost we want to create some mocks
  //lets make some mocks
  if (developementChains.includes(network.name)) {
    const ethUsdAggregator = await get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  }

  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [ethUsdPriceFeedAddress], //pricefeed address
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  if (
    !developementChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(fundMe.address, [ethUsdPriceFeedAddress]);
  }
  log("-----------------------------------------");
};

module.exports.tags = ["all", "fundme"];
