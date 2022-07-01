require("dotenv").config();
const Moralis = require("moralis/node");

const serverUrl = process.env.SERVER_URL;
const appId = process.env.APP_ID;
const masterKey = process.env.MASTER_KEY;

async function getNftsEvents() {
  await Moralis.start({ serverUrl, appId, masterKey });

  const CONTRACT_ADDRESS = "0x2d3392582b8e582d7cdfe3cb0eddfe32c06a7776";
  const LAST_BLOCK = "26956033";
  
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

getCollectionLogs()