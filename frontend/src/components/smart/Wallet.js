import React, { Component } from 'react'
import { Container, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap'
import WalletView from '../dumb/WalletView'
import { getWallet, getBalance } from '../../helpers/libraryContract'
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
    const wallet = await getWallet(password)
    const pendingBalanceVal = await getBalance(wallet)
    const pendingBalance = ethers.utils.formatEther(pendingBalanceVal)
    const confirmedBalance = await EtheriumClient.getBalance(wallet.address)
    console.log('PENDING', pendingBalance)
    console.log('CONFIRMED', confirmedBalance)
    this.setState({ pendingBalance, confirmedBalance })
  }

  render() {
    const { openModal, pendingBalance, confirmedBalance, password } = this.state 
    return (
      <Container>
        <WalletView 
          pendingBalance={pendingBalance}
          confirmedBalance={confirmedBalance}
        />
        <Modal isOpen={openModal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Wallet Password</ModalHeader>
          <ModalBody>
            <Input type="password" name="password" id="password" value={this.state.password} onChange={(text) => this.handleInputChange(text)}/>
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
