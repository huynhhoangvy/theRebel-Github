import React from 'react';
import '../App.css';
import { Button, Form, FormControl } from 'react-bootstrap';
const ReactMarkdown = require('react-markdown')




class RenderRepo extends React.Component {
    renderRepos = () => {
        return this.props.issues.map(issue => {
            return (
                <card><a>{issue.number}</a>
                    <p>{issue.title}</p>
                    <ReactMarkdown source={issue.body.substr(0, 100) + "..."} />
                </card>
            )
        })
    }
    render() {
        return (
            <div style={{ backgroundColor: "red" }}>{this.renderRepos()}</div>
        )
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