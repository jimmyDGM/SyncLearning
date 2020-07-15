import React, {Fragment} from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux'

const axios = require('axios');

//import Generator from '../../../features/form/generator/Generator'
class ProjectInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state= {}
    }


    componentDidMount() {
        this.props.getData('ProjectInfo', this.state)
    }

    handleChange(e) {
		this.setState({
			[e.target.id]:e.target.value
        }, e => console.log(this.state))
        
	}

    handleSubmit(e) {
        //update the guy

        e.preventDefault();
		var url = window.location.href;
		var splitedUrl = url.split('/')		
		axios.post(this.props.baseApi+'api/Project/Info/' + splitedUrl[4], this.state)
		.then((response) => {
			console.log(response.data)
		})
		.catch((error) => {
			console.log(error);
		});

        this.props.getData('ProjectInfo', this.state.members)
    }

	render() {
		return (
			<Fragment>

            <FormContainer>
                <NameContainer>
                    <label>project Name</label>
                    <ShortInputs id='Name' onChange={e => this.handleChange(e)} type='text'/>
                    <label>sector of activity</label>
                    <ShortInputs id='sector' onChange={e => this.handleChange(e)} type='text'/>
                </NameContainer>


                <label>website</label>
                <LargeInputs id='website' onChange={e => this.handleChange(e)} type='text'/>
                <label>date of creation</label>
                <ShortInputs id='date' onChange={e => this.handleChange(e)} type='text'/>
                <label>Vision</label>
                <textarea id='vision' onChange={e => this.handleChange(e)}/>
                <label>Story</label>
                <textarea id='story' onChange={e => this.handleChange(e)}/>
                <label>product or service description</label>
                <ShortInputs id='product' onChange={e => this.handleChange(e)} type='text'/>
                <label>linkedin</label>
                <LargeInputs id='linkedin' onChange={e => this.handleChange(e)} type='text'/>
                <label>what problem is your product or service solving</label>
                <LargeInputs id='problem' onChange={e => this.handleChange(e)} type='text'/>
                <label>what are the existing solutions for this problem</label>
                <LargeInputs id='solutions' onChange={e => this.handleChange(e)} type='text'/>
                <label>what do your product do differently </label>
                <LargeInputs id='product' onChange={e => this.handleChange(e)} type='text'/>
                <label>what Gain that you create for your potential customer</label>
                <LargeInputs id='Gain' onChange={e => this.handleChange(e)} type='text'/>
                <ModifyButton onClick={e => this.handleSubmit(e)} > submit</ModifyButton>
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
  
  export default connect(mapStateToProps)(ProjectInfo)
  

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
    padding-top:5%;
`
