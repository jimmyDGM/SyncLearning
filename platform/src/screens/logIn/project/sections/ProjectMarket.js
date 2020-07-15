import React, {Fragment} from 'react';
import styled from 'styled-components'
const axios = require('axios');

//import Generator from '../../../features/form/generator/Generator'
export default class ProjectMarket extends React.Component {

    handleChange(e) {
		this.setState({
			[e.target.id]:e.target.value
		}, e => console.log(this.state))
	}

    handleSubmit(e) {
        e.preventDefault();
		var url = window.location.href;
		var splitedUrl = url.split('/')		
		axios.post('/api/Project/Info/' + splitedUrl[4], this.state)
		.then((response) => {
			console.log(response.data)
		})
		.catch((error) => {
			console.log(error);
		});
    }
	render() {
		return (
			<Fragment>
                <ModifyButton>modify</ModifyButton>
            <Container>
            <FormContainer>
                <label>discribe your perfect customer</label>
                <LargeInputs  id='discribe' onChange={e => this.handleChange(e)} type='text'/>
                <label>segment</label>
                <LargeInputs  id='segment' onChange={e => this.handleChange(e)} type='text'/>
                <label>competition</label>
                <LargeInputs  id='competition' onChange={e => this.handleChange(e)} type='text'/>
                <label>value proposition</label>
                <LargeInputs  id='value' onChange={e => this.handleChange(e)} type='text'/>
                <ModifyButton onClick={e => this.handleSubmit(e)} > submit</ModifyButton>
            </FormContainer>
            
            </Container>
 
			</Fragment>
		);
	}
}

const LargeInputs = styled.textarea`
		height: 60px;
		margin-bottom: 2%;
		border-radius:10px;
		font-size:15px;
		border: 2px solid #eeeeee;

`
const FormContainer = styled.form`
        width:80%;
        display:flex;
        flex-direction:column;
        text-align:left;
        color: #999999;
        label{
            margin: 3% 0% 2% 0%;

        }

`
const ModifyButton = styled.button`
    background-color: #deffde;
    border-radius:10px;
    height: 30px;

`

const Container = styled.div`
        display:flex;
        
        justify-content: center;

        border: 2px solid #eeeeee;
`
