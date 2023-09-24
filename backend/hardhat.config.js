require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    ganache: {
      url: 'HTTP://127.0.0.1:7545',
      chainId: 1337,
    },
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/Wu1bOXdZ-KdzlwMMrm6FQ4hKK7TiPZG3",
      accounts: ["5e2dd5592f8015d8ca54fa879b53edc3acd766f709df1d82d9cbcbde08b85099"]
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/TnjWoKkBNTMdXciDGb5gsEFvlng7m_MM",
      accounts: ["5e2dd5592f8015d8ca54fa879b53edc3acd766f709df1d82d9cbcbde08b85099"]
    }
  },
};
