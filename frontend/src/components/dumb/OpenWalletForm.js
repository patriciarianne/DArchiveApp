import React from 'react'
import { Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';

const  OpenWalletForm = (props) => {
  const { handleInputChange, uploadJSONWallet } = props
  return (
    <Form>
    <FormGroup>
      <Row>
        <Label style={{ fontSize: 32, textAlign: 'center', margin: 10}}>Open Existing Wallet</Label>
      </Row>
      <Row>
        <Label style={{ fontSize: 16}}>Upload Wallet JSON File</Label>
      </Row>
      <Row>
        <input type="file" name="uploadWallet" accept="application/json" onChange={uploadJSONWallet}/>
        </Row>
      <Row>
        <Label style={{ fontSize: 16, marginTop: 20}}>Password</Label>
        <Input type="password" name="openWalletPassword" id="openWalletPassword" onChange={(text) => handleInputChange(text)}/>
      </Row>
    </FormGroup>
  </Form>
  )
}

export default OpenWalletForm
