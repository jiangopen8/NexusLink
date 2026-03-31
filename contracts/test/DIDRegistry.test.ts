import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('DIDRegistry', () => {
  let contract: any;

  beforeEach(async () => {
    const f = await ethers.getContractFactory('DIDRegistry');
    contract = await f.deploy();
    await contract.waitForDeployment();
  });

  it('registers a DID', async () => {
    const [owner] = await ethers.getSigners();
    const didHash = ethers.keccak256(ethers.toUtf8Bytes('did:nexus:0x123'));
    const ipfsHash = ethers.keccak256(ethers.toUtf8Bytes('QmTest'));
    await contract.register(didHash, ipfsHash);
    const doc = await contract.resolve(didHash);
    expect(doc.active).to.be.true;
    expect(doc.owner).to.eq(owner.address);
  });

  it('rejects duplicate registration', async () => {
    const didHash = ethers.keccak256(ethers.toUtf8Bytes('did:nexus:0xdup'));
    const ipfsHash = ethers.keccak256(ethers.toUtf8Bytes('QmTest'));
    await contract.register(didHash, ipfsHash);
    await expect(contract.register(didHash, ipfsHash)).to.be.revertedWith('DID already registered');
  });

  it('updates DID metadata', async () => {
    const didHash = ethers.keccak256(ethers.toUtf8Bytes('did:nexus:0x456'));
    const ipfsHash1 = ethers.keccak256(ethers.toUtf8Bytes('QmV1'));
    const ipfsHash2 = ethers.keccak256(ethers.toUtf8Bytes('QmV2'));
    await contract.register(didHash, ipfsHash1);
    await contract.update(didHash, ipfsHash2);
    expect((await contract.resolve(didHash)).ipfsHash).to.eq(ipfsHash2);
  });

  it('deactivates DID', async () => {
    const didHash = ethers.keccak256(ethers.toUtf8Bytes('did:nexus:0x789'));
    await contract.register(didHash, ethers.keccak256(ethers.toUtf8Bytes('QmTest')));
    await contract.deactivate(didHash);
    expect((await contract.resolve(didHash)).active).to.be.false;
  });
});
