import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import {Link} from 'react-router-dom'
import { firebase } from '../../firebase'

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({user})
      } else {
        this.setState({user:null})
      }
    })

    const wallet = sessionStorage.getItem('jsonWallet')
    this.setState({wallet})
  }

  logout() {
    if (this.state.user) {
      firebase.auth().signOut()
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  
  render() {
    return (
      <div>
        <Navbar style={{ backgroundColor: '#851E00'}} light expand="md">
          <NavbarBrand><Link to="/" style={linkStyle}>D'Archive</Link></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {
              this.state.user ? (
                <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink><Link to="/library" style={linkStyle}>Library</Link></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink><Link to="/addBook" style={linkStyle}>Add Book</Link></NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Profile
                    </DropdownToggle>
                  <DropdownMenu right>
                    {
                      !this.state.wallet ? (
                        <div>
                        <DropdownItem>
                          <NavLink><Link to="/createWallet/" style={{textDecoration: 'none', color: 'black'}}>Create Wallet</Link></NavLink>
                        </DropdownItem>
                        <DropdownItem>
                          <NavLink><Link to="/openWallet/" style={{textDecoration: 'none', color: 'black'}}>Open Wallet</Link></NavLink>
                        </DropdownItem>
                        </div>
                      ) : (
                        <DropdownItem>
                          <NavLink><Link to="/openWallet/" style={{textDecoration: 'none', color: 'black'}}>View Balance</Link></NavLink>
                        </DropdownItem>
                      )
                    }
                    <DropdownItem style={{color: '#851E00'}} divider />
                    <DropdownItem onClick={this.logout} style={{ textAlign: 'center'}}>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
              ) : null
            }
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const linkStyle = {
  textDecoration: 'none',
  size: 20,
  color: '#FFFFFF'
}

export default NavBar