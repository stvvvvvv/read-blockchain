/* Moralis init code */
// REPLACE THE BELOW SERVER_URL and APP_ID with your own
const serverUrl = "https://kieicknnrdyw.usemoralis.com:2053/server";
const appId = "65FS5coueVO14m3yMci1PycbLpE6cbym1SgRJmht";
Moralis.start({ serverUrl, appId });

/* Authentication code */
async function login() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate({
      signingMessage: "Log in using Moralis",
    })
      .then(function (user) {
        console.log("logged in user:", user);
        let ethAddress = user.get("ethAddress");
        document.getElementById(
          "myethAddress"
        ).textContent = `Logged in Eth Address ${ethAddress}`;
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    let ethAddress = user.get("ethAddress");
    document.getElementById(
      "myethAddress"
    ).textContent = `Already Logged in ${ethAddress}`;
  }
}

async function logOut() {
  await Moralis.User.logOut();
  document.getElementById("myethAddress").textContent = "";
  console.log("logged out");
}

async function getAllTokenIds() {
  const options = {
    address: "0x6d523477782af01d036126ab923a720b94e93ce4",
    chain: "eth",
  };
  const NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
  console.log(NFTs);
}

async function getNfts() {
  const options = {
    address: "0x6d04e3fD90d1cb2Fa15dffb54d522a6C749Db382",
    token_id: "1",
    chain: "avalanche",
  };
  const tokenIdMetadata = await Moralis.Web3API.token.getTokenIdMetadata(
    options
  );
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;
document.getElementById("btn-get-nfts").onclick = getAllTokenIds;
