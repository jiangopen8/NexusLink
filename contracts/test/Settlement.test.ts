import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Settlement', () => {
  it('initializes with USDC address', async () => {
    const usdc = '0x' + '11'.repeat(20);
    const f = await ethers.getContractFactory('Settlement');
    const contract = await f.deploy(usdc);
    await contract.waitForDeployment();
    expect(await contract.usdcAddress()).to.eq(usdc);
  });
});
