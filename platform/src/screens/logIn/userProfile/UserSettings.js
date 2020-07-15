import React from 'react';
import UserTimeLine from './UserTimeLine'
import { connect } from 'react-redux'
import {ProfileInputs, EditButton, ProfilePicture, TextContainer, TimePoint, Endorsment, DateBubble, Container} from './ProfileStyle'
const axios = require('axios');

class UserProfile extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			
		}
	}
    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value })
	}
	

	handleSet() {
		// let settings = {}
		// settings.availability= {
		// 		days=[], time=[{}]
		// }
		
		axios.post(this.props.baseApi+'api/user/settings', this.state)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
	}

	render() {
		return (

			<Container>
				 <h2>availability</h2>
				 <div>
				 from
				<input type='time' id='from' onChange={e => this.handleChange(e)} />
				 </div>
				<div>
				to :
				<input type='time' id='to' onChange={e => this.handleChange(e)}/>
				</div>

				<button onClick={e => this.handleSet(e)} >Add</button>
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

export default connect(mapStateToProps)(UserProfile)

