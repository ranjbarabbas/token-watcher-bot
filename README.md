# ERC20 Token Watcher Bot

A minimal and safe automation bot that monitors an address for incoming ERC-20 tokens and, once detected:

1. Sends enough native tokens (ETH, etc.) from a relayer account to cover gas fees.
2. Forwards the received ERC-20 tokens to a specified destination address.

This tool is intended only for authorized and legitimate use. Users are fully responsible for private-key security and compliance.

## Configuration

Create a `.env` file:

WATCHED_ACCOUNT = 

WATCHED_PRIVATE_KEY = 

FUNDER_ACCOUNT= 

FUNDER_PRIVATE_KEY= 

RECEIVER_ACCOUNT = 

API_URL = "https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY"

TOKEN_ADDRESS = 

## Usage

npm install

# start the service
pm2 start tokenWatcher.js --name token-watcher

# stop all services
pm2 stop all

pm2 log

## Security Notes

- Never commit private keys or sensitive data.
- Use only with accounts you own.
- For production, consider using secure key storage (vault/HSM).
