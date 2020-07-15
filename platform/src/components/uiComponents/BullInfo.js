import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';

export default class BullInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			renderBull: false,
			style: 'none'
		}
	}



	render() {
		return (
			<Container onMouseOver={e => this.setState({ style: 'flex' })} onMouseLeave={e => this.setState({ style: 'none' })} >
				<div style={{ display: this.state.style }} >
					<Card>
						<p>{this.props.text} </p>
						<a href={this.props.url} target="_blank">learn more</a>
					</Card>
				</div>
				<div style= {{textAlign:'center'}}>
				<h3>{this.props.title} </h3>

				</div>
			
			</Container>
		);
	}
}


const Container = styled.div`
	justify-content: center;
`

const Card = styled.div`
	text-align: center;
	padding: 5px;
	border:2px solid #cccccc;
	position:absolute;
	z-index: 20;
	background-color:white;
	margin-top: 45px;
	align-self:center ;
	color: #999;
	
	button {
		position:absolute;
		top: 0;
		right:0;
	}

	p {
		margin: 2px;
	}

	h3 {
		margin:2px;
	}

`