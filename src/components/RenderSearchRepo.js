import Modal from 'react-modal';
import React from 'react';
import '../App.css';
import { Card, Col, Row, Button, ListGroup } from 'react-bootstrap';
var moment = require('moment');
var numeral = require('numeral');


class RenderSearchRepo extends React.Component {
  renderSearchResults = () => {
    return this.props.listRepo.map(({ full_name, description, updated_at, language, stargazers_count }) => {
      return (
        <div className="w-100 py-4 border-bottom">
          <Row>
            <Col className="col-7">
              <a href="#" onClick={() => this.props.getRepo(full_name)}><h3>{full_name}</h3></a>
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
  render() {
    return (
      <Row>
        <Col className="col-2 px-2" style={{ backgroundColor: "" }}>
          {this.props.totalResult ?
            <div>
              <ListGroup className="mb-2">
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
              </ListGroup>
              <ListGroup>
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
              </ListGroup>
            </div>
            : ""}
        </Col>
        <Col className="col-10 px-2">
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
