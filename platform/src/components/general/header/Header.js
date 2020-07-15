import React from 'react';
import DesckstopLogedOutMenu from '../menu/desckstopLogedOutMenu.js';
import DesckstopLogedInMenu from '../menu/desckstopLogedInMenu.js';
import { setProject } from '../../../store/actions/actions'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import styled from 'styled-components'

//const axios = require('axios')


class Header extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			auth: false,
			projects: [],
			change:false,
			current:0,
		};
	}
	componentDidMount() {

		// axios.get(this.props.baseApi + 'api/checkToken')
		// .then(res => {
		// 	if (res.status === 200) {
		// 		this.fetchProjects()

		// 		this.setState({ auth: true });
		// 	} else {
		// 		this.setState({ auth: false });
		// 		const error = new Error(res.error);
		// 		throw error;
		// 	}
		// })
		// .catch(err => {
		// 	console.error(err);
		// });
	}

	fetchProjects() {
		// axios.get(this.props.baseApi + 'api/user/data')
		// .then(res => {

		// 	this.setState({ projects: res.data.projects })
		// })
		// .catch(err => {
		// 	console.error(err);
		// });
	}

	handleChange(e) {
		this.setState({current: e.target.value, change: false})
		this.props.setProject({name: this.state.projects[e.target.value].name, _id: this.state.projects[e.target.value].uuid})
	}

	handleClick(e) {
		if(this.state.projects.length > 0 && this.props.currentProject === '') {
			this.props.setProject({name: this.state.projects[0].name, _id: this.state.projects[0].uuid})

		}
		this.setState({change:true})
	}

	renderProjectSelection(selection) {
//TODO create custom select
		var options = selection.map((opt, i) => {
			return (
				<option value={i} key={i} >{opt.name}</option>
			)
		})
		return (
			<select onChange={e => this.handleChange(e)} >

				<option>select</option>

				{options}
			</select>
		)
	}


	renderCurrentProject() {

		if(this.state.projects.length > 0) {
			return(
				<p onClick={e => this.handleClick(e)} >{this.state.projects[this.state.current].name} </p>
			)
		} else {
			return (
				<Link className="pages" to="/SocialContract"> <p style={styles.text}>Launch a project</p> </Link>

			)
		}

	}


	render() {
		return (
			<header className="menu" style={styles.header}>
				{this.state.auth
					? <div style={{ display: 'flex', justifyContent: 'space-around', }} >
						<Container>
					
							{this.state.change 
							? this.renderProjectSelection(this.state.projects)
							: this.renderCurrentProject()}

						</Container>
						<DesckstopLogedInMenu />
						<div style={{ marginLeft: '20%', paddingTop: '5px' }}>
							<img src='/assets/ic_reorder.png' alt='burger menu icon' onClick={e => this.props.openLateral()} />
						</div>
					</div>

					: <DesckstopLogedOutMenu />

				}

			</header>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentProject: state.currentProject,
		level: state.level,
		baseApi: state.baseApi
	}
}

const mapDispatchToProps = (dispatch) => {
	
	return {
		setProject: (content) => dispatch(setProject(content))
	}
  }

export default connect(mapStateToProps, mapDispatchToProps)(Header)

const styles = {
	header: {
		color: '#ffffff',
		backgroundColor: '#b0d1ffaa',
		minHeight: '40px',
		display: 'flex',
		justifyContent: 'space-around',
		padding: '1%',
	}
}

const Container = styled.div`
margin-right: 10%;
 margin-top: 1%; 
 display: flex;
  min-width:90px;
  text-align: center; 
  border: 2px solid white;
  border-radius: 10px;
  padding: 1%;
  p {
	  margin:0;
  }
   a {
	   color:white;
	   text-decoration: none;
   }
	
`