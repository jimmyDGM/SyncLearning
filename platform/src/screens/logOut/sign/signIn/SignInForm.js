import React, { Fragment } from 'react';
import styled from 'styled-components';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux'

const axios = require('axios');

class SignInForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name: '',
			eMail: '',
			pswd: '',
			confirmedpswd: '',
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		axios.post(this.props.baseApi+'api/authenticate/', this.state)
			.then(res => {
				console.log(res)
				if (res.status === 200) {
					document.cookie = res.data.token
					window.location.replace("/UserProfile");
					return <Redirect to="/UserProfile" />;
				  } else {
					const error = new Error(res.error);
					throw error;
				  }
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	render() {
		return (
			<Fragment>
				<FormContainer onSubmit={this.handleSubmit}>
					<label>mail</label>
					<SignInputs type="mail" id="eMail" onChange={this.handleChange} />
					<label>password</label>
					<SignInputs type="password" id='pswd' onChange={this.handleChange} />
					<SignButton>Sign In</SignButton>
				</FormContainer>
			</Fragment>
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

export default connect(mapStateToProps)(SignInForm)

const FormContainer = styled.form`
		text-align: center;
		width: 40%;
		display: flex;
		flex-direction: column;
	
`
const SignInputs = styled.input`
		height: 20px;

		margin: 2%;
		border-radius:10px;
		font-size:15px;
`
const SignButton = styled.button`
	width:60%;
	height: 35px;
    margin:30px;  
	background-color:#fcc0cd;
	border-radius: 20px;
	align-self:center;

	
`