import React from 'react';
import '../App.css';
import {
    Button,
    Form,
    FormControl,
    DropdownButton,
    Dropdown,
    Row,
    Card,
    Col,
    Badge
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
            isOpen: false,
            isOpenCreateIssue: false
        }
    }
    
    handleCloseModal = () => {
        this.setState({ isOpen: false });
    }
    handleModal = (number, title, body) => {
        this.props.getIssueComments(number)
        this.renderComments()
        this.openModal()

        this.setState({ issueTitle: title, issueBody: body })
    }

    openModal = () => {
        this.setState({ isOpen: true });
    }

    renderComments = () => {
        return this.props.comments.map(comment => {
            return (
                <div className="comment">
                    <div className="commentUser"><div><img src={`${comment.user.avatar_url}`} height="50px" width="50px" /></div><div><h5 style={{ paddingLeft: "1rem" }}>     {comment.user.login}:</h5></div>  </div>
                    <div className="commentContent"><ReactMarkdown source={comment.body} /></div>
                </div>
            )
        })
    }
    renderRepos = () => {
        return this.props.issues.map((issue, idx) => {
            return (
                <div className="mb-4 py-4" style={{ borderBottom: "1px solid #e1e4e8" }} onClick={() => this.handleModal(issue.number, issue.title, issue.body)}>
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
                            <ReactMarkdown className="text-black-50 mt-3" source={issue.body.substr(0, 250) + "..."} />
                            <div>{this.labels(issue.labels)} </div>
                        </Col>
                        <Col className="col-1">
                            <img src={issue.user.avatar_url} style={{ width: 50, height: "auto", borderRadius: "5px" }} />
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
                <Badge style={{backgroundColor:`#${value.color}`}}>{value.name}</Badge>
            )
        })
    }
    
   
   
    isOpenIssue = () => {
        console.log('isOpenIssue')
        this.setState({ isOpenCreateIssue: true });
    }
    
    handleCreateIssue=()=>{
        this.isOpenIssue()
        this.openIssueCreate()
        console.log('handleCreateIssue')
    }
    // handleInputTitleCreateIssue()=>{
        
    // }
    render() {
      

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
                        <h4 style={{ fontSize: 50 }}> Issue: {this.state.issueTitle}</h4>
                        <hr
                            style={{
                                color: 'red',
                                height: 5,
                            }}
                        />
                        <p><span style={{ fontSize: "25px" }}>Content: </span><ReactMarkdown
                            id="hi"
                            style={{ backgroundColor: '' }}
                            source={this.state.issueBody} /></p>
                    </div>
                    <div>
                        {this.renderComments()}
                    </div>

                </Modal>
                <div>Something useful here (navbar for lists of issue) <button onClick={()=>this.isOpenIssue()}>New Issue</button> </div>
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
                            <Button onClick={()=>this.props.writeIssues(this.props.newTitleCreate,this.props.newCommentIssueCreate)}>Submit issues</Button>
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

