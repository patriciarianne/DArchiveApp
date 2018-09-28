import React from 'react';
import { Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';

const WalletForm = (props) => {
  const { isGenerated, handleInputChange, saveJsonWallet, generateWallet } = props
  const downloadJson = (isGenerated) ? (
    <div>
      <Label style={{ margin: 15 }}>Save Wallet as JSON file</Label>
      <Button onClick={saveJsonWallet}>Download</Button>
    </div>
  ) : null
  return (
    <Form>
      <FormGroup>
        <Row>
          <Label style={{ fontSize: 32, textAlign: 'center', margin: 10}}>Create New Wallet</Label>
        </Row>
        <Row>
          <Label style={{ fontSize: 16}}>Password</Label>
          <Input type="password" name="walletCreatePassword" id="walletCreatePassword" onChange={(text) => handleInputChange(text)}/>
        </Row>
        <Row style={{ marginTop: 16}}>
          <Button onClick={generateWallet}>Generate Wallet</Button>
        </Row>
        <Row style={{ marginTop: 16}}>
          {downloadJson}
        </Row>
      </FormGroup>
    </Form>
  )
}

export default WalletForm