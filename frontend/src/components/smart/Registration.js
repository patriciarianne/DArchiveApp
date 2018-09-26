import React, { Component } from 'react'
import { Container, Button, Jumbotron, Col } from 'reactstrap'
import { firebase, collection } from '../../firebase'

import UserForm from '../dumb/UserForm'

class Registration extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }

  handleInputChange(event) {
    const { id, value } = event.target
    this.setState({
      [id]: value
    })
  }

  async handleRegister() {
    const  { name, email, password, confirmPassword} = this.state
    if (password != confirmPassword) {
      throw new Error('Passwords does not match')
    }
    console.log(email, password)
    const result = await firebase.auth().createUserWithEmailAndPassword(email, password)
    await collection('users').doc(result.user.uid).set({
      name
    })
  }

  render() {
    return (
      <Container>
        <Col sm={8} xs={12} md={{ size: 8, offset: 2 }}>
          <Jumbotron style={{marginTop: 20}}>
            <UserForm 
              handleInputChange={this.handleInputChange}
              isRegistration={true}
              values={this.state}
            />
            <Button style={buttonStyle} onClick={this.handleRegister}>Register</Button>
          </Jumbotron>
        </Col>
      </Container>
    )
  }
}

const buttonStyle = {
  marginRight: '20%',
  marginLeft: '20%',
  width: '60%',
  backgroundColor: '#851E00',
  color: '#ffff'
}


export default Registration
