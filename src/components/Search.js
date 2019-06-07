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
  render(){
    return (
      <Navbar bg="dark" variant="dark" variant="dark" expand="lg" sticky="top">
        <Navbar.Brand href="#ho me">The Rebel Github</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
          </Nav>
            
          <Form inline onSubmit={(e) => this.props.getSearchRepo(this.props.searchInput, e)}>
          <FormControl 
          type="text" 
          placeholder="Search" 
          className="mr-sm-2" 
          value={this.props.searchInput} 
          onChange={evt => this.props.updateInputValue(evt)}  />
          <Button variant="outline-light"  onClick={(e) => this.props.getSearchRepo(this.props.searchInput,e)}>Search</Button>
          </Form>
        

          </Navbar.Collapse>
          </Navbar>
    )
  }
  }




    export default Search;

