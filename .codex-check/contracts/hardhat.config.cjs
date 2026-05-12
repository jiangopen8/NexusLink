'use strict';
require('@nomicfoundation/hardhat-ethers');
require('@nomicfoundation/hardhat-chai-matchers');

/** @type import('hardhat').HardhatUserConfig */
const config = {
  solidity: '0.8.24',
  networks: {
    localhost: { url: 'http://127.0.0.1:8545' },
    arbitrumSepolia: {
      url: process.env.ARBITRUM_SEPOLIA_RPC ?? 'https://sepolia-rollup.arbitrum.io/rpc',
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  mocha: {
    timeout: 10000,
  },
};
module.exports = config;
