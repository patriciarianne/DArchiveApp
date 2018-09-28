import React, { Component } from 'react'
import { Container, Button, Jumbotron, Col, Dropdown, Row, Label, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap'
import { saveAs } from 'file-saver'
import EtheriumClient from '../../models/EtheriumClient'
import { firebase, collection } from '../../firebase'

import UserForm from '../dumb/UserForm'
import WalletForm from '../dumb/WalletForm'
import OpenWalletForm from '../dumb/OpenWalletForm'

class Registration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdownOpen: false, 
      isCreate: true,
    }
    this.generateWallet = this.generateWallet.bind(this)
    this.saveJsonWallet = this.saveJsonWallet.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.toggle = this.toggle.bind(this);
    this.chooseWallet = this.chooseWallet.bind(this);
    this.uploadJSONWallet = this.uploadJSONWallet.bind(this)
  }

  async handleRegister() {
    const  { name, email, password, confirmPassword, jsonWallet} = this.state
    if (password !== confirmPassword) {
      throw new Error('Passwords does not match')
    }
    const result = await firebase.auth().createUserWithEmailAndPassword(email, password)
    await collection('users').doc(result.user.uid).set({
      name,
      jsonWallet
    })
  }

  async generateWallet() {
    const client = new EtheriumClient()
    const { walletCreatePassword } = this.state
    try {
      await client.generateWallet()
    } catch (error) {
      console.log(error, 'generate wallet')
    }
    try {
      const jsonWallet = await EtheriumClient.encryptWallet(client.wallet, walletCreatePassword)
      // sessionStorage.setItem('jsonWallet', jsonWallet)
      this.setState({isGenerated: true, jsonWallet})
    } catch (error) {
      console.log(error, 'encrypt wallet')
    }
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  saveJsonWallet() {
    const jsonWallet = sessionStorage.getItem('jsonWallet')
    const blob = new Blob([jsonWallet], { type:'application/json' })
    saveAs(blob, 'YourWallet.json')
  }

  handleInputChange(event) {
    const { id, value } = event.target
    this.setState({
      [id]: value
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

    reader.onload = () => {
      this.setState({jsonWallet: reader.result})
    }
  }

  chooseWallet(isCreate) {
    this.setState({
      isCreate
    })
  }

  render() {
    const form = this.state.isCreate ? (
      <WalletForm
        generateWallet={this.generateWallet}
        saveJsonWallet={this.saveJsonWallet}
        isGenerated={this.state.isGenerated}
        handleInputChange={this.handleInputChange}
    />
    ) : (
      <OpenWalletForm
        handleInputChange={this.handleInputChange}
        uploadJSONWallet={this.uploadJSONWallet}
      />
    )

    return (
      <Container>
        <Col sm={8} xs={12} md={{ size: 8, offset: 2 }}>
          <Jumbotron style={{backgroundColor: '#FEF3D1', marginTop: 20}}>
            <Label style={style.label}>User Details</Label>
            <UserForm 
              handleInputChange={this.handleInputChange}
              isRegistration={true}
              values={this.state}
            />
            <Row>
              <Label style={style.walletLabel}>Choose to open wallet</Label>
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle style={{backgroundColor: '#851E00', fontColor: '#fff'}} caret>
                  Wallet
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => this.chooseWallet(true)}>Create wallet</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => this.chooseWallet(false)}>Import existing wallet</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Row>
            <div style={{border: "thin solid #851E00"}} />
            <div style={{margin: 15}}>
              {form}
            </div>
            <div style={{border: "thin solid #851E00"}} />
            <Button style={style.button} onClick={this.handleRegister}>Register</Button>
          </Jumbotron>
        </Col>
      </Container>
    )
  }
}

const style = {
  button: {
    marginRight: '20%',
    marginLeft: '20%',
    width: '60%',
    backgroundColor: '#851E00',
    color: '#ffff',
    marginTop: 20
  },
  label: {
    fontSize: 40,
    fontStyle: 'bold',
    alignContent: 'center',
    color: '#851E00',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  walletLabel: {
    fontSize: 24,
    paddingLeft: 15,
    paddingRight: 15,
    fontStyle: 'bold',
    color: '#851E00'
  }
}
export default Registration
