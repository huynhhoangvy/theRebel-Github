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
    // const existingToken = sessionStorage.getItem('token');
    // const accessToken = process.env.REACT_APP_SECRET_KEY
    // if (!accessToken && !existingToken) {
    //   window.location.replace(`https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`)
    // }
    // if (accessToken) {
    //   sessionStorage.setItem("token", accessToken);
    //   this.state = {
    //     token: accessToken
    //   }
    // }
    // if (existingToken) {
    //   this.state = {
    //     token: existingToken
    //   };
    // }
    const existingToken = sessionStorage.getItem('token');
    const accessToken = (window.location.search.split("=")[0] === "?access_token") ? window.location.search.split("=")[1] : null;
  
    if (!accessToken && !existingToken) {
      window.location.replace(`https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`)
    }
  
    if (accessToken) {
      console.log(`New accessToken: ${accessToken}`);
  
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
      searchInput: '',
      isListRepo: true,
      issue: {},
      isModalOpen: false,
      fullName: '',
      comments: [],
      page: null,
      total: null,
      per_page: null,
      totalPage: null,
      newTitleCreate: '',
      newCommentIssueCreate: '',
    }
  }

  componentDidMount = () => {
  }

  updateInputValue = (evt) => {
    this.setState({
      searchInput: evt.target.value
    });
  }
  updateTitle = (evt) => {
    this.setState({
      newTitleCreate: evt.target.value
    });
  }
  updateComment = (evt) => {
    this.setState({
      newCommentIssueCreate: evt.target.value
    });
  }
  getSearchRepo = async (repoName, e) => {
    e.preventDefault();
    const url = `https://api.github.com/search/repositories?q=${repoName}`;
    let response = await fetch(url);
    let data = await response.json();
    this.setState({
      listRepo: data.items,
      isListRepo: true,
      totalResult: data.total_count
    });
  };


  getRepo = async (name, pageNumber) => {
    // const existingToken = sessionStorage.getItem('token');
    const url = `https://api.github.com/repos/${name}/issues?page=${pageNumber}`;
    let response = await fetch(url);
    let rawString1 = await response.headers.get("Link");
    let rawString2;
    let rawString3;
    let lastPage;

    if (rawString1 !== null) {
      rawString2 = rawString1.substring(rawString1.length - 20, rawString1.length)
      rawString3 = rawString2.replace('>; rel="last"', '')
      lastPage = parseInt(rawString3.replace('page=', ''))
    } else {
      lastPage = 1
    }
    let data = await response.json();
    this.setState({
      issues: data,
      isListRepo: false,
      fullName: name,
      page: pageNumber,
      total: lastPage * 30,
      per_page: 30,
      totalPage: lastPage,
    });
  };


  getRepo2 = async (name, pageNumber) => {
    const url = `https://api.github.com/repos/${name}/issues?page=${pageNumber}`;
    let response = await fetch(url);
    let data = await response.json();
    this.setState({
      issues: data,
      isListRepo: false,
      fullName: name,
      page: pageNumber,
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

  writeIssues = async (title, body) => {
    let data = new URLSearchParams();
    data.append('title', title);
    data.append('body', body);
    const url = `https://api.github.com/repos/${this.state.fullName}/issues`;
    const response = await fetch(url,
        {
            method: 'POST',
            headers: {
              
                "Content-Type": "application/vnd.github.symmetra-preview+json",
                'Authorization':   `token ${this.accessToken}`,
            },
            body: data.toString(),
            json: true,
        }
    );
    console.log("response",response)
}





  render() {
    console.log("this.state", this)
    return (
      <div className="App d-flex flex-column h-100">
        <header>
          <Search
            {...this.state}
            updateInputValue={this.updateInputValue}
            updateTitle={this.updateTitle}
            getSearchRepo={this.getSearchRepo}
            getIssueComments={this.getIssueComments}
            updateComment={this.updateComment}
          />
        </header>

        <Container className="h-auto mt-4">
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
              updateTitle={this.updateTitle}
              {...this.state}
              getSearchRepo={this.getSearchRepo}
              getRepo={this.getRepo}
              getIssueComments={this.getIssueComments}
              updateComment={this.updateComment}
              writeIssues={this.writeIssues}
            />
              <Pagination
                {...this.state}
                getSearchRepo={this.getSearchRepo}
                getRepo={this.getRepo}
                getIssueComments={this.getIssueComments}
                getRepo2={this.getRepo2}
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
