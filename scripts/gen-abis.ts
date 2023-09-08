const fs = require('fs')
const { execSync } = require('child_process')

const abis = fs.readdirSync("./abis");

for (const abi of abis) {
  execSync(`npx squid-evm-typegen ./src/abis ./abis/${abi}`)
}
