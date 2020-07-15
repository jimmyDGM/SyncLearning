import React, {Fragment} from 'react';
import styled from 'styled-components'
//import Generator from '../../../features/form/generator/Generator'
export default class ConterPartie extends React.Component {

	render() {

		return (
			<Fragment>
            <Container>
            <FormContainer>
                <NameContainer>
                    <label>firstname</label>
                    <ShortInputs type='text'/>
                    <label>lastName</label>
                    <ShortInputs type='text'/>
                </NameContainer>


                <label>email</label>
                <LargeInputs type='mail'/>
                <label>description</label>
                <ShortInputs type='number'/>
                <label>position</label>
                <ShortInputs type='text'/>
                <label>linkedin</label>
                <LargeInputs type='text'/>
                <label>skills</label>
                <LargeInputs type='text'/>
                <label>involvment in the project</label>
                <LargeInputs type='text'/>
            </FormContainer>
            <ModifyButton>modify</ModifyButton>
            </Container>
 
			</Fragment>
		);
	}
}

const LargeInputs = styled.input`
		height: 30px;
		width: 50%;
		margin-bottom: 2%;
		border-radius:10px;
		font-size:15px;
		border: 2px solid #eeeeee;

`
const FormContainer = styled.form`
        display:flex;
        flex-direction:column;

`
const ModifyButton = styled.button`
    background-color: #deffde;
    border-radius:10px;
    height: 30px;

`

const Container = styled.form`
        display:flex;
        justify-content:space-between;

        border: 2px solid #eeeeee;
`
const ShortInputs = styled.input`
		height: 30px;
		width: 30%;
		margin-bottom: 2%;
		border-radius:10px;
		font-size:15px;
		border: 2px solid #eeeeee;

`

const NameContainer = styled.div`
    display:flex;
    justify-content:space-between;
    padding:5%;
`
