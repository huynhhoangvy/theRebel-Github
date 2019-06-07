import React from "react";
import "../App.css";
import {
  Button,
  Form,
  FormControl,
  DropdownButton,
  Dropdown,
  Row,
  Card,
  Col
} from "react-bootstrap";
const ReactMarkdown = require("react-markdown");

class RenderRepo extends React.Component {
  renderRepos = () => {
    return this.props.issues.map(
      ({ title, number, created_at, user, comments, body }) => {
        return (
            <div className="mb-4" style={{borderBottom: "1px solid #e1e4e8"}}>
              <Row>
                <Col className="col-11">
                  <h4 className="mb-1">
                    <a href="#" style={{ color: "" }}>
                      #{number} {title}
                    </a>
                  </h4>
                  <small>
                    <cite title="Source Title">{created_at}</cite> by @
                    {user.login} Number of comments: {comments}
                  </small>
                  <ReactMarkdown className="text-black-50 mt-3" source={body.substr(0, 250) + "..."} />
                </Col>
                <Col className="col-1">avatar</Col>
              </Row>
            </div>
        );
      }
    );
  };
  render() {
    return (
      <div
        className="container"
        style={{ backgroundColor: "", border: "" }}
      >
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
