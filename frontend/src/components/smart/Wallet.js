import React, { Component } from 'react'
import { Container, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap'
import WalletView from '../dumb/WalletView'
import { getWallet, getBalance, withdrawBalance } from '../../helpers/libraryContract'
import EtheriumClient from '../../models/EtheriumClient'
import ethers from 'ethers'

class Wallet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openModal: true,
      pendingBalance: 0,
      confirmedBalance: 0
    }

    this.toggle = this.toggle.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.getBalances = this.getBalances.bind(this)
    this.withdrawBalance = this.withdrawBalance.bind(this)
  }

  toggle() {
    this.setState({
      openModal: !this.state.openModal
    })
  }

  handleInputChange(event) {
    const { id, value } = event.target
    this.setState({
      [id]: value
    })
  }

  async getBalances() {
    const { password } = this.state
    let pendingBalance = 0
    let confirmedBalance = 0
    const wallet = await getWallet(password)
    const pendingBalanceVal = await getBalance(wallet)
    
    pendingBalance = ethers.utils.formatEther(pendingBalanceVal)
    confirmedBalance = await EtheriumClient.getBalance(wallet.address)

    this.setState({ pendingBalance, confirmedBalance, openModal: !this.state.openModal, wallet, address: wallet.address })
  }

  async withdrawBalance() {
    try {
      const result = await withdrawBalance(this.state.wallet)
      console.log(result, 'Withdraw')
      window.location.reload(true) 
    } catch (error) {
      throw new Error(error)
    }
  }

  render() {
    const { openModal, pendingBalance, confirmedBalance, password, address } = this.state 
    return (
      <Container>
        <WalletView 
          pendingBalance={pendingBalance}
          confirmedBalance={confirmedBalance}
          withdrawBalance={this.withdrawBalance}
          address={address}
        />
        <Modal isOpen={openModal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Wallet Password</ModalHeader>
          <ModalBody>
            <Input type="password" name="password" id="password" value={password} onChange={(text) => this.handleInputChange(text)}/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.getBalances}>Continue</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Container>
    )
  }
}

export default Wallet
