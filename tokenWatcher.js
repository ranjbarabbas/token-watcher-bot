const { ethers } = require("ethers");
require("dotenv").config();
const logger = require("./logger");

const {
  WATCHED_ACCOUNT,
  WATCHED_PRIVATE_KEY,
  FOUNDER_PRIVATE_KEY,
  FOUNDER_ACCOUNT,
  RECEIVER_ACCOUNT,
  API_URL,
  TOKEN_ADDRESS,
} = process.env;

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)"
];

let token;
let watched_wallet;
let founder_wallet;
let decimal = 18;

async function init() {
  const provider = new ethers.JsonRpcProvider(API_URL);

  watched_wallet = new ethers.Wallet(WATCHED_PRIVATE_KEY, provider);
  founder_wallet = new ethers.Wallet(FOUNDER_PRIVATE_KEY, provider);
  token = new ethers.Contract(TOKEN_ADDRESS, ERC20_ABI, watched_wallet);
  const initialBalance = await token.balanceOf(WATCHED_ACCOUNT);
  logger.info(`Initial balance: ${ethers.formatUnits(initialBalance, decimal)} tokens`);
  // listenToTransfers();
}
init()
// function listenToTransfers() {
//   token.on("Transfer", async (from, to, value) => {
//     if (to.toLowerCase() !== WATCHED_ACCOUNT.toLowerCase()) return;

//     logger.info(`Incoming ${ethers.formatUnits(value, decimal)} tokens to ${WATCHED_ACCOUNT}`);
    
//     try {
//       const currentBalance = await token.balanceOf(WATCHED_ACCOUNT);

//       logger.info(`Balance increased to ${ethers.formatUnits(currentBalance, decimal)}. Preparing transfer...`);
//       await transferGasFunds("0.01");
//       await attemptTransferWithRetry(currentBalance, 3);

//     } catch (err) {
//       logger.error(`Fatal error before transfer: ${err.message}`);
//     }
//   });

//   logger.info("Listening for incoming token transfers...");
// }

// async function transferGasFunds(minimumMatic = "0.01") {
//   const required = ethers.parseEther(minimumMatic);

//     try {
//       const tx = await founder_wallet.sendTransaction({
//         to: WATCHED_ACCOUNT,
//         value: required
//       });
//       logger.info(`Gas top-up sent. Tx Hash: ${tx.hash}`);
//       await tx.wait();
//       logger.info("⚡ Gas transfer confirmed.");
//     } catch (err) {
//       logger.error(`Failed to send gas: ${err.message}`);
//       throw new Error("Failed to send MATIC for gas.");
//     }
// }


// async function attemptTransferWithRetry(amount, maxRetries = 3) {
//   let attempt = 0;
//   while (attempt < maxRetries) {
//     try {
//       logger.info(`[TRY #${attempt + 1}] Sending ${ethers.formatUnits(amount, decimal)} tokens to ${RECEIVER_ACCOUNT}...`);
//       const tx = await token.transfer(RECEIVER_ACCOUNT, amount);
//       logger.info(`Transaction sent. Hash: ${tx.hash}`);

//       await tx.wait();
//       logger.info(`✅ Transfer confirmed.`);
//       return;

//     } catch (err) {
//       attempt++;
//       logger.error(`❌ Attempt ${attempt} failed: ${err.message}`);
//       if (attempt < maxRetries) {
//         const waitTime = 1000 * Math.pow(2, attempt); // Exponential backoff
//         logger.info(`⏳ Retrying in ${waitTime / 1000} seconds...`);
//         await new Promise(res => setTimeout(res, waitTime));
//       } else {
//         logger.error(`🚫 Max retries reached. Transfer failed permanently.`);
//       }
//     }
//   }
// }


// // Auto-reconnect (optional)
// process.on("uncaughtException", (err) => {
//   logger.error(`Uncaught exception: ${err.message}`);
//   process.exit(1);
// });

// process.on("unhandledRejection", (err) => {
//   logger.error(`Unhandled rejection: ${err.message}`);
//   process.exit(1);
// });

// init().catch((err) => {
//   logger.error(`Initialization failed: ${err.message}`);
//   process.exit(1);
// });
