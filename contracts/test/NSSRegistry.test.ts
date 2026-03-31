const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('NSSRegistry', () => {
  let contract;

  beforeEach(async () => {
    const f = await ethers.getContractFactory('NSSRegistry');
    contract = await f.deploy();
    await contract.waitForDeployment();
  });

  it('publishes and invokes a skill', async () => {
    const skillId = ethers.keccak256(ethers.toUtf8Bytes('skill:financial:v1'));
    const pubHash = ethers.keccak256(ethers.toUtf8Bytes('did:nexus:0xPUB'));
    const descHash = ethers.keccak256(ethers.toUtf8Bytes('QmDesc'));
    await contract.publish(skillId, pubHash, descHash, ethers.parseEther('0.5'));
    expect((await contract.resolve(skillId)).active).to.be.true;
    await contract.invoke(skillId);
    expect((await contract.resolve(skillId)).callCount).to.eq(1n);
  });

  it('deactivates skill', async () => {
    const skillId = ethers.keccak256(ethers.toUtf8Bytes('skill:test:v1'));
    await contract.publish(skillId, ethers.keccak256(ethers.toUtf8Bytes('pub')),
      ethers.keccak256(ethers.toUtf8Bytes('desc')), 0n);
    await contract.deactivate(skillId);
    expect((await contract.resolve(skillId)).active).to.be.false;
  });
});
