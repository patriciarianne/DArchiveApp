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
          <NavbarBrand><Link style={style.title} to="/">D'Archive</Link></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {
              this.state.user ? (
                <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink><Link to="/library" style={style.link}>Library</Link></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink><Link to="/addBook" style={style.link}>Add Book</Link></NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret style={{color: 'white'}}>
                      Profile
                    </DropdownToggle>
                  <DropdownMenu right>
                    {
                      !this.state.wallet ? (
                        <div>
                        <DropdownItem>
                          <NavLink><Link to="/createWallet/" style={style.dropdown}>Create Wallet</Link></NavLink>
                        </DropdownItem>
                        <DropdownItem>
                          <NavLink><Link to="/openWallet/" style={style.dropdown}>Import Wallet</Link></NavLink>
                        </DropdownItem>
                        </div>
                      ) : (
                        <DropdownItem>
                          <Link to="/wallet/" style={style.dropdown}>View Balance</Link>
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

const style = {
  title: {
    textDecoration: 'none',
    size: 30,
    color: '#FFFFFF',
    fontStyle: 'bold'
  },
  link: {
    textDecoration: 'none',
    size: 20,
    color: '#FFFFFF'
  },
  dropdown: {
    textDecoration: 'none',
    color: '#000'
  }
}

export default NavBar