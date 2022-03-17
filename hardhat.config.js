require("@nomiclabs/hardhat-waffle");
const fs = require('fs');
const privateKey = fs.readFileSync(".secret").toString().trim() 
//|| "01234567890123456789";
//const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";
const infuraId = "37cbac69f35247a6b09b5c7712f52d30";

module.exports = {
  //defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    
    mumbai: {
      // Infura
      url: `https://polygon-mumbai.infura.io/v3/${infuraId}`,
     // url: "https://rpc-mumbai.matic.today",
      accounts: [privateKey]
    },
    mainnet: {
      // Infura
      url: `https://polygon-mainnet.infura.io/v3/${infuraId}`,
      //url: "https://rpc-mainnet.maticvigil.com",
      accounts: [privateKey]
    }
    
  },
  solidity: {
    version: "0.8.3",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200 
      }
    }
  }
};

