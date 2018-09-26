import React from 'react'
import { Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';

const  OpenWalletForm = (props) => {
  const { handleInputChange, decryptWallet, uploadJSONWallet } = props
  return (
    <Form>
    <FormGroup>
      <Row>
        <Label style={{ fontSize: 40, textAlign: 'center', margin: 10}}>Open Existing Wallet</Label>
      </Row>
      <Row>
        <Label style={{ fontSize: 20}}>Upload Wallet JSON File</Label>
      </Row>
      <Row>
        <input type="file" name="uploadWallet" accept="application/json" />
        </Row>
      <Row>
        <Label style={{ fontSize: 20, marginTop: 20}}>Password</Label>
        <Input type="password" name="password" onChange={(text) => handleInputChange(text)}/>
      </Row>
      <Row style={{ marginTop: 20}}>
        <Button onClick={decryptWallet}>Open</Button>
      </Row>
    </FormGroup>
  </Form>
  )
}

export default OpenWalletForm
