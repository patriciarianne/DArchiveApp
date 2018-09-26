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
          <Jumbotron>
            <UserForm 
              handleInputChange={this.handleInputChange}
              values={this.state}
            />
            <Button onClick={this.handleLogin}>Login</Button>
            <Label><Link to='/register'>Create account</Link></Label>
          </Jumbotron>
        </Col>
      </Container>
    )
  }
}

export default withRouter(Home)
