import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";

class Menu extends Component {
  constructor() {
    super();
    this.state = {
      reloadPage: false
    };
  }

  componentDidMount = () => {
    if (!isAuthenticated()) {
      this.setState({ reloadPage: true });
    }
  };

  render() {
    const userId = isAuthenticated().user ? isAuthenticated().user._id : "";
    const userName = isAuthenticated().user ? isAuthenticated().user.name : "";
    if (this.state.reloadPage) {
      window.location.reload();
    }
    return (
      <Navbar collapseOnSelect expand="md" variant="light">
        <li className="navbar-brand" color="info">
          <Link
            className="nav-link text-info"
            color="text-info"
            // style={isActive(history, "/home")}
            to="/home"
          >
            Weather Report
          </Link>
        </li>
        {/* <Navbar.Brand href="#home">SQUADIFY</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/sessionData">Session Data</Nav.Link>
           
          </Nav>

          <NavDropdown
            className=""
            title={<span className="text-info my-auto">Hello {userName}</span>}
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item>
              <Link to={`/user/${userId}`}>Profile</Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>
              <Link to={`/signout`}>Log out</Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(Menu);
