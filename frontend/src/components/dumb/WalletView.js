import React from 'react';
import { Jumbotron, Label, Row, Button } from 'reactstrap'

const WalletView = (props) => {
  const { wallet } = props
  const style = {
    button: {
      marginRight: '20%',
      marginLeft: '20%',
      width: '60%',
      backgroundColor: '#851E00',
      color: '#ffff'
      },
    label: {
      fontSize: 28,
      textAlign: 'center',
      color: '#851E00',
    },
    balance: {
      fontSize: 50,
      textAlign: 'center',
      color: 'black',
      fontStyle: 'bold',
    },
    background: {
      backgroundColor: '#FEF3D1'
    }

  }
  
  return (
    <Jumbotron style={style.background}>
      <Row>
        <Label style={style.label}>Balance:</Label>
      </Row>
      <Row>
        <Label style={style.balance}>{wallet.balance}</Label>
      </Row>
      <Row>
        <Button style={style.button}>Withdraw</Button>
      </Row>
    </Jumbotron>
  )
}

export default WalletView