import React, { Component } from 'react'
import { Container } from 'reactstrap'
import WalletView from '../dumb/WalletView'

class Wallet extends Component {
  render() {
    return (
      <Container>
        <WalletView 
          wallet={{balance: 10}}
        />
      </Container>
    )
  }
}

export default Wallet
