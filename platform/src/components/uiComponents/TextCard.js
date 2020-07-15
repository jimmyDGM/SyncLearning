import React from 'react';
import styled from 'styled-components'

export default class TextCard extends React.Component {

	render() {
		let description = this.props.description.slice(0,60)
		return (
			<Card>
                
					<h3 style={styles.description} >{this.props.name} </h3>
                <div >
					<p>{description} ...</p>
				</div>
			</Card>
		);
	}
}

const styles = {
	card: {
		width: '10%',
		textAlign:'center',
    },
    description: {
		color:'#252525',
        
    },
    descriptionContainer: {
        width:'900%'
    }
}

const Card = styled.div`
    text-align: center;
    width: 100%;
    padding: 2%;
	color: #cccccc;
	border: 2px solid #cccccc;
	border-radius: 10px;


`