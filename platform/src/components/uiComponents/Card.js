import React from 'react';

export default class Card extends React.Component {

	render() {
		return (
			<div style={styles.card} >
				<img src={this.props.imageUrl}  style={{width:'200px'}} height='150px' alt=''/>
				<div>
					<p style={{width:'200px'}} >{this.props.name} </p>
				</div>
				
			</div>
		);
	}
}

const styles = {
	card: {
		textAlign:'center',
		borderRadius: '10px',
		boxShadow: '1px 1px 4px rgba(0,0,0,0.1)',
		width: '100%',
		height: '200px',
		padding: '2%',
		margin: '2%'
	}
}