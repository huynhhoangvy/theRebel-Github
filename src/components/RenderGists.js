import React from 'react';
import '../App.css';
import EmbeddedGist from './EmbeddedGist.js'

class RenderGists extends React.Component {

	renderGists = () => {
		return this.props.gists.map(gist => {
			return (
				<div>
					<h4>{gist.owner.login}/{Object.keys(gist.files)[0]}</h4>
					<EmbeddedGist
						gist={gist.owner.login + "/" + gist.id}
						file={Object.keys(gist.files)[0]}
					/>
					<hr />
				</div>
			)
		})
	}
	render() {

		return (
			<div>
				<div style={{ textAlign: "center" }}><img alt="" src={`${this.props.gists[0].owner.avatar_url}`} height='150px' /></div>
				<div style={{ textAlign: "center" }}>{this.props.gists[0].owner.login}</div>

				{this.renderGists()}</div>
		)
	}
};

export default RenderGists;
