import React from 'react';
import '../App.css';
import { Button } from 'react-bootstrap';


class RenderSearchRepo extends React.Component {
    renderSearchResults =() => {
        return this.props.listRepo.map(repo=> {
return (
    <li><a href="#  " onClick={()=> this.props.getRepo(repo.full_name)}>{repo.full_name}</a></li>
)


    })
    }
    render(){
        return(
<div>{this.renderSearchResults()}</div>
        )
    }
    }


    export default RenderSearchRepo;
