import React, { Component } from 'react'
import { Container, Jumbotron, Button } from 'reactstrap'
import UserForm from '../dumb/UserForm'

class Home extends Component {
  render() {
    return (
      <Container>
        <Jumbotron>
          <UserForm />
          <Button>Login</Button>
        </Jumbotron>
      </Container>
    )
  }
}

export default Home
