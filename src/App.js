import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button, Container } from "react-bootstrap";
import Search from "./components/Search.js";
import Footer from "./components/Footer.js";
import RenderRepo from "./components/RenderRepo.js";
import RenderSearchRepo from "./components/RenderSearchRepo.js";
const ReactMarkdown = require("react-markdown");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      issues: [],
      listRepo: [],
      // isIssue:false,
      searchInput: "",
      isListRepo: true
    };
  }

  componentDidMount = () => {};

  updateInputValue = evt => {
    this.setState({
      searchInput: evt.target.value
    });
  };

  // use for search Repo =>  return only list of "owner/reponame"
  getSearchRepo = async repoName => {
    const url = `https://api.github.com/search/repositories?q=${repoName}`;
    let response = await fetch(url);
    let data = await response.json();
    this.setState({
      listRepo: data.items,
      isListRepo: true
    });
  };

  // when user click on owner/reponame => return list of issues
  // Issue Title                issues.title
  // Number of the issue || issues.number
  // Owner of the Issue
  // Owner Avatar
  // How long ago the issue was created in a human-friendly format (e.g. 2 days ago)  // .moment
  // Body of the Issue
  // Label - note the color as returned by the API.  ****(some have, some not)
  // State of Issue (Open/Closed).
  //////////////////////////////
  getRepo = async fullName => {
    const url = `https://api.github.com/repos/${fullName}/issues`;
    let response = await fetch(url);
    let data = await response.json();
    this.setState({
      issues: data,
      isListRepo:false,
  });
  console.log("get Repo",this.state.issues)
};


// async getUser(name) {
//   const url = `https://api.github.com/users/${name}`;
//   let response = await fetch(url);
//   let data = await response.json();
//   this.setState({
//       csScores: data.items,
//   });
// };















  render (){
  return (
<div className="App d-flex flex-column h-100">
<header>
  <Search 
          {...this.state}
          updateInputValue={this.updateInputValue}
          getSearchRepo={this.getSearchRepo}
          />
        </header>
        <Container className="h-auto mt-4">
        {this.state.isListRepo && 
        <RenderSearchRepo 
        {...this.state}
        getSearchRepo={this.getSearchRepo}
        getRepo={this.getRepo}
        />}
          {!this.state.isListRepo && 
          <RenderRepo 
            {...this.state}
            getSearchRepo={this.getSearchRepo}
            getRepo={this.getRepo}
          />
          }
        </Container>
        <Footer />
      </div>
    );
  }
}

export default App;
