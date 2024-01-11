# Welcome to nft-app 👋

![Version](https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![Twitter: jellydn](https://img.shields.io/twitter/follow/jellydn.svg?style=social)](https://twitter.com/jellydn)

> How to create your own NFT token

## 🏠 [Homepage](https://nft-app.productsway.com)

[![Blockchain - DApp 101 - Create your own NFT token](https://img.youtube.com/vi/_veIZBaHkSk/0.jpg)](https://www.youtube.com/watch?v=_veIZBaHkSk)

[![Blockchain - DApp 101 - Mint a NFT token](https://img.youtube.com/vi/UWJJa1hAYlo/0.jpg)](https://www.youtube.com/watch?v=UWJJa1hAYlo)

## ✨ [Demo](https://nft-app.productsway.com/)

![https://gyazo.com/fccacc5f480839196343bf95728c9b6a.gif](https://gyazo.com/fccacc5f480839196343bf95728c9b6a.gif)

## Screenshot

![screenshot1.png](./screenshot1.png)

![screenshot2.png](./screenshot2.png)

## Features

- ⚡️ React TypeScript template with [Vite 5](https://vitejs.dev/)
- 📦 [Hardhat](https://hardhat.org/) - Ethereum development environment for professionals
- 🦾 [TypeChain Hardhat plugin](https://github.com/ethereum-ts/TypeChain/tree/master/packages/hardhat) - Automatically generate TypeScript bindings for smartcontracts while using Hardhat.
- 🔥 [web3-react](https://github.com/NoahZinsmeister/web3-react/) - A simple, maximally extensible, dependency minimized framework for building modern Ethereum dApps
- 🎨 [daisyUI Tailwind CSS Components](https://daisyui.com/) - clean HTML with component classes
- 🎨 [OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/) - standard for secure blockchain applications

## Install

```sh
yarn install
```

## Usage

### Run Web App

```sh
# Prepare .env file
# Run web site
cp .env.example .env
npx hardhat compile --network localhost
yarn dev

```

### Run API App

```sh
# Prepare .env file
# Run web site
cd server
cp .env.example .env
yarn install
yarn dev

```

## Run tests

```sh
yarn test
```

## Deploy NFT to Rinkeby

- Sign up and earn [$100 in credit](https://alchemy.com/?r=9ae3d9f1-56c4-476e-9f7e-23387e0e166a) on alchemy. More detail [here](https://docs.alchemy.com/alchemy/introduction/referral-program).

- Send some ETH to your wallet https://faucet.dimensions.network/

This example, we will deploy to Rinkeby network. If you do not have `hardhat` [shorthand](https://hardhat.org/guides/shorthand.html), then please run

```sh
npm i -g hardhat-shorthand
hardhat-completion install
```

1.Deploy MyAwesomeLogo to Rinkeby

```sh
hh run scripts/deploy.ts --network rinkeby
```

Output:

```sh
Generating typings for: 0 artifacts in dir: src/types for target: ethers-v5
Successfully generated 3 typings!
Successfully generated 3 typings for external artifacts!
MyAwesomeLogo deployed to: 0x39a5079afE9F3e3bB4db1B943e2063AC3dc87251
owner 0x096cd10D7BEF8D5923b18b18E9f79CA230ee2285
```

2. Mint some NFT tokens

```sh
hh run scripts/mint.ts --network rinkeby
```

Output:

```sh
Generating typings for: 0 artifacts in dir: src/types for target: ethers-v5
Successfully generated 3 typings!
Successfully generated 3 typings for external artifacts!
MyAwesomeLogo deployed to: 0x39a5079afE9F3e3bB4db1B943e2063AC3dc87251
Name MyAwesomeLogo
Symbol MAL
Uploaded file to nft storage Token {
  ipnft: 'bafyreib22oziqft7cbakshc374mwctwiprzyj24ufpeogkjff3lroumcru',
  url: 'ipfs://bafyreib22oziqft7cbakshc374mwctwiprzyj24ufpeogkjff3lroumcru/metadata.json'
}
Minted NFT 0x0aad3903cb8d11f095babdc7ba47963ad6235b0a3cd5d32ee42560798816235a
Uploaded file to nft storage Token {
  ipnft: 'bafyreid3gvwkltwkgvpxur3eozuh6dirfg2ohqizhn4rpn764dji272aoe',
  url: 'ipfs://bafyreid3gvwkltwkgvpxur3eozuh6dirfg2ohqizhn4rpn764dji272aoe/metadata.json'
}
Minted NFT 0xe1ed7be02639310cf101b495e55d27421be018cc12cd90d1f46547c627b5132c
Uploaded file to nft storage Token {
  ipnft: 'bafyreieealfw66zppxhkivuti5qkmsuihjxgxgrxdfm2o5p4qna5l347bu',
  url: 'ipfs://bafyreieealfw66zppxhkivuti5qkmsuihjxgxgrxdfm2o5p4qna5l347bu/metadata.json'
}
Minted NFT 0x183af6b95464305aa5f9f0ed97a5b8847bd168bbb28e3f6368d04662a44cb8fc
```

3.Verify with etherscan.io

```sh
hh verify --network rinkeby 0x39a5079afE9F3e3bB4db1B943e2063AC3dc87251
```

Output:

```sh
Nothing to compile
Generating typings for: 0 artifacts in dir: src/types for target: ethers-v5
Successfully generated 3 typings!
Successfully generated 3 typings for external artifacts!
Compiling 1 file with 0.8.4
Successfully submitted source code for contract
contracts/MyAwesomeLogo.sol:MyAwesomeLogo at 0x39a5079afE9F3e3bB4db1B943e2063AC3dc87251
for verification on Etherscan. Waiting for verification result...

Successfully verified contract MyAwesomeLogo on Etherscan.
https://rinkeby.etherscan.io/address/0x39a5079afE9F3e3bB4db1B943e2063AC3dc87251#code
```

## Hardhat guideline

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile --network localhost
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy_greeter.js --network localhost
node scripts/deploy.js
npx eslint '**/*.js'
npx eslint '**/*.js' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

## Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
npx hardhat run --network ropsten scripts/deploy_greeter.js
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

## Contract upgrade

OpenZeppelin provides tooling for deploying and securing [upgradeable smart contracts](https://docs.openzeppelin.com/learn/upgrading-smart-contracts).

Smart contracts deployed using OpenZeppelin Upgrades Plugins can be upgraded to modify their code, while preserving their address, state, and balance. This allows you to iteratively add new features to your project, or fix any bugs you may find in production.

In this project, there are a 2 versions of contract: Box and BoxV2 which is improvement of Box. First deploy your contract:

```shell
npx hardhat run --network localhost scripts/deploy_upgradeable_box.js
```

Then, deploy the upgrade smart contract

```shell
npx hardhat run --network localhost scripts/upgrade_box.js
```

## Examples

- [Simple Store App](https://github.com/jellydn/nft-app/pull/20): counter-like smart contract, read/write value and listen to event from smart contract.
- [ICO Token App](https://github.com/jellydn/dapp-token-ico): How to create An ERC20 token and implement ICO smart contract (CrowdSale).

## One click deployment

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/6ZY4MT?referralCode=-GINmA)

## Author

👤 **Dung Huynh**

- Website: https://productsway.com/
- Twitter: [@jellydn](https://twitter.com/jellydn)
- Github: [@jellydn](https://github.com/jellydn)

## Stargazers 🌟

[![kofi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/dunghd)
[![paypal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/dunghd)
[![buymeacoffee](https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/dunghd)

[![Stargazers repo roster for jellydn/nft-app](https://reporoster.com/stars/jellydn/nft-app)](https://github.com/jellydn/nft-app/stargazers)

## Show your support

Give a ⭐️ if this project helped you!
