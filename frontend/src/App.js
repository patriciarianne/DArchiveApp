import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import NavBar from '../src/components/smart/NavBar'
import Home from '../src/components/smart/Home'
import Library from '../src/components/smart/Library'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/library' component={Library} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
