import React, { Component } from 'react'
import { Container, Jumbotron, Button, Col } from 'reactstrap'
import { saveAs } from 'file-saver'
import EtheriumClient from '../../models/EtheriumClient'

import UserForm from '../dumb/UserForm'
import WalletForm from '../dumb/WalletForm'
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wallet: null,
      password: null,
    }

    this.generateWallet = this.generateWallet.bind(this)
    this.encryptWallet = this.encryptWallet.bind(this)
    this.saveJsonWallet = this.saveJsonWallet.bind(this)
    this.test = this.test.bind(this)
    this.decryptWallet = this.decryptWallet.bind(this)
  }

  async generateWallet() {
    const client = new EtheriumClient()
    await client.generateWallet()
    console.log(client.wallet, 'WALLET')
    this.setState({ wallet: client.wallet })
  }

  async encryptWallet() {
    const jsonWallet = await EtheriumClient.encryptWallet(this.state.wallet, 'pass')
    sessionStorage.setItem('jsonWallet', jsonWallet)
    console.log(jsonWallet)
  }

  saveJsonWallet() {
    const jsonWallet = sessionStorage.getItem('jsonWallet')
    const blob = new Blob([jsonWallet], { type:'application/json' })
    // console.log(blob)
    saveAs(blob, 'wallet.json')
  }

  async decryptWallet() {
    const jsonWallet = sessionStorage.getItem('jsonWallet')
    const decryptedWallet = await EtheriumClient.decryptWallet(jsonWallet, 'pass')
    const balance = await EtheriumClient.getBalance(decryptedWallet.address)
    console.log(balance, 'BALANCE')
    console.log(decryptedWallet, 'decrypted wallet')
  }

  test(event) {
    const files = event.target.files
    const reader = new FileReader()

    if (files.length) {
      reader.readAsText(files[0])
    }
    reader.onload = function () {
      console.log(reader.result)
      sessionStorage.setItem('jsonWallet', reader.result)
    }
  }

  render() {
    return (
      <Container>
        <Col sm={8} xs={12} md={{ size: 8, offset: 2 }}>
          <Jumbotron>
            <UserForm />
            <Button onClick={this.decryptWallet}>decryptWallet</Button>
            <WalletForm
              generateWallet={this.generateWallet}
              encryptWallet={this.encryptWallet}
              saveJsonWallet={this.saveJsonWallet}
            />
            <input type="file" onChange={this.test} />
          </Jumbotron>
        </Col>
      </Container>
    )
  }
}

export default Home
