import React from 'react';
import '../App.css';
import { Button } from 'react-bootstrap';


class RenderSearchRepo extends React.Component {
    renderSearchResults = () => {
        return this.props.listRepo.map(repo => {
            return (
                <li><a href="#  " onClick={() => this.props.getRepo(repo.full_name)}>{repo.full_name}</a></li>
            )


        })
    }
    render() {
        return (
            <div className="row" style={{backgroundColor:"pink"}}>
                <div className="col-2">Your are looking at repos</div>
                <div className="col-10" style={{ backgroundColor: "red" }}>
                    <div>{this.renderSearchResults()}</div>
                </div>
            </div>
        )
    }
}


export default RenderSearchRepo;
