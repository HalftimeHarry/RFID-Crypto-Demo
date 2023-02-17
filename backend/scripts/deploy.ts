const { ethers } = require("hardhat");

async function main() {
  // Compile the RewardDemo contract
  const RewardDemo = await ethers.getContractFactory("RewardDemo");

  // Deploy the contract
  const rewardDemo = await RewardDemo.deploy();
  await rewardDemo.deployed();

  console.log("RewardDemo contract deployed to:", rewardDemo.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
  