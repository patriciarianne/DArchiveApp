import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route,Redirect } from 'react-router-dom'
import { firebase, collection } from '../src/firebase'

import NavBar from '../src/components/smart/NavBar'
import Home from '../src/components/smart/Home'
import Library from '../src/components/smart/Library'
import CreateWallet from '../src/components/smart/CreateWallet'
import OpenWallet from '../src/components/smart/OpenWallet'
import Registration from '../src/components/smart/Registration'
import AddBook from '../src/components/smart/AddBook'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }
  
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({user})
      }
    })
    window.app = firebase
  }
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <SignedOutRoute path='/' exact component={Home} user={this.state.user}/>
            <SignedOutRoute path='/register' component={Registration} user={this.state.user} />
            <ProtectedRoute path='/library' component={Library} user={this.state.user} />
            <ProtectedRoute path='/createWallet' component={CreateWallet} user={this.state.user}/>
            <ProtectedRoute path='/openWallet' component={OpenWallet} user={this.state.user}/>
            <ProtectedRoute path='/addBook' component={AddBook} user={this.state.user}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

const ProtectedRoute = ({ component: Component, user: user, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
      user ?
      <Component {...props} />
      : <Redirect 
          to={{
            pathname: '/',
            state: { from: props.location }
          }} />
    )} />
  )
}

const SignedOutRoute = ({ component: Component, user: user, ...rest }) => {
  return (
  <Route {...rest} render={(props) => (
    user ?
    <Redirect to={{
      pathname: '/library',
      state: { from: props.location }
    }} />
    : 
    <Component {...props} />
  )} />
)}

export default App;
