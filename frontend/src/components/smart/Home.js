import React, { Component } from 'react'
import { Container, Jumbotron, Button, Col, Label } from 'reactstrap'
import UserForm from '../dumb/UserForm'

import { firebase, collection} from '../../firebase'
import { Link, withRouter } from 'react-router-dom';

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.redirectToLibrary = this.redirectToLibrary.bind(this)
  }

  handleInputChange(event) {
    const { id, value } = event.target
    this.setState({
      [id]: value
    })
  }

  async handleLogin() {
    const { email, password } = this.state
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      this.redirectToLibrary()
    } catch (error) {
      throw new Error('User does not exist')
    }
  }

  redirectToLibrary() {
    this.props.history.push('/library')
  }

  render() {
    return (
      <Container>
        <Col sm={8} xs={12} md={{ size: 8, offset: 2 }}>
          <Jumbotron style={{marginTop: 20}}>
            <UserForm 
              handleInputChange={this.handleInputChange}
              values={this.state}
            />
            <Button style={buttonStyle} onClick={this.handleLogin}>Login</Button>
            <div style={{textAlign:'center', marginTop: 20, color: '#851E00'}}>
              <Label>Don't have an account? </Label>
              <Link style={{color: '#851E00'}} to='/register'> Register now </Link>
            </div>
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

export default withRouter(Home)
