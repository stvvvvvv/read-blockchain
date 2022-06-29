const { accessSync } = require("fs");
const http = require("http");

const CONTRACT_ADDRESS = "0x2d3392582b8e582d7cdfe3cb0eddfe32c06a7776";
const LAST_BLOCK = "26956033";

async function getNftsEvents() {
  const Moralis = require("moralis/node");

  const serverUrl = "https://kieicknnrdyw.usemoralis.com:2053/server";
  const appId = "65FS5coueVO14m3yMci1PycbLpE6cbym1SgRJmht";
  const masterKey = "7BNx6OuMy9upq9Fu5Pi4SOSTKMNTuz1bmeKWsTUg";

  await Moralis.start({ serverUrl, appId, masterKey });

  // Get last block form EVM
  let options = {
    date: Date.now(),
    chain: "mumbai",
  };

  const actualBlockObj = await Moralis.Web3API.native.getDateToBlock(options);

  // Get nft info from blockchain
  let i = Number(LAST_BLOCK);
  let filtredTxn = [];
  const logs = [];

  getNfts(i);

  function getNfts(i) {
    setTimeout(async () => {
      console.log(i);

      options = {
        block_number_or_hash: i,
        chain: "mumbai",
      };

      let resp = await Moralis.Web3API.native.getNFTTransfersByBlock(options);
      logs.push(resp.result);
      i++;

      if (i < 26956046) {
        getNfts(i);
      } else {
        filtredTxn = logs.map((txn) => {
          return txn.filter((t) => {
            if (t.token_address === CONTRACT_ADDRESS) {
              return t.token_address === CONTRACT_ADDRESS;
            }
          });
        });

        console.log(
          "filtredTxn: ",
          filtredTxn.filter((t) => {
            return t.length > 0;
          })
        );
      }
    }, 200);
  }
}

async function getCollectionLogs() {
  const Moralis = require("moralis/node");

  const serverUrl = "https://kieicknnrdyw.usemoralis.com:2053/server";
  const appId = "65FS5coueVO14m3yMci1PycbLpE6cbym1SgRJmht";
  const masterKey = "7BNx6OuMy9upq9Fu5Pi4SOSTKMNTuz1bmeKWsTUg";

  await Moralis.start({ serverUrl, appId, masterKey });

  const TRANSACTIONS_HASH = [
    "0xf3b610418be2703678bc27990ae0471e798e17af15420a1602649a71b6c02e2f",
    "0x78f4641b7b358f4029857606c5c0c6ea6b80f36fd0c4513c3987b2e996388d3c",
  ];
  const txnLogs = [];

  TRANSACTIONS_HASH.map((hash) => {
    setTimeout(async () => {
      const options = {
        chain: "mumbai",
        transaction_hash: hash,
      };

      const log = await Moralis.Web3API.native.getTransaction(options);

      txnLogs.push(log);
      if (
        hash ===
        "0xf3b610418be2703678bc27990ae0471e798e17af15420a1602649a71b6c02e2f"
      ) {
        console.log(txnLogs);
      }
    }, 200);
  });
}

// getNftsEvents();
getCollectionLogs();

// 1. Get last block from DB
// 2. Get last block from EVM
// 3. Search all NFTs transactions in DB-EVM blocks (use getNFTTransfersByBlock)
// 4. Filter them by token_address
