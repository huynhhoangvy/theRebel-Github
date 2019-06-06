import React from 'react';
import '../App.css';
import { Card, Col, Row } from 'react-bootstrap';


class RenderSearchRepo extends React.Component {
    renderSearchResults = () => {
        return this.props.listRepo.map(({full_name, description, updated_at, language, stargazers_count}) => {
            return (
                <Card className="pb-5 w-100">
                <Card.Header>
                    <div>
                        <Row>
                            <Col className="col-7">
                                <a href="#  " onClick={() => this.props.getRepo(full_name)}>{full_name}</a>
                            </Col>
                            <Col className="col-3">
                                <span >{language}</span>
                            </Col>
                            <Col className="col-2">
                                <span >★{stargazers_count}</span>
                            </Col>
                        </Row>
                    </div>
                    
                    </Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                    <p>
                        {description}
                    </p>
                    <footer className="blockquote-footer">
                        Updated <cite title="Source Title">{updated_at}</cite>
                    </footer>
                    </blockquote>
                </Card.Body>
                </Card>
            )


        })
    }
    render() {
        return (
            <Row style={{backgroundColor:"gray"}}>
                <Col className="col-2" style={{backgroundColor: "blue"}}>
                    Your are looking at repos
                </Col>
            <Col className="col-10">
            <Row>
            <div className="Box p-3 d-flex w-100">
        <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png" width={64} height={64} className="d-block rounded-1 mr-3 flex-shrink-0" alt="react logo" />
        <div className="d-md-flex flex-items-start flex-auto w-100">
          <div className="flex-auto">
            <h3 className="mb-1">React</h3>
            <p>React is an open source JavaScript library used for designing user interfaces.</p>
            <a className="text-small" href="/topics/react">See topic</a>
          </div>
          <div className="d-inline-block js-toggler-container starring-container">
            {/* '"` */}{/* </textarea></xmp> */}<form className="starred" action="/topics/react/unstar" acceptCharset="UTF-8" data-remote="true" method="post"><input name="utf8" type="hidden" defaultValue="✓" /><input type="hidden" name="_method" defaultValue="delete" /><input type="hidden" name="authenticity_token" defaultValue="5F5JcnD+2OTG9umJ6Hvm89xGc7Q3l6CTx5rDiF32SXBx+Of3jB+Fs/HD7i7rNjXS0k6UwA3Lzm/ClR5aFJ/LRA==" />
              <input type="hidden" name="context" defaultValue="topic" />
              <button className="btn btn-sm js-toggler-target" type="submit" value="Unstar" aria-label="Unstar this topic" title="Unstar react" data-ga-click="Topic, click unstar button, action:codesearch#index; text:Unstar">
                <svg className="octicon octicon-star mr-1" viewBox="0 0 14 16" version="1.1" width={14} height={16} aria-hidden="true"><path fillRule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z" /></svg>Unstar
              </button>
            </form>
            {/* '"` */}{/* </textarea></xmp> */}<form className="unstarred" action="/topics/react/star" acceptCharset="UTF-8" data-remote="true" method="post"><input name="utf8" type="hidden" defaultValue="✓" /><input type="hidden" name="authenticity_token" defaultValue="I2vtMSd1rANkuZsW/lW8XK3Mbk3PN78BP9dA81EvkRP2LtGRUd1QFbES6wPckijak7kfDCdvG5t6XqZyJeceYA==" />
              <input type="hidden" name="context" defaultValue="topic" />
              <button className="btn btn-sm js-toggler-target" type="submit" value="Star" aria-label="Star this topic" title="Star react" data-ga-click="Topic, click star button, action:codesearch#index; text:Star">
                <svg className="octicon octicon-star mr-1" viewBox="0 0 14 16" version="1.1" width={14} height={16} aria-hidden="true"><path fillRule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z" /></svg>Star
              </button>
            </form></div>
        </div>
      </div>
            </Row>
            <Row style={{ backgroundColor: "red" }}>
                {this.renderSearchResults()}
            </Row>
            </Col>
            </Row>
        )
    }
}


export default RenderSearchRepo;
