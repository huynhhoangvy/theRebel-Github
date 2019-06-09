import React from 'react';
import '../App.css';
import {
	Button,
	ButtonToolbar,
	Form,
	DropdownButton,
	Dropdown,
	Row,
	Col,
	Badge,
	Tab,
	Tabs,
} from "react-bootstrap";
import Modal from 'react-modal'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const ReactMarkdown = require('react-markdown')
var moment = require('moment');






class RenderRepo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			issueTitle: 'test',
			issueBody: '',
			issueLogin: '',
			issueAvatar: '',
			issueCreatedAt: '',
			isOpen: false,
			isOpenCreateIssue: false,
			issueNumber: null,
			issueReactions: {},
		}
	}

	home = () => {
		return (
			<div className="container"
				style={{ backgroundColor: "", border: "" }}>
				<div>
					<div className="d-flex">
						<img className="mw-100" src="https://img.icons8.com/metro/26/000000/books.png"/> 
						<h5 className="m-0 text-danger font-italic"> {this.props.fullName}</h5>
						<div>
							<button onClick={() => this.isOpenIssue()}>New Issue</button>
						</div>
					</div>
					<div className="content p-3 mt-2 text-center rounded border border-gray-light">
						<h5 classname="mb-2">Want to contribute to {this.props.fullName}?</h5>
						<p className="m-0">If you have a bug or an idea, read the contributing guidelines before opening an issue.</p>
						<p className="mb-0">If you're ready to tackle some open issues, we've collected some good first issues for you .</p>
					</div>
				</div>
				<Modal
					isOpen={this.state.isOpenCreateIssue}
					onRequestClose={() => this.setState({ isOpenCreateIssue: false })}
					style={{
						overlay: {
							backgroundColor: "rgba(244, 247, 252, 0.3)",
							top: '0%',
							left: '0%',
							right: '0%',
							bottom: '0%',
							marginRight: '-10%',
						},
						content: {
							top: '15%',
							left: '10%',
							right: '10%',
							bottom: '10%',
							marginRight: '10%',
							backgroundColor: "rgba(244, 247, 252, 1)",
							border: "none",
						}
					}}
				>
					<div>

						<Form>
							<Form.Group controlId="exampleForm.ControlInput1">
								<Form.Label>Title</Form.Label>
								<Form.Control type="text" placeholder="Title"
									value={this.props.newTitleCreate}
									onChange={evt => this.props.updateTitle(evt)}
								/>
							</Form.Group>
							<Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
								<Tab eventKey="home" title="Write">
									<Form.Group controlId="exampleForm.ControlTextarea1">
										{/* <Form.Label>Write</Form.Label> */}
										<Form.Control
											size="lg"
											as="textarea" rows="8" placeholder=""
											value={this.props.newCommentIssueCreate}
											onChange={evt => this.props.updateComment(evt)} />
									</Form.Group>
								</Tab>
								<Tab eventKey="profile" title="Preview">
									<p>
										<span style={{ fontSize: "20px" }}>Comment: </span><ReactMarkdown
											id="hi"
											source={this.props.newCommentIssueCreate} />
									</p>
								</Tab>

							</Tabs>
							<Button onClick={() => this.handlePostIssue(this.props.newTitleCreate, this.props.newCommentIssueCreate)}>Submit issues</Button>
						</Form>
					</div>
				</Modal>

				<div>{this.renderRepos()}</div>

			</div>
		)
	}





	 openIssue =()=> {
		return (	
		<div>
			              <Link to="/" onClick={()=>this.props.switchingPagination("true")}>Go back to {this.props.fullName} issue list</Link>

		<div style={{border: "1px solid rgb(204, 204, 204)", borderRadius: "3px", padding: "20px"}} className="mb-5">
			<button onClick={() => this.props.closeIssue(this.state.issueNumber)}>Close this issue</button>
			<h4 style={{ fontSize: 50 }}>  {this.state.issueTitle}</h4>
			{this.renderIssueUser()}
			<hr
				style={{
					color: 'red',
					height: 5,
				}}
			/>
			<p><ReactMarkdown
				id="hi"
				style={{ backgroundColor: '' }}
				source={this.state.issueBody} /></p>
	
		<div className="reactions">
			{this.state.issueReactions['+1'] > 0 && <img alt="" src='https://github.githubassets.com/images/icons/emoji/unicode/1f44d.png' height='20px' />}
			{this.state.issueReactions['-1'] > 0 && <img alt="" src='https://github.githubassets.com/images/icons/emoji/unicode/1f44e.png' height='20px' />}
			{this.state.issueReactions['laugh'] > 0 && <img alt="" src='https://github.githubassets.com/images/icons/emoji/unicode/1f604.png' height='20px' />}
			{this.state.issueReactions['confused'] > 0 && <img alt="" src='https://github.githubassets.com/images/icons/emoji/unicode/1f615.png' height='20px' />}
			{this.state.issueReactions['heart'] > 0 && <img alt="" src='https://github.githubassets.com/images/icons/emoji/unicode/2764.png' height='20px' />}
			{this.state.issueReactions['hooray'] > 0 && <img alt="" src='https://github.githubassets.com/images/icons/emoji/unicode/1f389.png' height='20px' />}
			{this.state.issueReactions['rocket'] > 0 && <img alt="" src='https://github.githubassets.com/images/icons/emoji/unicode/1f680.png' height='20px' />}
			{this.state.issueReactions['eyes'] > 0 && <img alt="" src='https://github.githubassets.com/images/icons/emoji/unicode/1f440.png' height='20px' />}
		</div>
		</div>
	
		<div>
			{this.renderComments()}
		</div>
	
		<div>
			<Form>
				<Form.Group controlId="exampleForm.ControlTextarea2">
					<Form.Label></Form.Label>
					<Form.Control
						as="textarea" rows="3" placeholder="Leave a comment here"
						value={this.props.newCommentIssueCreate}
						onChange={evt => this.props.updateComment(evt)} />
					<Button style={{float: "right"}} className="mt-2" onClick={() => this.handlePostComment(this.props.newCommentIssueCreate)}>Comment</Button>
				</Form.Group>
			</Form>
		</div>
	</div>
	)}









	handleCloseModal = () => {
		this.setState({ isOpen: false });
	}
	
	handleViewIssue = (reactions, number, title, body, login, avatar_url, created_at) => {
		
		this.props.getIssueComments(number)
		this.renderComments()
		this.setState({ issueReactions: reactions, issueNumber: number, issueTitle: title, issueBody: body, issueLogin: login, issueAvatar: avatar_url, issueCreatedAt: created_at })
	}

	openModal = () => {
		this.setState({ isOpen: true });
	}

	renderIssueUser = () => {
		return (
			<div style={{ display: "inline" }}>
				<img alt="" src={this.state.issueAvatar} style={{ width: 50, height: "auto", borderRadius: "5px" }} />
				<strong> &raquo; {this.state.issueLogin}</strong> <cite title="Source Title">opened {moment(this.state.issueCreatedAt).startOf().fromNow()}</cite>
			</div>

		)
	}


	handleAddReactions = (reaction, id) => {
		this.props.addReactions(id, reaction);
		setTimeout(() => this.props.getIssueComments(this.state.issueNumber), 3000);
		return this.setState({ isOpen: true });
	}


	resizeImageMarkDown = (props) => {
		return <img {...props} style={{ maxWidth: "100%" }} />
	}


	renderComments = () => {
		return this.props.comments.map(comment => {
			return (
				<div className="comment d-flex mb-3">
						<div>
							<img alt="" src={`${comment.user.avatar_url}`} height="50px" width="50px" style={{borderRadius: "5px"}} />
						</div>
						<div style={{border: "1px solid rgb(204, 204, 204)", borderRadius: "3px", marginLeft: "15px", width: "100%"}}>
					<div className="commentUser">
						<div className="d-flex justify-content-between w-100">
							<div >
								<strong style={{ paddingLeft: "1rem" }}>{comment.user.login}</strong>
								<cite title="Source Title"> commented {moment(comment.created_at).startOf().fromNow()}:</cite>
							</div>
							<ButtonToolbar>
								{['down'].map(direction => (
									<DropdownButton drop={direction} variant="secondary" title={` Add reactions `} id={`dropdown-button-drop-${direction}`} key={direction}>
										<Dropdown.Item onClick={() => this.handleAddReactions('+1', comment.id)}><img alt="" src='https://github.githubassets.com/images/icons/emoji/unicode/1f44d.png' height='20px' /></Dropdown.Item>
										<Dropdown.Item onClick={() => this.handleAddReactions('-1', comment.id)}><img alt="" src='https://github.githubassets.com/images/icons/emoji/unicode/1f44e.png' height='20px' /></Dropdown.Item>
										<Dropdown.Item onClick={() => this.handleAddReactions('laugh', comment.id)}><img alt="" src='https://github.githubassets.com/images/icons/emoji/unicode/1f604.png' height='20px' /></Dropdown.Item>
										<Dropdown.Item onClick={() => this.handleAddReactions('confused', comment.id)}><img alt="" src='https://github.githubassets.com/images/icons/emoji/unicode/1f615.png' height='20px' /></Dropdown.Item>
										<Dropdown.Item onClick={() => this.handleAddReactions('heart', comment.id)}><img alt="" src='https://github.githubassets.com/images/icons/emoji/unicode/2764.png' height='20px' /></Dropdown.Item>
										<Dropdown.Item onClick={() => this.handleAddReactions('hooray', comment.id)}><img alt="" src='https://github.githubassets.com/images/icons/emoji/unicode/1f389.png' height='20px' /></Dropdown.Item>
										<Dropdown.Item onClick={() => this.handleAddReactions('rocket', comment.id)}><img alt="" src='https://github.githubassets.com/images/icons/emoji/unicode/1f680.png' height='20px' /></Dropdown.Item>
										<Dropdown.Item onClick={() => this.handleAddReactions('eyes', comment.id)}><img alt="" src='https://github.githubassets.com/images/icons/emoji/unicode/1f440.png' height='20px' /></Dropdown.Item>
									</DropdownButton>
								))}
							</ButtonToolbar>
						</div>
					</div>
					<div className="commentContent"><ReactMarkdown source={comment.body} /></div>
					<div className="reactions">
						{comment.reactions['+1'] > 0 && <cite><img alt="" src='https://github.githubassets.com/images/icons/emoji/unicode/1f44d.png' height='20px' />{comment.reactions['+1']}</cite>}
						{comment.reactions['-1'] > 0 && <cite><img alt="" src='https://github.githubassets.com/images/icons/emoji/unicode/1f44e.png' height='20px' />	{comment.reactions['-1']}</cite>}
						{comment.reactions['laugh'] > 0 && <cite><img alt="" src='https://github.githubassets.com/images/icons/emoji/unicode/1f604.png' height='20px' />{comment.reactions['laugh']}</cite>}
						{comment.reactions['confused'] > 0 && <cite><img alt="" src='https://github.githubassets.com/images/icons/emoji/unicode/1f615.png' height='20px' />	{comment.reactions['confused']}</cite>}
						{comment.reactions['heart'] > 0 && <cite><img alt="" src='https://github.githubassets.com/images/icons/emoji/unicode/2764.png' height='20px' />	{comment.reactions['heart']}</cite>}
						{comment.reactions['hooray'] > 0 && <cite><img alt="" src='https://github.githubassets.com/images/icons/emoji/unicode/1f389.png' height='20px' />	{comment.reactions['hooray']}</cite>}
						{comment.reactions['rocket'] > 0 && <cite><img alt="" src='https://github.githubassets.com/images/icons/emoji/unicode/1f680.png' height='20px' />{comment.reactions['rocket']}</cite>}
						{comment.reactions['eyes'] > 0 && <cite><img alt="" src='https://github.githubassets.com/images/icons/emoji/unicode/1f440.png' height='20px' />	{comment.reactions['eyes']}</cite>}
					</div>
					</div>
				</div>
			)
		})
	}
	renderRepos = () => {
		return this.props.issues.map((issue, idx) => {
			return (
				<div className="mb-4 py-4" style={{ borderBottom: "1px solid #e1e4e8" }} onClick={() => this.handleViewIssue(issue.reactions, issue.number, issue.title, issue.body, issue.user.login, issue.user.avatar_url, issue.created_at)}>
					<Row>
						<Col className="col-11">
							<h4 className="mb-1">
								<Link to={"/issue/" + issue.number}>
									<a href="#" style={{ color: "" }}>
										<strong className="text-muted">#{issue.number} </strong>
										{issue.title}
									</a></Link>

							</h4>
							<small>

								<cite title="Source Title">opened {moment(issue.created_at).startOf().fromNow()}</cite> by <strong>@
                      {issue.user.login}</strong>
							</small>
							{issue.body && <ReactMarkdown className="text-black-50 mt-3" source={issue.body.substr(0, 250) + "..."} />}
							<div>{this.labels(issue.labels)} </div>
						</Col>
						<Col className="col-1">
							<img alt="" src={issue.user.avatar_url} style={{ width: 50, height: "auto", borderRadius: "5px" }} />
							<div>🗨 {issue.comments}</div>
						</Col>
					</Row>
				</div>
			)
		})
	}

	//Get color labels
	labels = (label) => {
		return label.map(value => {
			return (
				<Badge style={{ backgroundColor: `#${value.color}` }}>{value.name}</Badge>
			)
		})
	}

	isOpenIssue = () => {
		this.setState({ isOpenCreateIssue: true });
	}

	handlePostIssue = (title, comment) => {
		this.props.writeIssue(title, comment);
		setTimeout(() => this.props.getRepo(this.props.fullName), 3000);
		return this.setState({ isOpenCreateIssue: false });
	}

	handlePostComment = (comment) => {
		this.props.writeComment(comment, this.state.issueNumber);
		setTimeout(() => this.props.getIssueComments(this.state.issueNumber), 3000);
		return this.setState({ isOpen: true });
	}




	render() {
		console.log("this props", this.state)
		return (
			<Router>
				<Route path="/" exact component={this.home} />
				<Route path={"/issue/" + this.state.issueNumber} component={this.openIssue} />




			</Router>
		)
	}
}

export default RenderRepo;

