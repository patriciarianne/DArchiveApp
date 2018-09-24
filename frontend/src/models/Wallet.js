import { provider, ethers } from '../../helpers/ethersConfig'

class Wallet {
  constructor(privateKey) {
    if (privateKey) {
      this.walletData = new ethers.Wallet(privateKey)
    } else {
      this.walletData = new ethers.Wallet.createRandom()
    }
  }

  async getBalance(address) {
    const initialBal = await provider.getBalance(address)
    let etherBalance = ethers.utils.formatEther(initialBal);
    return etherBalance
  }
}

export default Wallet