import React, { Component } from 'react'
import { Container, Jumbotron, Button, Col } from 'reactstrap'


import UserForm from '../dumb/UserForm'
class Home extends Component {

  // async decryptWallet() {
  //   const jsonWallet = sessionStorage.getItem('jsonWallet')
  //   const decryptedWallet = await EtheriumClient.decryptWallet(jsonWallet, 'pass')
  //   const balance = await EtheriumClient.getBalance(decryptedWallet.address)
  //   console.log(balance, 'BALANCE')
  //   console.log(decryptedWallet, 'decrypted wallet')
  // }

  // uploadJSONWallet(event) {
  //   const files = event.target.files
  //   const reader = new FileReader()

  //   if (files.length) {
  //     reader.readAsText(files[0])
  //   }
  //   reader.onload = function () {
  //     console.log(reader.result)
  //     sessionStorage.setItem('jsonWallet', reader.result)
  //   }
  // }
  render() {
    return (
      <Container>
        <Col sm={8} xs={12} md={{ size: 8, offset: 2 }}>
          <Jumbotron>
            <UserForm />
            <Button onClick={this.decryptWallet}>decryptWallet</Button>
            
            <input type="file" onChange={this.test} />
          </Jumbotron>
        </Col>
      </Container>
    )
  }
}

export default Home
