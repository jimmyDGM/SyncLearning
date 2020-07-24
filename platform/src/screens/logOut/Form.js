import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
//mail text send

const FormWrapper = styled.form`
height: 300px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const FormHeader = styled.div`
padding: 10px;
`


const Input = styled.input`
font-size: 14px;
margin: 10px 0;
border: 1px solid;
`

const FormTitle = styled.h3`
padding-top: 16px;
font-size: 24px;
font-weight: 400;
line-height: 32px;
margin: 0;
`





class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {mailValue: '',textValue:''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({[event.target.id]: event.target.value});
    }
  
    handleSubmit(event) {
      event.preventDefault();
      let test = {email:this.state.mailValue, text:this.state.textValue}
      console.log(test);
      axios.post('http://localhost:6200/api/Form', test)
    .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    
  
    render() {
      return (
        <FormWrapper onSubmit={this.handleSubmit}>
            <FormHeader>
                <FormTitle>Fancy form</FormTitle>
            </FormHeader>
          <label>
            Mail:
            <Input id="mailValue" type="email" value={this.state.mailValue} onChange={this.handleChange} />
          </label>
          <label>
              Text:
            <Input id="textValue" type="text" value={this.state.textValue} onChange={this.handleChange} />
            </label>
          <Input type="submit" value="Submit" />
        </FormWrapper>
      );
    }
  }








export default Form;