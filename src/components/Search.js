import React from "react";
import "../App.css";
import {
  Button,
  Form,
  FormControl,
  Navbar,
  Nav,
  NavDropdown
} from "react-bootstrap";
var moment = require("moment");




class Search extends React.Component {
  render() {
    return (
      <Navbar style={{ backgroundColor: "#0A171F" }} variant="dark" expand="lg" sticky="top">
        <Navbar.Brand href="/">
          <a><img src="https://i.pinimg.com/originals/ce/1f/d7/ce1fd767d594794d61297755ee162b06.gif" style={{ width: 60 }} /> The Rebel
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Pull requests</Nav.Link>
            <Nav.Link href="#home">Issues</Nav.Link>
            <Nav.Link href="#home">Marketplace</Nav.Link>
            <Nav.Link href="#link">Explore</Nav.Link>
           
          </Nav>
          <Form inline onSubmit={(e) => this.props.getSearchRepo(this.props.searchInput, e)}>
            <FormControl
              type="text"
              placeholder="Search or jump to..."
              className="mr-sm-2"
              value={this.props.searchInput}
              onChange={evt => this.props.updateInputValue(evt)} />
            <Button variant="outline-light" style={{ marginRight: "6px" }} onClick={(e) => this.props.getSearchRepo(this.props.searchInput, e)}>Search</Button>
            <Button variant="outline-light" onClick={(e) => this.props.getGists(this.props.searchInput)}>Search Gists</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}




export default Search;

