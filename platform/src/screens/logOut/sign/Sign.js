import React from 'react';
import SignInForm from './signIn/SignInForm.js';
import SignUpForm from './signUp/SignUpForm.js'
import styled from 'styled-components';
import { connect } from 'react-redux'


class SignScreen extends React.Component {
constructor(props) {
  super(props);

  this.state = {
  	signedUpUser : true
  };
}

	render() {
		return (
			<Container>
				
				<ImageContainer>
					<h2>Join Us</h2>
					<ImageContent src={require('./../../../assets/images/synclogo.png')} />
				</ImageContainer>

				<Card>

					<div style ={styles.countainer} >
						{this.state.signedUpUser ? <SignInForm/> : <SignUpForm/>}
					</div>
					<Header> 
						<h3>OR</h3> 
						<SignButton onClick={ (e) => {this.setState({signedUpUser:!this.state.signedUpUser})}}>
						 {this.state.signedUpUser ? ' Sign Up ' : ' Sign In '}
						</SignButton>
					</Header>
				</Card>
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

export default connect(mapStateToProps)(SignScreen)

const ImageContainer = styled.div`
	width:50%;

`

const ImageContent = styled.img`
	width:50%;

`
const Header = styled.div`
	margin-bottom: 5%;

`

const Container = styled.div`
	border: 2px solid #f7e0ff;
	display: grid;
	min-height:500px;
	margin:5%;
	text-align:center;
	justify-items: center;
`
const Card = styled.div`
	width:50%;
	border-radius: 10px;
	color: #c4c8cf;
`
const SignButton = styled.button`
	width:20%;
	height: 35px;
    margin:30px;  
	background-color: rgba(176, 209, 255, 0.667);
	border-radius: 20px;
	align-self:center;

	
`

const styles = {
	countainer: {
		marginTop:'5%',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		

	},

}
