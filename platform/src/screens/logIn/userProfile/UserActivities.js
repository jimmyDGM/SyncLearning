import React from 'react';
import { connect } from 'react-redux'
import {Container} from './ProfileStyle'

class UserActivities extends React.Component {

	constructor(props) {
		super(props);
		this.state={

		}
	}

	render() {
		return (

			<Container>
					
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
    return{
		currentProject: state.currentProject,
        level:state.level,
        baseApi : state.baseApi
    }
}

export default connect(mapStateToProps)(UserActivities)
