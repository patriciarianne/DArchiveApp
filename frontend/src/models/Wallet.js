import { provider, ethers } from '../helpers/ethersConfig'

class Wallet {
  constructor(privateKey) {
    if (privateKey) {
      this.walletData = new ethers.Wallet(privateKey)
    } else {
      this.walletData = new ethers.Wallet.createRandom()
    }
  }
}

export default Wallet