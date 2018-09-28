import React from 'react';
import { Jumbotron, Label, Row, Button } from 'reactstrap'

const WalletView = (props) => {
  const { pendingBalance, confirmedBalance, withdrawBalance, address } = props
  console.log(address)
  return (
    <Jumbotron style={style.background}>
      <Row style={{marginTop: 20}}>
        <Label style={style.label}>Address:</Label>
      </Row>
      <Row>
        <Label style={style.labelAddress}>{address}</Label>
      </Row>
      <Row>
        <Label style={style.label}>Pending Balance:</Label>
      </Row>
      <Row>
        <Label style={style.balance}>{pendingBalance} ETH</Label>
        <Button style={style.button} onClick={withdrawBalance}>Withdraw</Button>
      </Row>
      <Row style={{marginTop: 20}}>
        <Label style={style.label}>Confirmed Balance:</Label>
      </Row>
      <Row>
        <Label style={style.balance}>{confirmedBalance} ETH</Label>
      </Row>
    </Jumbotron>
  )
}

const style = {
  button: {
    marginRight: '20%',
    marginLeft: '20%',
    width: '40%',
    height: '70%',
    backgroundColor: '#851E00',
    color: '#ffff'
    },
  label: {
    fontSize: 24,
    textAlign: 'center',
    color: '#851E00',
  },
  labelAddress: {
    fontSize: 26,
    textAlign: 'center',
    color: '#000',
  },
  balance: {
    fontSize: 42,
    textAlign: 'center',
    color: 'black',
    fontStyle: 'bold',
  },
  background: {
    backgroundColor: '#FEF3D1'
  }
}

export default WalletView