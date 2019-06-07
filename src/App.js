import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Container } from 'react-bootstrap';
import Search from './components/Search.js';
import Footer from './components/Footer.js';
import RenderRepo from './components/RenderRepo.js';
import RenderSearchRepo from './components/RenderSearchRepo.js';
import Pagination from './components/Pagination.js';



const ReactMarkdown = require('react-markdown')
const clientId = process.env.REACT_APP_CLIENT_ID;





class App extends React.Component {
  constructor(props) {
    super(props);
    const existingToken = sessionStorage.getItem('token');
    const accessToken = process.env.REACT_APP_CLIENT_ID

    console.log('process.env.REACT_APP_CLIENT_ID', process.env.REACT_APP_CLIENT_ID)

    console.log('wwwaccessToken', accessToken)
    if (!accessToken && !existingToken) {
      window.location.replace(`https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`)
    }

    if (accessToken) {
      console.log(`New hello: ${accessToken}`);

      sessionStorage.setItem("token", accessToken);
      this.state = {
        token: accessToken
      }
    }

    if (existingToken) {
      this.state = {
        token: existingToken
      };
    }
    this.state = {
      userName: '',
      issues: [],
      listRepo: [],
      // isIssue:false,
      searchInput: '',
      isListRepo: true,
      issue: {},
      isModalOpen: false,
      fullName: '',
      comments: [],
      page: null,
      total: null,
      per_page: null,

    }
  }

  componentDidMount = () => {
  }

  updateInputValue = (evt) => {
    this.setState({
      searchInput: evt.target.value
    });
  }

  // use for search Repo =>  return only list of "owner/reponame"
  getSearchRepo = async (repoName) => {
    const url = `https://api.github.com/search/repositories?q=${repoName}`;
    let response = await fetch(url);
    let data = await response.json();
    this.setState({
      listRepo: data.items,
      isListRepo: true,
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
  getRepo = async (name,pageNumber) => {
    // const existingToken = sessionStorage.getItem('token');
    const url = `https://api.github.com/repos/${name}/issues?page=${pageNumber}`;
    let response = await fetch(url);
    let data = await response.json();
    let x;
    (data.length < 1 ? (x=1) : (x=data[0].number));
    this.setState({
      issues: data,
      isListRepo: false,
      fullName: name,
      page: pageNumber,
      total: x,
      per_page: 30,
    });
  };


  getIssueComments = async (issueNumber) => {
    const url = `https://api.github.com/repos/${this.state.fullName}/issues/${issueNumber}/comments`;
    let response = await fetch(url);
    let data = await response.json();
    this.setState({
      comments: data,
      isListRepo: false,
    });
  }




  render() {
    console.log("this.state", this.state)
    return (
      <div className="App h-100">
        <header>
          <Search
            {...this.state}
            updateInputValue={this.updateInputValue}
            getSearchRepo={this.getSearchRepo}
            getIssueComments={this.getIssueComments}

          />
        </header>

        <Container className="h-100">
          {this.state.isListRepo &&
            <div>
              <RenderSearchRepo
                {...this.state}
                getSearchRepo={this.getSearchRepo}
                getRepo={this.getRepo}
                getIssueComments={this.getIssueComments}

              />
              

            </div>

          }

          {!this.state.isListRepo &&
            <div><RenderRepo
              {...this.state}
              getSearchRepo={this.getSearchRepo}
              getRepo={this.getRepo}
              getIssueComments={this.getIssueComments}


            />
            <Pagination
                {...this.state}
                getSearchRepo={this.getSearchRepo}
                getRepo={this.getRepo}
                getIssueComments={this.getIssueComments}

              />
              </div>
          }
        </Container>

        <Footer />
      </div>
    );
  }
}

export default App;
