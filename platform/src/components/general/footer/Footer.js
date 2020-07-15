import React from 'react';


export default class Footer extends React.Component {

	constructor(props) {
	  super(props);
	

	}
componentDidMount() {

}




	render() {
		return (
			<div className="menu" style= {styles.header}>

			</div>
		);
	}
}

const styles = {
	header: {
		color:'#ffffff',
		backgroundColor:'#b0d1ffaa',
		minHeight:'40px', 
		display:'flex',
		justifyContent:'space-around',
        padding: '1%',
        marginTop:'3%',
	}
}