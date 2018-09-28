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
import { getUserData } from '../../helpers/dataFunctions'

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
    firebase.auth().onAuthStateChanged(async (user) => {
      if(user) {
        const userData = await getUserData(user.uid)
        const wallet = userData.jsonWallet
        const name = userData.name
        sessionStorage.setItem('jsonWallet', wallet)
        this.setState({user, wallet, name})
      } else {
        this.setState({user:null})
      }
    })
  }

  logout() {
    firebase.auth().signOut()
    sessionStorage.clear()
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
          <Link style={style.title} to="/">D'Archive</Link>
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
                      {this.state.name}
                    </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <Link to="/wallet/" style={style.dropdown}>Open Wallet</Link>
                    </DropdownItem>
                    <DropdownItem style={{color: '#851E00'}} divider />
                    <DropdownItem onClick={this.logout}>
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
    fontSize: 30,
    color: '#FFFFFF',
    fontStyle: 'bold'
  },
  link: {
    textDecoration: 'none',
    color: '#FFFFFF',
  },
  dropdown: {
    textDecoration: 'none',
    color: '#000'
  }
}

export default NavBar