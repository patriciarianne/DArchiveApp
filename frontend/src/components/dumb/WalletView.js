import React from 'react';
import { Jumbotron, Label, Row, Button } from 'reactstrap'

const WalletView = (props) => {
  const { pendingBalance, confirmedBalance } = props
  return (
    <Jumbotron style={style.background}>
      <Row>
        <Label style={style.label}>Pending Balance:</Label>
      </Row>
      <Row>
        <Label style={style.balance}>{pendingBalance.toFixed(2)} ETH</Label>
      </Row>
      <Row>
        <Button style={style.button}>Withdraw</Button>
      </Row>
      <Row style={{marginTop: 20}}>
        <Label style={style.label}>Confirmed Balance:</Label>
      </Row>
      <Row>
        <Label style={style.balance}>{confirmedBalance.toFixed(2)} ETH</Label>
      </Row>
    </Jumbotron>
  )
}

const style = {
  button: {
    marginRight: '20%',
    marginLeft: '20%',
    width: '60%',
    backgroundColor: '#851E00',
    color: '#ffff'
    },
  label: {
    fontSize: 24,
    textAlign: 'center',
    color: '#851E00',
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