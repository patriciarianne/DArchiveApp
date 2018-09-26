import React, { Component } from 'react'
import { Container, Jumbotron, Col } from 'reactstrap'
import { saveAs } from 'file-saver'
import EtheriumClient from '../../models/EtheriumClient'

import WalletForm from '../dumb/WalletForm'

class CreateWallet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wallet: null,
      password: null,
      isGenerated: false,
    }

    this.generateWallet = this.generateWallet.bind(this)
    this.saveJsonWallet = this.saveJsonWallet.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  async generateWallet() {
    const client = new EtheriumClient()
    const { password } = this.state
    try {
      await client.generateWallet()
    } catch (error) {
      console.log(error, 'generate wallet')
    }
    try {
      const jsonWallet = await EtheriumClient.encryptWallet(client.wallet, password)
      sessionStorage.setItem('jsonWallet', jsonWallet)
      this.setState({isGenerated: true})
    } catch (error) {
      console.log(error, 'encrypt wallet')
    }
  }

  saveJsonWallet() {
    const jsonWallet = sessionStorage.getItem('jsonWallet')
    const blob = new Blob([jsonWallet], { type:'application/json' })
    console.log(blob)
    saveAs(blob, 'YourWallet.json')
  }

  handleInputChange(evt) {
    const value = evt.target.value

    this.setState({
      password: value
    })
  }

  render() {
    return (
      <Container>
        <Col sm={12} xs={12} md={{ size: 8, offset: 2 }}>
          <Jumbotron style={{ marginTop: 50}}>
            <WalletForm
                generateWallet={this.generateWallet}
                saveJsonWallet={this.saveJsonWallet}
                isGenerated={this.state.isGenerated}
                handleInputChange={this.handleInputChange}
              />
          </Jumbotron>
        </Col>  
      </Container>
    )
  }
}

export default CreateWallet