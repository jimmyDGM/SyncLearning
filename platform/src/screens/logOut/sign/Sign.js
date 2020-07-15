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
					<ImageContent src='/assets/contact.svg' />
				</ImageContainer>

				<Card>

					<div style ={styles.countainer} >
						{this.state.signedUpUser ? <SignInForm/> : <SignUpForm/>}
					</div>
					<Header> 
						<h3>OR</h3> 
						<p onClick={ (e) => {this.setState({signedUpUser:!this.state.signedUpUser})}}>
						 {this.state.signedUpUser ? ' Sign Up ' : ' Sign In '}
						</p>
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
	border-right:2px solid #f7e0ff;

`

const ImageContent = styled.img`
	width:50%;

`
const Header = styled.div`
	margin-bottom: 5%;

`

const Container = styled.div`
	display:flex;
	border: 2px solid #f7e0ff;
	min-height:500px;
	margin:5%;
	text-align:center;
`
const Card = styled.div`
	width:50%;
	border-radius: 10px;
	color: #c4c8cf;
`

const styles = {
	countainer: {
		marginTop:'5%',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		

	},

}
