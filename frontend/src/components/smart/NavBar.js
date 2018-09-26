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
        <Navbar style={{ backgroundColor: '#B69374'}} light expand="md">
          <NavbarBrand><Link to="/" style={{ textDecoration: 'none'}}>Hello</Link></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink><Link to="/library/" style={{ textDecoration: 'none'}}>Library</Link></NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Wallet
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavLink><Link to="/createWallet/" style={{ textDecoration: 'none'}}>Create Wallet</Link></NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink><Link to="/openWallet/" style={{ textDecoration: 'none'}}>Open Wallet</Link></NavLink>
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

export default NavBar