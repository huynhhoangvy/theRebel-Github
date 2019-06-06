import React from 'react';
import '../App.css';
import { Button, Form, FormControl } from 'react-bootstrap';
var moment = require('moment');


class Search extends React.Component {
    

    render()  {
    return (
        <div>
        <Form >
        <input value={this.props.searchInput} onChange={evt => this.props.updateInputValue(evt)}/>
          <Button onClick={() => this.props.getSearchRepo(this.props.searchInput)}>SEARCH</Button>
        </Form>
        </div>
        
            )
    }
}



    export default Search;


    //             <Button variant="outline-info" onClick={() => this.getSearchedMovies(1, this.state.searchInput)}>Search on TMDB</Button>

    //            <Button variant="outline-info" style={{ marginLeft: "5px" }} onClick={this.getSearchLocal}>Searcf for Users</Button>



    // (
    //     <Form inline>
    //         <FormControl required type="text" placeholder="Search User or Repositories" value="" className="mr-sm-2" onChange={this.props.getSearchInput} />
    //         <Button variant="outline-info" style={{ marginLeft: "5px" }} >Search for Repo</Button>
    //         <Button variant="outline-info" style={{ marginLeft: "5px" }} >Searcf for Users</Button>

    //     </Form>
    //     )