import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Container } from 'react-bootstrap';
import Search from './components/Search.js';
import Footer from './components/Footer.js';
import RenderRepo from './components/RenderRepo.js';
import RenderSearchRepo from './components/RenderSearchRepo.js';
const ReactMarkdown = require('react-markdown')
// const clientId = process.env.REACT_APP_CLIENT_ID;




class App extends React.Component {
  constructor(props) {
    super(props);
    // const existingToken = sessionStorage.getItem('token');
    // const accessToken = (window.location.search.split("=")[0] === "?access_token") ? window.location.search.split("=")[1] : null;

    // if (!accessToken && !existingToken) {
    //   window.location.replace(`https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`)
    // }

    // if (accessToken) {
    //   console.log(`New accessToken: ${accessToken}`);

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
  getRepo = async (name) => {
    const url = `https://api.github.com/repos/${name}/issues`;
    let response = await fetch(url);
    let data = await response.json();
    this.setState({
      issues: data,
      isListRepo: false,
      fullName: name,
    });
  };

  // getTrailerCountForEachMovie = () => {
  //   const { movies } = this.state
  //   const go = movies.map(({ id }) => {
  //     const api = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`;
  //     let movieTrailerKeys = []
  //     let newResult = {}
  //     return fetch(api)
  //       .then(response => response.json())
  //       .then(data => {
  //         data.results.map(trailer => {
  //           return movieTrailerKeys.push(trailer.key)
  //         })
  //         newResult.keys = movieTrailerKeys
  //         newResult.trailerLength = data.results.length
  //         newResult.id = id;
  //         return newResult
  //       });
  //   })
  //   Promise.all(go).then((results) => this.setState({ trailers: results }))  
  // }

  // getTrailerCountForEachMovie = () => {
  //   const { issues } = this.state
  //   const go = issues.map(({ number }) => {
  //     const api = `https://api.github.com/repos/${this.state.fullName}/issues/${number}/comments`;
  //     let comments = []
  //     let newResult = {}
  //     return fetch(api)
  //       .then(response => response.json())
  //       .then(data => {
  //         data.map(comment => {
  //           return comments.push(comment)
  //         })

  //         return newResult
  //       });
  //   })
  //   Promise.all(go).then((results) => this.setState({ comments: results }))  //Promise
  //   // this.setState({trailers:go})
  // }


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
            <RenderSearchRepo
              {...this.state}
              getSearchRepo={this.getSearchRepo}
              getRepo={this.getRepo}
              getIssueComments={this.getIssueComments}

            />}
          {!this.state.isListRepo &&
            <RenderRepo
              {...this.state}
              getSearchRepo={this.getSearchRepo}
              getRepo={this.getRepo}
              getIssueComments={this.getIssueComments}


            />
          }
        </Container>
        <Footer />
      </div>
    );
  }
}

export default App;
