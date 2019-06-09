import React from 'react';
import './App.css';
import { Container, Jumbotron } from 'react-bootstrap';
import Search from './components/Search.js';
import Footer from './components/Footer.js';
import RenderRepo from './components/RenderRepo.js';
import RenderSearchRepo from './components/RenderSearchRepo.js';
import Pagination from './components/Pagination.js';

const clientId = process.env.REACT_APP_CLIENT_ID;

class App extends React.Component {
	constructor(props) {
		super(props);
		const existingToken = sessionStorage.getItem('token');
		const accessTokenWithCode = (window.location.search.split("=")[0] === "?access_token") ? window.location.search.split("=")[1] : null;

		if (!accessTokenWithCode && !existingToken) {
			window.location.replace(`https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`)
		}

		if (accessTokenWithCode) {
			const accessToken = accessTokenWithCode.replace("&scope", "")
			sessionStorage.setItem("token", accessToken);
			this.state = {
				token: accessToken,
				userName: '',
				issues: [],
				listRepo: [],
				searchInput: '',
				isListRepo: true,
				isModalOpen: false,
				fullName: '',
				comments: [],
				page: null,
				total: null,
				per_page: null,
				totalPage: null,
				newTitleCreate: '',
				newCommentIssueCreate: '',
				rawSearchInput: '',
				isPagination:true,
				isOnHomePage: true,
			}
		}

		if (existingToken) {
			this.state = {
				token: existingToken,
				userName: '',
				issues: [],
				listRepo: [],
				searchInput: '',
				isListRepo: true,
				isModalOpen: false,
				fullName: '',
				comments: [],
				page: null,
				total: null,
				per_page: null,
				totalPage: null,
				newTitleCreate: '',
				newCommentIssueCreate: '',
				rawSearchInput: '',
				isPagination:true,
				isOnHomePage: true,
			};
		}
	}

	componentDidMount = () => {
	}

	updateInputValue = (evt) => {
		this.setState({
			rawSearchInput: evt.target.value,
			searchInput: (evt.target.value).replace('https://github.com/', '')
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
		const url = `https://api.github.com/search/repositories?q=${repoName}&page=1`;
		let response = await fetch(url, {
			headers: new Headers({
				'Authorization': `token ${this.state.token}`,
				'Content-Type': 'application/vnd.github.symmetra-preview+json'
			}),
		});
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
			listRepo: data.items,
			isListRepo: true,
			totalResult: data.total_count,
			page: 1,
			total: lastPage * 30,
			per_page: 30,
			totalPage: lastPage,
			isOnHomePage: false,
		});
	};

	getSearchRepo1 = async (repoName, pageNumber) => {
		const url = `https://api.github.com/search/repositories?q=${repoName}&page=${pageNumber}`;
		let response = await fetch(url, {
			headers: new Headers({
				'Authorization': `token ${this.state.token}`,
				'Content-Type': 'application/vnd.github.symmetra-preview+json'
			}),
		});
		let data = await response.json();
		this.setState({
			listRepo: data.items,
			isListRepo: true,
			page: pageNumber,
		});
	};




	getRepo = async (name, pageNumber) => {
		const url = `https://api.github.com/repos/${name}/issues?page=${pageNumber}`;
		let response = await fetch(url, {
			headers: new Headers({
				'Authorization': `token ${this.state.token}`,
				'Content-Type': 'application/vnd.github.symmetra-preview+json',
				'Accept': 'reactions application/vnd.github.squirrel-girl-preview',
			}),
		});
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
			isPagination:true,
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
		let response = await fetch(url, {
			headers: new Headers({
				'Authorization': `token ${this.state.token}`,
				'Content-Type': 'application/vnd.github.symmetra-preview+json',
				'Accept': 'reactions application/vnd.github.squirrel-girl-preview',
			}),
		});
		let data = await response.json();
		this.setState({
			isPagination:true,
			issues: data,
			isListRepo: false,
			fullName: name,
			page: pageNumber,
		});
	};

	getIssueComments = async (issueNumber) => {
		const url = `https://api.github.com/repos/${this.state.fullName}/issues/${issueNumber}/comments`;
		let response = await fetch(url, {
			headers: new Headers({
				'Authorization': `token ${this.state.token}`,
				'Content-Type': 'application/vnd.github.symmetra-preview+json',
				'Accept': 'reactions application/vnd.github.squirrel-girl-preview',
			}),
		});
		let data = await response.json();
		this.setState({
			isPagination:false,
			comments: data,
			isListRepo: false,
			newCommentIssueCreate: '',
		});
	}

