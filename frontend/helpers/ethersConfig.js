import ethers from 'ethers'

const providers = ethers.providers
const network = providers.networks.ropsten
const provider = new providers.InfuraProvider(network)

export { provider, ethers }