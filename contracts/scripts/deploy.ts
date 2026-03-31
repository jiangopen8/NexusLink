import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying with:', deployer.address);

  const didRegistry = await ethers.deployContract('DIDRegistry');
  await didRegistry.waitForDeployment();
  console.log('DIDRegistry:', await didRegistry.getAddress());

  const nssRegistry = await ethers.deployContract('NSSRegistry');
  await nssRegistry.waitForDeployment();
  console.log('NSSRegistry:', await nssRegistry.getAddress());

  const usdc = process.env.USDC_ADDRESS ?? '0x0000000000000000000000000000000000000000';
  const settlement = await ethers.deployContract('Settlement', [usdc]);
  await settlement.waitForDeployment();
  console.log('Settlement:', await settlement.getAddress());

  console.log('\nDID_REGISTRY_ADDRESS=' + await didRegistry.getAddress());
  console.log('NSS_REGISTRY_ADDRESS=' + await nssRegistry.getAddress());
  console.log('SETTLEMENT_ADDRESS=' + await settlement.getAddress());
}

main().catch(console.error);
