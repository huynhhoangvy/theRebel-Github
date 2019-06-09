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
} from "react-bootstrap";
import Modal from 'react-modal'
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

	handleCloseModal = () => {
		this.setState({ isOpen: false });
	}
	handleModal = (reactions, number, title, body, login, avatar_url, created_at) => {
		this.props.getIssueComments(number)
		this.renderComments()
		this.openModal()

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
		this.props.getIssueComments(this.state.issueNumber);
		return this.setState({ isOpen: true });
	}

	renderComments = () => {
		return this.props.comments.map(comment => {
			return (
				<div className="comment">
					<div className="commentUser">
						<div>
							<img alt="" src={`${comment.user.avatar_url}`} height="50px" width="50px" />
						</div>
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
			)
		})
	}
	renderRepos = () => {
		return this.props.issues.map((issue, idx) => {
			return (
				<div className="mb-4 py-4" style={{ borderBottom: "1px solid #e1e4e8" }} onClick={() => this.handleModal(issue.reactions, issue.number, issue.title, issue.body, issue.user.login, issue.user.avatar_url, issue.created_at)}>
					<Row>
						<Col className="col-11">
							<h4 className="mb-1">
								<a href="#" style={{ color: "" }}>
									<strong className="text-muted">#{issue.number} </strong> {issue.title}
								</a>
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
		this.props.getRepo(this.props.fullName);
		return this.setState({ isOpenCreateIssue: false });
	}
	handlePostComment = (comment) => {
		this.props.writeComment(comment, this.state.issueNumber);
		this.props.getIssueComments(this.state.issueNumber);
		return this.setState({ isOpen: true });
	}

	handleCreateIssue = () => {
		this.isOpenIssue()
		this.openIssueCreate()
	}

	render() {
		console.log("this props", this.state)

		return (
			<div className="container"
				style={{ backgroundColor: "", border: "" }}
			>
				<Modal
					isOpen={this.state.isOpen}
					onRequestClose={() => this.setState({ isOpen: false })}
					ariaHideApp={false}
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
						<button onClick={() => this.props.closeIssue(this.state.issueNumber)}>Close this issue</button>
						<h4 style={{ fontSize: 50 }}>  {this.state.issueTitle}</h4>
						{this.renderIssueUser()}
						<hr
							style={{
								color: 'red',
								height: 5,
							}}
						/>
						<p><span style={{ fontSize: "20px" }}>Content: </span><ReactMarkdown
							id="hi"
							style={{ backgroundColor: '' }}
							source={this.state.issueBody} /></p>
					</div>

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

					<div>
						{this.renderComments()}
					</div>

					<div>
						<Form>
							<Form.Group controlId="exampleForm.ControlTextarea2">
								<Form.Label>Comments</Form.Label>
								<Form.Control
									as="textarea" rows="3" placeholder="leave a comment heres"
									value={this.props.newCommentIssueCreate}
									onChange={evt => this.props.updateComment(evt)} />
								<Button onClick={() => this.handlePostComment(this.props.newCommentIssueCreate)}>Comment</Button>
							</Form.Group>
						</Form>
					</div>

				</Modal>
				<div>Something useful here (navbar for lists of issue) <button onClick={() => this.isOpenIssue()}>New Issue</button> </div>
				<div>
					<Modal
						isOpen={this.state.isOpenCreateIssue}
						onRequestClose={() => this.setState({ isOpenCreateIssue: false })}
					>
						<div>
							<Form>
								<Form.Group controlId="exampleForm.ControlInput1">
									<Form.Label>Title</Form.Label>
									<Form.Control type="text" placeholder="title here"
										value={this.props.newTitleCreate}
										onChange={evt => this.props.updateTitle(evt)}
									/>
								</Form.Group>
								<Form.Group controlId="exampleForm.ControlTextarea1">
									<Form.Label>Comments</Form.Label>
									<Form.Control
										as="textarea" rows="3" placeholder="leave a comment heres"
										value={this.props.newCommentIssueCreate}
										onChange={evt => this.props.updateComment(evt)} />
									<Button onClick={() => this.handlePostIssue(this.props.newTitleCreate, this.props.newCommentIssueCreate)}>Submit issues</Button>
								</Form.Group>
							</Form>
						</div>
					</Modal>
				</div>

				<div>{this.renderRepos()}</div>
			
			</div>
		)
	}
}

export default RenderRepo;

