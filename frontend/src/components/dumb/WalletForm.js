import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const WalletForm = (props) => {
  return (
    <Form>
      <FormGroup>
          <Label>Create Wallet</Label>
          <Button onClick={props.generateWallet}>Generate Wallet</Button>
          <Label>Encrypt Wallet</Label>
          <Button onClick={props.encryptWallet}>Encrypt Wallet</Button>
          <Label>Save Wallet as JSON</Label>
          <Button onClick={props.saveJsonWallet}>Save Wallet</Button>
          
        </FormGroup>
    </Form>
  )
}

export default WalletForm