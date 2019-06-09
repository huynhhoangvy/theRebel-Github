import Modal from 'react-modal';
import React from 'react';
import '../App.css';
import { Card, Col, Row, Button, ListGroup, Badge, Dropdown, DropdownButton, Tab, Tabs, Sonnet } from 'react-bootstrap';
var moment = require('moment');
var numeral = require('numeral');


class RenderSearchRepo extends React.Component {
    renderSearchResults = () => {
        return this.props.listRepo.map(({ full_name, description, updated_at, language, stargazers_count }) => {
            return (
                <div className="w-100 py-4 border-bottom">
                            <Row>
                                <Col className="col-7">
                                    <a href="#" onClick={() => this.props.getRepo(full_name,1)}><h3>{full_name}</h3></a>
                                </Col>
                                <Col className="col-3">
                                    <p>
                                    {language === "JavaScript"? "🟡" : "🔵" } 
                                     {language}
                                    </p>
                                </Col>
                                <Col className="col-2">
                                    <span >★ {numeral(stargazers_count).format('0.0a')}</span>
                                </Col>
                            </Row>
                    <div>
                        <div>
                            <p className="text-secondary pt-2">
                                {description}
                            </p>
                            <footer>
                               <small title="Source Title"> Updated {moment(updated_at).startOf().fromNow()}</small>
                            </footer>
                        </div>
                    </div>
                </div>
            )
        })
    }
    render() {                              // have no idea how to apply a certain style to one same tag, ex: listgroup.item
        return (
            <Row>
                {this.props.totalResult ? 
                <Col className="col-3" style={{padding: "0px 30px"}}>
                {/* <div> */}
                    <ListGroup className="mb-3" style={{fontSize: "14px"}}>
                        <ListGroup.Item  className="d-flex justify-content-between" style={{padding: "8px 10px"}}><strong><a href="#" style={{textDecoration: "none", color: "black"}}>Repositories </a></strong><Badge pill variant="secondary" style={{margin: "4px 0 0 4px"}}>887K</Badge></ListGroup.Item>
                        <ListGroup.Item  className="d-flex justify-content-between" style={{padding: "8px 10px"}}><a href="#" style={{textDecoration: "none",}}>Code </a><Badge pill variant="secondary" style={{margin: "4px 0 0 4px"}}>49M+</Badge></ListGroup.Item>
                        <ListGroup.Item  className="d-flex justify-content-between" style={{padding: "8px 10px"}}><a href="#" style={{textDecoration: "none",}}>Commits </a><Badge pill variant="secondary" style={{margin: "4px 0 0 4px"}}>49M+</Badge></ListGroup.Item>
                        <ListGroup.Item  className="d-flex justify-content-between" style={{padding: "8px 10px"}}><a href="#" style={{textDecoration: "none",}}>Issues </a><Badge pill variant="secondary" style={{margin: "4px 0 0 4px"}}>1M</Badge></ListGroup.Item>
                        <ListGroup.Item  className="d-flex justify-content-between" style={{padding: "8px 10px"}}><a href="#" style={{textDecoration: "none",}}>Packages </a><Badge pill variant="secondary" style={{margin: "4px 0 0 4px"}}>2</Badge></ListGroup.Item>
                        <ListGroup.Item  className="d-flex justify-content-between" style={{padding: "8px 10px"}}><a href="#" style={{textDecoration: "none",}}>Marketplace </a><Badge pill variant="secondary" style={{margin: "4px 0 0 4px"}}>3</Badge></ListGroup.Item>
                        <ListGroup.Item  className="d-flex justify-content-between" style={{padding: "8px 10px"}}><a href="#" style={{textDecoration: "none",}}>Topics </a><Badge pill variant="secondary" style={{margin: "4px 0 0 4px"}}>3K</Badge></ListGroup.Item>
                        <ListGroup.Item  className="d-flex justify-content-between" style={{padding: "8px 10px"}}><a href="#" style={{textDecoration: "none",}}>Wikis </a><Badge pill variant="secondary" style={{margin: "4px 0 0 4px"}}>39K</Badge></ListGroup.Item>
                        <ListGroup.Item  className="d-flex justify-content-between" style={{padding: "8px 10px"}}><a href="#" style={{textDecoration: "none",}}>Users </a><Badge pill variant="secondary" style={{margin: "4px 0 0 4px"}}>19K</Badge></ListGroup.Item>
                    </ListGroup>
                    <ListGroup>
                        <ListGroup.Item style={{ fontSize: "14px", borderBottom: "none", padding: "16px 16px 8px"}}><strong>Languages</strong></ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between" style={{fontSize: "12px", borderBottom: "none", borderTop: "none", padding: "4px 20px 6px"}}><a href="#" style={{textDecoration: "none", color: "black"}}>JavaScript</a><b>659,086</b></ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between" style={{fontSize: "12px", borderBottom: "none", borderTop: "none", padding: "4px 20px 6px"}}><a href="#" style={{textDecoration: "none", color: "black"}}>HTML</a><b>30,185</b></ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between" style={{fontSize: "12px", borderBottom: "none", borderTop: "none", padding: "4px 20px 6px"}}><a href="#" style={{textDecoration: "none", color: "black"}}>TypeScript</a><b>25,866</b></ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between" style={{fontSize: "12px", borderBottom: "none", borderTop: "none", padding: "4px 20px 6px"}}><a href="#" style={{textDecoration: "none", color: "black"}}>CSS</a><b>22,132</b></ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between" style={{fontSize: "12px", borderBottom: "none", borderTop: "none", padding: "4px 20px 6px"}}><a href="#" style={{textDecoration: "none", color: "black"}}>Objecti-C</a><b>17,410</b></ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between" style={{fontSize: "12px", borderBottom: "none", borderTop: "none", padding: "4px 20px 6px"}}><a href="#" style={{textDecoration: "none", color: "black"}}>Java</a><b>11,232</b></ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between" style={{fontSize: "12px", borderBottom: "none", borderTop: "none", padding: "4px 20px 6px"}}><a href="#" style={{textDecoration: "none", color: "black"}}>Ruby</a><b>8,598</b></ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between" style={{fontSize: "12px", borderBottom: "none", borderTop: "none", padding: "4px 20px 6px"}}><a href="#" style={{textDecoration: "none", color: "black"}}>Python</a><b>4,008</b></ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between" style={{fontSize: "12px", borderBottom: "none", borderTop: "none", padding: "4px 20px 6px"}}><a href="#" style={{textDecoration: "none", color: "black"}}>PHP</a><b>3,522</b></ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between" style={{fontSize: "12px", borderTop: "none", padding: "4px 20px 6px 20px"}}><a href="#" style={{textDecoration: "none", color: "black"}}>C#</a><b>2,393</b></ListGroup.Item>
                    </ListGroup>
                {/* </div> */}
                </Col>
                    : ""}
                <Col className="col-9 px-2">
                    <Row  className="mx-3">
                    {this.props.totalResult ? 
                    <div className="d-flex justify-content-between w-100">
                        {/* <div className="Box p-3 mb-4 d-flex" style={{border: "1px solid rgba(0,0,0,.125)", borderRadius: ".25rem"}}>
                            <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png" width={64} height={64} className="d-block rounded-1 mr-3 flex-shrink-0" alt="react logo" />
                            <div className="d-md-flex flex-items-start flex-auto">
                            <div className="flex-auto">
                                <h3 className="mb-1">React</h3>
                                <p>React is an open source JavaScript library used for designing user interfaces.</p>
                                <a className="text-small" href="/topics/react">See topic</a>
                            </div>
                            <div className="d-inline-block js-toggler-container starring-container ">
                                <button className="btn btn-sm js-toggler-target" type="submit" value="Unstar" aria-label="Unstar this topic" title="Unstar react" data-ga-click="Topic, click unstar button, action:codesearch#index; text:Unstar">
                                    <svg className="octicon octicon-star mr-1" viewBox="0 0 14 16" version="1.1" width={14} height={16} aria-hidden="true"><path fillRule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z" /></svg>Unstar
                                </button>
                                
                                <button className="btn btn-sm js-toggler-target" type="submit" value="Star" aria-label="Star this topic" title="Star react" data-ga-click="Topic, click star button, action:codesearch#index; text:Star">
                                    <svg className="octicon octicon-star mr-1" viewBox="0 0 14 16" version="1.1" width={14} height={16} aria-hidden="true"><path fillRule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z" /></svg>Star
                                </button>
                            </div>
                            </div>
                        </div> */}
                        <h4>{numeral(this.props.totalResult).format('0,0') + " repository results"}</h4>
                        <DropdownButton id="dropdown-variants-secondary" variant="secondary" title="Sort: Best match">
                            <Dropdown.Item href="#/action-1">Recently indexed</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Least recently indexed</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">pepe the frog</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    : ""}
                    </Row>
                    <Row className="mx-3">
                        {this.renderSearchResults()}
                    </Row>
                </Col>
            </Row>
        )
    }
}


export default RenderSearchRepo;
