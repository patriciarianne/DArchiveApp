import { provider, ethers } from '../helpers/ethersConfig'
import Wallet from './Wallet'

class EtheriumClient {
  constructor() {
    this.wallet = null
  }

  static async encryptWallet(wallet, password) {
    return await wallet.encrypt(password)
  }

  static async decryptWallet(jsonWallet, password) {
    return await ethers.Wallet.fromEncryptedWallet(jsonWallet, password)
  }

  async generateWallet() {
    this.wallet = new Wallet().walletData
  }
  
  static async getBalance(address) {
    const initialBal = await provider.getBalance(address)
    let etherBalance = ethers.utils.formatEther(initialBal);
    return etherBalance
  }
}

export default EtheriumClient