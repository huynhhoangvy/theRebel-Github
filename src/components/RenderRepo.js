import React from 'react';
import '../App.css';
import { Button, Form, FormControl } from 'react-bootstrap';
import Modal from 'react-modal'
const ReactMarkdown = require('react-markdown')



class RenderRepo extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            issueTitle:'test',
            issueBody:'',
            isOpen: false }
    }

    handleCloseModal = () => {
        this.setState({ isOpen: false });
    }


    handleModal = (number,title,body) => {
        this.props.getIssueComments(number)
        this.renderComments()
        this.openModal()
     
        this.setState({issueTitle:title,issueBody:body})
    }

    openModal = () => {
        this.setState({ isOpen: true });
    }

renderComments = () => {
    return this.props.comments.map(comment => {
        return (
            <div className="comment"> 
              <div className="commentUser"><h5>{comment.user.login}:</h5>  </div>
                <ReactMarkdown source={comment.body} />
            </div>
        )
    })
}


    renderRepos = () => {
        return this.props.issues.map(issue => {
            return (
                <div onClick={()=>this.handleModal(issue.number,issue.title,issue.body)}>
                    <div className="card"><a>{issue.number}</a>
                        <p>{issue.title}</p>
                        <ReactMarkdown source={issue.body.substr(0, 100) + "..."} />
                    </div>
                </div>
            )
        })
    }
    render() {
        console.log("state title",this.state)

        return (
            <div>
                <Modal
                    isOpen={this.state.isOpen}
                    onRequestClose={() => this.setState({ isOpen: false })}
                    ariaHideApp={false}
                    style={{
                        overlay:{
                          backgroundColor:"rgba(244, 247, 252, 0.3)",
                          top: '0%',
                          left: '0%',
                          right: '0%',
                          bottom: '0%',
                          marginRight: '-10%',
                        },
                        content : {
                          top: '15%',
                          left: '10%',
                          right: '10%',
                          bottom: '10%',
                          marginRight: '10%',
                          backgroundColor:"rgba(244, 247, 252, 1)",
                          border:"none",
                        }
                      }}
                >
                    <div>
                    <h4>Issue: {this.state.issueTitle}</h4>
                    <p>Content: <ReactMarkdown source={this.state.issueBody} /></p>
                    </div>
                    <div>
                    {this.renderComments()}
                    </div>

                </Modal>





                <div>Something useful here (navbar for lists of issue) <button>New Issue</button> </div>
                <div style={{ backgroundColor: "red" }}>{this.renderRepos()}</div>
            </div>
        )
    }
}


export default RenderRepo;

