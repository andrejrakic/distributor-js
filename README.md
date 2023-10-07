## Distributor

The script used to transfer Arbitrum Goerli ETH and Arbitrum Goerli USDC to SmartCon 23 Hacker House GMX <> Low-latency Oracles workshop, written in JavaScript. The version of this script written in Go is available at https://github.com/andrejrakic/distributor-go

## Getting Started

1) Install packages

```
npm install
```

2) Populate the `addresses.csv` files with addresses to fund. Each address must be in a new row, for example:

```
0x0000000000000000000000000000000000000001
0x0000000000000000000000000000000000000002
0x0000000000000000000000000000000000000003
```

3) Create the `.env` file and fill it with your private key and JSON RPC URL for Arbitrum Goerli

```
RPC_URL=
PRIVATE_KEY=
```

4) Run the script

```
node distributor.js
```
