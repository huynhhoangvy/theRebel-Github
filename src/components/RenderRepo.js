import React from "react";
import "../App.css";
import { Button, Form, FormControl, DropdownButton, Dropdown, Row, Card } from "react-bootstrap";
const ReactMarkdown = require("react-markdown");

class RenderRepo extends React.Component {
  renderRepos = () => {
    return this.props.issues.map(({title, number, created_at, user, comments, body }) => {
      return (
        <div style={{backgroundColor: "gray"}}>
            {/* <Row style={{backgroundColor: "cyan"}}>
              
              <a href="#">{title}</a>
                
              <a>{number}</a>
                
              <ReactMarkdown source={body.substr(0, 100) + "..."} />
                
            </Row> */}
            <Card className="pb-5 w-100">
            <Card.Header>
              <a href="#">
                <h2>
              {title}    
              </h2>
              </a>
            </Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                <p>
                <ReactMarkdown source={body.substr(0, 200) + "..."} />
                </p>
                <footer className="blockquote-footer">
                  <p>
                    #{number} opened <cite title="Source Title">{created_at}</cite> by {user.login}
                  </p>
                  <a>
                  Number of comments: {comments}<i class="fas fa-comment-alt"></i>
                  </a>
                </footer>
                </blockquote>
            </Card.Body>
            </Card>
        </div>
      );
    });
  };
  render() {
    return( 
    <div className="container" style={{ backgroundColor: "" }}>
      {this.renderRepos()}
    </div>
    );
  }
}

export default RenderRepo;

//             <Button variant="outline-info" onClick={() => this.getSearchedMovies(1, this.state.searchInput)}>Search on TMDB</Button>

//            <Button variant="outline-info" style={{ marginLeft: "5px" }} onClick={this.getSearchLocal}>Searcf for Users</Button>
//     <Form inline>
//     <FormControl required type="text" placeholder="Search User or Repositories" value="" className="mr-sm-2" onChange={this.props.getSearchInput} />
//     <Button variant="outline-info" style={{ marginLeft: "5px" }} >Search for Repo</Button>
//     <Button variant="outline-info" style={{ marginLeft: "5px" }} >Searcf for Users</Button>

// </Form>