	writeIssue = async (issueTitle, issueBody) => {
		const url = `https://api.github.com/repos/${this.state.fullName}/issues`;
		let data = { title: issueTitle, body: issueBody }
		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: new Headers({
				'Authorization': `token ${this.state.token}`,
				'Content-Type': 'application/vnd.github.symmetra-preview+json'
			}),
		})


		console.log("responseRERERERE",response)

		this.setState({
			isListRepo: false,
		});
		response.status === 201 ? (alert("You have successfully created a new issue")) : (alert("There was an error creating a new issue"))
	}


	closeIssue = async (issueNumber) => {
		const url = `https://api.github.com/repos/${this.state.fullName}/issues/${issueNumber}`;
		let data = { state: 'closed' }
		const response = await fetch(url, {
			method: 'PATCH',
			body: JSON.stringify(data),
			headers: new Headers({
				'Authorization': `token ${this.state.token}`,
				'Content-Type': 'application/vnd.github.squirrel-girl-preview',
			}),
		})
		this.setState({
			isListRepo: false,
		});
		response.status === 200 ? (alert("You have successfully closed this issue")) : (alert("There was an error closing this issue"))
	}

	writeComment = async (commentBody, issueNumber) => {
		const url = `https://api.github.com/repos/${this.state.fullName}/issues/${issueNumber}/comments`;
		let data = { body: commentBody }
		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: new Headers({
				'Authorization': `token ${this.state.token}`,
				'Content-Type': 'application/vnd.github.squirrel-girl-preview',
			}),
		})

		this.setState({
			isListRepo: false,
		});
		response.status === 201 ? (alert("You have successfully created a new issue")) : (alert("There was an error creating a new issue"))
	}


	addReactions = async (commentId, reaction) => {
		const url = `https://api.github.com/repos/${this.state.fullName}/issues/comments/${commentId}/reactions`;
		let data = { "content": reaction }
		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: new Headers({
				'Authorization': `token ${this.state.token}`,
				'Accept': 'application/vnd.github.squirrel-girl-preview+json',
			}),
		})

		this.setState({
			isListRepo: false,
		});
		response.status === 201 ? (alert("You have successfully add a reaction")) : (alert("There was an error adding a reaction"))
	}

	switchingPagination = (e) => {
		return this.setState({isPagination:e})
	}

	render() {
		console.log("this.state", this.state)
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
				{this.state.isOnHomePage && 
				<Jumbotron className="h-100 jumbotron" style={{textAlign: "center", padding: "5rem 2rem", borderRadius: "0px"}}> 
					<h1>Welcome to <span>The Rebel Github</span></h1>
					<p>
						<strong>
						Search instructions:<br/>
						• Search for repositories with "<cite>repositories name</cite>"<br/>
						• Jump to a user's repositories with "<cite>user/</cite>"
						</strong>
					</p>
					<img src="https://i.pinimg.com/originals/2c/2d/6f/2c2d6f89218cdb5c6a345d603484755f.gif" className="" style={{height: "400px", borderRadius: "10px"}} />
				</Jumbotron>
				}
				{this.state.isListRepo &&
				<Container className="h-auto mt-4">

					<RenderSearchRepo
						{...this.state}
						getSearchRepo={this.getSearchRepo}
						getRepo={this.getRepo}
						getIssueComments={this.getIssueComments}
						/>
				</Container>

					}

					{!this.state.isListRepo &&
						<Container className="h-auto mt-4">
							<RenderRepo
								updateTitle={this.updateTitle}
								{...this.state}
								getSearchRepo={this.getSearchRepo}
								getRepo={this.getRepo}
								getIssueComments={this.getIssueComments}
								updateComment={this.updateComment}
								writeIssue={this.writeIssue}
								writeComment={this.writeComment}
								closeIssue={this.closeIssue}
								addReactions={this.addReactions}
								switchingPagination={this.switchingPagination}
							/>

						</Container>
					}

				{/* </Container> */}
					{this.state.isPagination &&
						<Pagination
						{...this.state}
						getSearchRepo={this.getSearchRepo}
						getRepo={this.getRepo}
						getIssueComments={this.getIssueComments}
						getRepo2={this.getRepo2}
						getSearchRepo1={this.getSearchRepo1}
						/>
					}
				<Footer />
			</div>
		);
	}
}

export default App;
