import React, { Component } from 'react'
import { Container, Jumbotron, Col } from 'reactstrap'
import EtheriumClient from '../../models/EtheriumClient'
import OpenWalletForm from '../dumb/OpenWalletForm'

class OpenWallet extends Component {
  constructor(props) {
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this)
    this.decryptWallet = this.decryptWallet.bind(this)
    this.uploadJSONWallet = this.uploadJSONWallet.bind(this)
  }
  
  handleInputChange(evt) {
    const value = evt.target.value

    this.setState({
      password: value
    })
  }

  uploadJSONWallet(event) {
    const files = event.target.files
    const reader = new FileReader()

    if (files.length) {
      reader.readAsText(files[0])
    } else {
      throw new Error('Upload your JSON file')
    }
    reader.onload = function () {
      sessionStorage.setItem('jsonWallet', reader.result)
    }
  }

  async decryptWallet() {
    const jsonWallet = sessionStorage.getItem('jsonWallet')
    const decryptedWallet = await EtheriumClient.decryptWallet(jsonWallet, this.state.password)
    const balance = await EtheriumClient.getBalance(decryptedWallet.address)
    console.log(balance, 'BALANCE')
    console.log(decryptedWallet, 'decrypted wallet')
  }

  render() {
    return (
      <Container>
        <Col sm={12} xs={12} md={{ size: 8, offset: 2 }}>
          <Jumbotron style={{ marginTop: 50}}>
            <OpenWalletForm
              handleInputChange={this.handleInputChange}
              decryptWallet={this.decryptWallet}
              uploadJSONWallet={this.uploadJSONWallet}
              
            />
          </Jumbotron>
        </Col>    
      </Container>
    )
  }
}

export default OpenWallet
