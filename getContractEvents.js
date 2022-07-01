require("dotenv").config();

const Moralis = require("moralis/node");

const serverUrl = process.env.SERVER_URL;
const appId = process.env.APP_ID;
const masterKey = process.env.MASTER_KEY;

async function getCollectionLogs() {
  await Moralis.start({ serverUrl, appId, masterKey });

  const ABI = {
    anonymous: false,
    inputs: [
      { internalType: "uint256", name: "_conditionId", type: "uint256" },
      { internalType: "address", name: "_claimer", type: "address" },
      { internalType: "uint256", name: "_quantity", type: "uint256" },
      { internalType: "address", name: "_currency", type: "address" },
      { internalType: "uint256", name: "_pricePerToken", type: "uint256"},
      { internalType: "bool", name: "verifyMaxQuantityPerTransaction", type: "bool", },
    ],
    name: "verifyClaim",
    type: "event",
  };

  const options = {
    chainId: "43114",
    address: "0x6d04e3fD90d1cb2Fa15dffb54d522a6C749Db382",
    topic: "VerifyClaim(uint256, address, uint256, address, uint256, bool)",
    limit: "100",
    abi: ABI,
  };

  const events = await Moralis.Web3API.native.getContractEvents(options);

  console.log(events);
}


getCollectionLogs();