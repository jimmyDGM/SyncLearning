import React,{ Fragment }from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux'

const axios = require('axios');

class SignUpForm extends React.Component {
		constructor(props) {
    super(props);
  
    this.state = {
      name: '',
      eMail : '',
      pswd : '',
      confirmedpswd : '',
    }
  }

	handleChange = (e) => {

		this.setState({
			[e.target.id] : e.target.value
		})
	}
	handleSubmit = (e) => {
		e.preventDefault();
		if(this.state.pswd.length > 7 && this.state.eMail.length > 5 && this.state.name.length >1) {

			if(this.state.pswd === this.state.confirmedpswd) {
				axios.post(this.props.baseApi+'api/register/', this.state)
				.then(res => {
					console.log(res)
					if (res.status === 200) {
						document.cookie = res.data.token
						window.location.replace("/UserProfile");
						return true;
					  } else {
						const error = new Error(res.error);
						throw error;
					  }
				})
				.catch(function (error) {
				  console.log(error);
				});
			} else {
	
				alert('passwords doesnt match')
			}
		} else {
			alert('passwords must be at least 8 charachter long')
		}
	}

	render() {
		return (
			<Fragment>
				<FormContainer onSubmit={this.handleSubmit}>
					<Label>user name</Label>
					<SignInputs type="text" id="name" onChange={this.handleChange}/>
					<Label>mail</Label>
					<SignInputs type="mail" id="eMail" onChange={this.handleChange}/>
					<Label>password</Label>
					<SignInputs type="password" id='pswd' onChange={this.handleChange}/>
					<Label>confirm password</Label>
					<SignInputs type="password" id='confirmedpswd' onChange={this.handleChange}/>
					<SignButton>Sign Up</SignButton>
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

export default connect(mapStateToProps)(SignUpForm)

const FormContainer = styled.form`
		text-align: center;
		width: 40%;
		display: flex;
		flex-direction: column;
	
`
const Label = styled.label`
	margin-top: 20px;
	
`

const SignInputs = styled.input`
		height: 20px;

		margin: 2%;
		border-radius:10px;
		font-size:15px;
`

const SignButton = styled.button`
	width:50%;
	height: 35px;
    margin:30px;  
	background-color: rgba(176, 209, 255, 0.667);
	border-radius: 20px;
	align-self:center;

	
`