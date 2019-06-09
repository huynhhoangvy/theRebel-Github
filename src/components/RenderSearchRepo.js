import Modal from 'react-modal';
import React from 'react';
import '../App.css';
import {  Col, Row, ListGroup, Badge } from 'react-bootstrap';
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
                {language === "JavaScript" ? "🟡" : "🔵"}
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
        <Col className="col-3" style={{ padding: "0px 30px" }}>
          {this.props.totalResult ?
            <div>
              <ListGroup className="mb-3" style={{ fontSize: "14px" }}>
                <ListGroup.Item style={{ display: "flex", justifyContent: "space-between", padding: "8px 10px" }}><strong><a href="#" style={{ textDecoration: "none", color: "black" }}>Repositories </a></strong><Badge pill variant="secondary" style={{ margin: "4px 0 0 4px" }}>887K</Badge></ListGroup.Item>
                <ListGroup.Item style={{ display: "flex", justifyContent: "space-between", padding: "8px 10px" }}><a href="#" style={{ textDecoration: "none", }}>Code </a><Badge pill variant="secondary" style={{ margin: "4px 0 0 4px" }}>49M+</Badge></ListGroup.Item>
                <ListGroup.Item style={{ display: "flex", justifyContent: "space-between", padding: "8px 10px" }}><a href="#" style={{ textDecoration: "none", }}>Commits </a><Badge pill variant="secondary" style={{ margin: "4px 0 0 4px" }}>49M+</Badge></ListGroup.Item>
                <ListGroup.Item style={{ display: "flex", justifyContent: "space-between", padding: "8px 10px" }}><a href="#" style={{ textDecoration: "none", }}>Issues </a><Badge pill variant="secondary" style={{ margin: "4px 0 0 4px" }}>1M</Badge></ListGroup.Item>
                <ListGroup.Item style={{ display: "flex", justifyContent: "space-between", padding: "8px 10px" }}><a href="#" style={{ textDecoration: "none", }}>Packages </a><Badge pill variant="secondary" style={{ margin: "4px 0 0 4px" }}>2</Badge></ListGroup.Item>
                <ListGroup.Item style={{ display: "flex", justifyContent: "space-between", padding: "8px 10px" }}><a href="#" style={{ textDecoration: "none", }}>Marketplace </a><Badge pill variant="secondary" style={{ margin: "4px 0 0 4px" }}>3</Badge></ListGroup.Item>
                <ListGroup.Item style={{ display: "flex", justifyContent: "space-between", padding: "8px 10px" }}><a href="#" style={{ textDecoration: "none", }}>Topics </a><Badge pill variant="secondary" style={{ margin: "4px 0 0 4px" }}>3K</Badge></ListGroup.Item>
                <ListGroup.Item style={{ display: "flex", justifyContent: "space-between", padding: "8px 10px" }}><a href="#" style={{ textDecoration: "none", }}>Wikis </a><Badge pill variant="secondary" style={{ margin: "4px 0 0 4px" }}>39K</Badge></ListGroup.Item>
                <ListGroup.Item style={{ display: "flex", justifyContent: "space-between", padding: "8px 10px" }}><a href="#" style={{ textDecoration: "none", }}>Users </a><Badge pill variant="secondary" style={{ margin: "4px 0 0 4px" }}>19K</Badge></ListGroup.Item>
              </ListGroup>
              <ListGroup>
                <div>
                  <ListGroup.Item style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", borderBottom: "none", padding: "16px 16px 8px" }}><strong>Languages</strong></ListGroup.Item>
                  <ListGroup.Item style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", borderBottom: "none", borderTop: "none", padding: "4px 20px 6px" }}><a href="#" style={{ textDecoration: "none", color: "black" }}>JavaScript</a><b>659,086</b></ListGroup.Item>
                  <ListGroup.Item style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", borderBottom: "none", borderTop: "none", padding: "4px 20px 6px" }}><a href="#" style={{ textDecoration: "none", color: "black" }}>HTML</a><b>30,185</b></ListGroup.Item>
                  <ListGroup.Item style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", borderBottom: "none", borderTop: "none", padding: "4px 20px 6px" }}><a href="#" style={{ textDecoration: "none", color: "black" }}>TypeScript</a><b>25,866</b></ListGroup.Item>
                  <ListGroup.Item style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", borderBottom: "none", borderTop: "none", padding: "4px 20px 6px" }}><a href="#" style={{ textDecoration: "none", color: "black" }}>CSS</a><b>22,132</b></ListGroup.Item>
                  <ListGroup.Item style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", borderBottom: "none", borderTop: "none", padding: "4px 20px 6px" }}><a href="#" style={{ textDecoration: "none", color: "black" }}>Objecti-C</a><b>17,410</b></ListGroup.Item>
                  <ListGroup.Item style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", borderBottom: "none", borderTop: "none", padding: "4px 20px 6px" }}><a href="#" style={{ textDecoration: "none", color: "black" }}>Java</a><b>11,232</b></ListGroup.Item>
                  <ListGroup.Item style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", borderBottom: "none", borderTop: "none", padding: "4px 20px 6px" }}><a href="#" style={{ textDecoration: "none", color: "black" }}>Ruby</a><b>8,598</b></ListGroup.Item>
                  <ListGroup.Item style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", borderBottom: "none", borderTop: "none", padding: "4px 20px 6px" }}><a href="#" style={{ textDecoration: "none", color: "black" }}>Python</a><b>4,008</b></ListGroup.Item>
                  <ListGroup.Item style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", borderBottom: "none", borderTop: "none", padding: "4px 20px 6px" }}><a href="#" style={{ textDecoration: "none", color: "black" }}>PHP</a><b>3,522</b></ListGroup.Item>
                  <ListGroup.Item style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", borderTop: "none", padding: "4px 20px 6px 20px" }}><a href="#" style={{ textDecoration: "none", color: "black" }}>C#</a><b>2,393</b></ListGroup.Item>
                </div>
              </ListGroup>
            </div>
            : ""}
        </Col>
        <Col className="col-9 px-2">
          <Row className="mx-3">
            <h4>{this.props.totalResult ? numeral(this.props.totalResult).format('0,0') + " repository results" : ""}</h4>
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
