import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Form,  } from 'react-bootstrap';
import Search from './components/Search.js';
import RenderRepo from './components/RenderRepo.js';
import RenderSearchRepo from './components/RenderSearchRepo.js';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        userName:'',
        issues: [],
        listRepo:[],
        // isIssue:false,
        searchInput:'',
        isListRepo:true,
        isListIssue:false,

    }
}
componentDidMount = () => {

}


// use for search Repo =>  return only list of "owner/reponame"
async getSearchRepo(repoName) {
  const url = `https://api.github.com/search/repositories?q=${repoName}`;
  let response = await fetch(url);
  let data = await response.json();
  this.setState({
    listRepo: data.items,
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
async getRepo(fullName) {
  const url = `https://api.github.com/repos/${fullName}/issues`;
  let response = await fetch(url);
  let data = await response.json();
  this.setState({
      issues: data,
  });
};
  updateInputValue(evt) {
    this.setState({
      searchInput: evt.target.value
    });
    console.log('thisthithithi',this.state.searchInput)
  }

// async getUser(name) {
//   const url = `https://api.github.com/users/${name}`;
//   let response = await fetch(url);
//   let data = await response.json();
//   this.setState({
//       csScores: data.items,
//   });
// };
  render (){
    console.log('rwefsfsdf',this.state)
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <div>
          <Form >
          <input value={this.state.searchInput} onChange={evt => this.updateInputValue(evt)}/>
            <Button onClick={() => this.getSearchRepo(this.state.searchInput)}></Button>
          </Form>
          </div>
          <Search 
          {...this.state}
          
          
          />
        </div>
        <div><RenderSearchRepo 
        {...this.state}
        getSearchRepo={this.getSearchRepo}
        />
        </div>
        <div>
          <RenderRepo 
{...this.state}
getRepo={this.getRepo}
          
          />
        </div>

      </header>
    </div>
  );
}
}

export default App;
