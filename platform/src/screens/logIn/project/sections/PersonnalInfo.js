import React, {Fragment} from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import { connect } from 'react-redux'

const axios = require('axios');

class PersonnalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            members: [


            ],
            uuid:'',
            firstname:'',
            name:'',
            email:'',
            description:'',
            position:'',
            linkedin:'',
            skills:'',
            involvment:''
        }
    }

    componentDidMount() {
        this.fetchProject()
    }

    fetchProject() {	
		Axios.get(this.props.baseApi+'api/Project/'+this.props.currentProject)
		.then((response) => {
            this.setState(response.data.team)
            console.log(response)
		})
		.catch((error) => {
			console.log(error);
		})
    }

    setMember(id) {
       
            
        this.state.members.map( member => {
            if(member) {
            if(member.uuid === id) {
                this.setState({
                    uuid:member.uuid,
                    firstname: member.firstname,
                    name: member.name,
                    email: member.email,
                    description: member.description,
                    position: member.position,
                    linkedin: member.linkedin,
                    skills: member.skills,
                    involvment: member.involvment
                }, e => console.log(this.state))
            }
        }
        return true

        })


    }
     
     handleChange(e) {
		this.setState({
			[e.target.id]:e.target.value
		}, e => console.log(this.state))
    }
    
    handleSubmit(e) {
        //update the guy
        console.log(this.state)
        var url = window.location.href;
        var splitedUrl = url.split('/')		
		axios.post('/api/Project/Team/' + splitedUrl[4], this.state.members)
		.then((response) => {
			console.log(response.data)
		})
		.catch((error) => {
			console.log(error);
		});
    }

    submit(e) {
        //update the guy
        //update members
        e.preventDefault();
      let members =  this.state.members.map( member => {
          let currentMember= {}
          if(member) {
            if(member.uuid=== this.state.uuid) {
                currentMember.firstname= this.state.firstname
                currentMember.name= this.state.name
                currentMember.email= this.state.email
                currentMember.description= this.state.description
                currentMember.position= this.state.position
                currentMember.linkedin= this.state.linkedin
                currentMember.skills= this.state.skills
                currentMember.involvment= this.state.involvment
                return currentMember
            }else {
                return member
            }
          }else {
              return null
          }

        })
        this.setState({members:members}, e => this.handleSubmit(e))
    }

    addMember() {
        let newArray = this.state.members
		newArray.push({
            uuid: this.state.firstname + (newArray.length), 
            firstname: this.state.firstname,
            name: this.state.name,
            email: this.state.email,
            position: this.state.position,
            description: this.state.description,
            linkedin: this.state.linkedin,
            skills: this.state.skills,
            involvment: this.state.involvment
           
        })
		this.setState({
			members :newArray
		}, e => this.handleSubmit())	
    }

    renderTeam(item) {
        let team = item.map( (member, index) => {
            if(member) {
                return (
                    <MemberCell key={index} onClick={e => this.setMember(member.uuid)}  >
                        {member.name}
                    </MemberCell>
            )

            }  else {
                return null
            }

        })
        return team
    }

	render() {

		return (
			<Fragment>
                <h2>Personal Info</h2>
            <Container>

            <MemberList>
                {this.renderTeam(this.state.members)}
                <button onClick={e => this.addMember()} >add</button>

            </MemberList>
            <FormContainer>
                <NameContainer>
                    <div> 
                    <label>firstname</label>
                    <ShortInputs 
                        id='firstname' 
                        value={this.state.firstname} 
                        onChange={e => this.handleChange(e)} 
                        type='text'
                    />
                    </div>
                    <div>
                    <label>lastName</label>
                    <ShortInputs id='name' onChange={e => this.handleChange(e)} value={this.state.name} type='text'/>
                    </div>

                </NameContainer>


                <label>email</label>
                <LargeInputs id='email' onChange={e => this.handleChange(e)}  value={this.state.email} type='mail'/>
                <label>description</label>
                <textarea id='description' onChange={e => this.handleChange(e)} value={this.state.description} />
                <label>position</label>
                <LargeInputs id='position' onChange={e => this.handleChange(e)}  value={this.state.position}  type='text'/>
                <label>linkedin</label>
                <LargeInputs id='linkedin' onChange={e => this.handleChange(e)} value={this.state.linkedin}  type='text'/>
                <label>skills</label>
                <LargeInputs id='skills' onChange={e => this.handleChange(e)}  value={this.state.skills} type='text'/>
                <label>involvment in the project</label>
                <LargeInputs id='involvment' onChange={e => this.handleChange(e)} value={this.state.involvment}  type='text'/>
                <ModifyButton onClick={e => this.submit(e)} > submit</ModifyButton>
            </FormContainer>
            <ModifyButton>modify</ModifyButton>
            </Container>

 
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
  
  export default connect(mapStateToProps)(PersonnalInfo)
  

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
        justify-content:space-between;
        color: #999999;
        border: 2px solid #eeeeee;
`
const ShortInputs = styled.input`
		height: 30px;
		width: 60%;
		margin-bottom: 2%;
		margin-left: 2%;
		border-radius:10px;
		font-size:15px;
		border: 2px solid #eeeeee;

`

const NameContainer = styled.div`
    display:flex;
    justify-content:space-between;
    padding-top:5%;
`
const MemberCell = styled.div`
    padding:2%;
    border: 2px solid #eeeeee;

`
const MemberList = styled.div`
	border: 2px solid #eeeeee;
    width:20%;
`