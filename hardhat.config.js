/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require("@nomiclabs/hardhat-waffle");

 const ALCHEMY_API_KEY = "Pstior6kvDYrdyO1jY4r84Kq5C6Y2DEl";
 const RINKEBY_PRIVATE_KEY =
   "f7592ae8c322cf526feb885b0825cbe2d365951fb30d9f5d10359d1d5a6d0307";
 module.exports = {
   solidity: "0.8.9",
 
   networks: {
     rinkeby: {
       url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
       accounts: [`0x${RINKEBY_PRIVATE_KEY}`],
     },
   },
 };