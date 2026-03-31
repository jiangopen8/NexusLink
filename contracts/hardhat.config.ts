import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-ethers';
import '@nomicfoundation/hardhat-chai-matchers';

const config: HardhatUserConfig = {
  solidity: '0.8.24',
  networks: {
    localhost: { url: 'http://127.0.0.1:8545' },
    arbitrumSepolia: {
      url: process.env.ARBITRUM_SEPOLIA_RPC ?? 'https://sepolia-rollup.arbitrum.io/rpc',
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
};
export default config;
