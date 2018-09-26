import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import NavBar from '../src/components/smart/NavBar'
import Home from '../src/components/smart/Home'
import Library from '../src/components/smart/Library'
import CreateWallet from '../src/components/smart/CreateWallet'
import OpenWallet from '../src/components/smart/OpenWallet'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/library' component={Library} />
            <Route path='/createWallet' component={CreateWallet} />
            <Route path='/openWallet' component={OpenWallet} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
