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


class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
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
                  <DropdownItem>
                    <NavLink><Link to="/createWallet/" style={{textDecoration: 'none'}}>Create Wallet</Link></NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink><Link to="/openWallet/" style={{textDecoration: 'none'}}>Open Wallet</Link></NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
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