

# ethereum-solidity-lottery
Lottery on blockchain.

This example was deployed to Goerli Test Network, can check the contract on <code></code>

Frameworks used:
* mocha ( to unit test ) [] [https://mochajs.org/](https://mochajs.org/)
* ganache ( local private network ) https://trufflesuite.com/ganache/](https://trufflesuite.com/ganache/)
* truffle ( to deploy, test and debug ) [https://trufflesuite.com/](https://trufflesuite.com/)
* web3 ( communicate with blockchain ) [https://web3js.readthedocs.io/en/v1.8.0/](https://web3js.readthedocs.io/en/v1.8.0/)
* Infura service [https://infura.io/](https://infura.io/)

Installation:
```
npm install
```
Setup <code>.env</code> file with the follows vars:
```
SEED_PHRASE='<seed_phrase>'
INFURA_URL='URL'
```

Deploy:
```
node ./deploy.js
```

Tests:
```
npm run test
```
