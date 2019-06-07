import React from 'react';
import '../App.css';
import { Card, Col, Row, Button} from 'react-bootstrap';


class RenderSearchRepo extends React.Component {
    renderSearchResults = () => {
        return this.props.listRepo.map(({ full_name, description, updated_at, language, stargazers_count }) => {
            return (
                <div className="w-100 py-4 border-bottom">
                            <Row>
                                <Col className="col-7">
                                    <a href="#" onClick={() => this.props.getRepo(full_name)}><h4>{full_name}</h4></a>
                                </Col>
                                <Col className="col-3">
                                    <p>
                                    {language === "JavaScript"? "🟡" : "🔵" } 
                                     {language}
                                    </p>
                                </Col>
                                <Col className="col-2">
                                    <span >★{stargazers_count}</span>
                                </Col>
                            </Row>
                    <div>
                        <div>
                            <p className="text-secondary">
                                {description}
                            </p>
                            <footer>
                               <small title="Source Title"> Updated {updated_at}</small>
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
                <Col className="col-2 px-2" style={{ backgroundColor: "blue" }}>
                    Your are looking at repos
                </Col>
                <Col className="col-10 px-2">
                    <Row style={{ border: "1px solid #d1d5da", borderRadius: "5px"}} className="mx-3">
                        <div className="Box p-3 d-flex w-100" >
                            <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png" width={64} height={64} className="d-block rounded-1 mr-3 flex-shrink-0" alt="react logo" />
                            <div className="d-md-flex flex-items-start flex-auto w-100 row">
                                <div className="flex-auto col-10">
                                    <h3 className="mb-1">React</h3>
                                    <p>React is an open source JavaScript library used for designing user interfaces.</p>
                                    <a className="text-small" href="/topics/react">See topic</a>
                                </div>
                                <div className="col" ><Button style={{ border: "1px solid #d1d5da", borderRadius: "5px"}} variant="light" size="sm">★ Star</Button></div>
                            </div>
                        </div>
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
