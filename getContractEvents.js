require("dotenv").config();

const Moralis = require("moralis/node");

const serverUrl = process.env.SERVER_URL;
const appId = process.env.APP_ID;
const moralisSecret = process.env.MORALIS_SECRET;

async function getCollectionLogs() {
  // await Moralis.start({ serverUrl, appId, moralisSecret });

  // const ABI = {
  //   "anonymous": false,
  //   "inputs": [
  //     { "indexed": true, "name": "from", "type": "address" },
  //     { "indexed": true, "name": "to", "type": "address" },
  //     { "indexed": false, "name": "value", "type": "uint256" },
  //   ],
  //   "name": "Transfer",
  //   "type": "event",
  // };

  // const options = {
  //   chain: "eth",
  //   address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  //   topic:
  //     "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
  //   limit: "3",
  //   abi: ABI,
  // };
  // const events = await Moralis.Web3API.native.getContractEvents(options);

  console.log(appId);
}

getCollectionLogs();
