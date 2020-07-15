import React from 'react';
import styled from 'styled-components'

export default class ImageCard extends React.Component {

	render() {
		return (
			<Container>
				<img src={this.props.imageUrl}  style={{width:'200px'}} height='150px' alt=''/>
				
					<h2>{this.props.name} </h2>
				
                <p>{this.props.description} </p>
				
			</Container>
		);
	}
} 

const Container = styled.div`
		text-align: center;
		width: 100%;
		padding: 2%;
`