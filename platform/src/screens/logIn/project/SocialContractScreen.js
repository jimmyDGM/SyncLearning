import React from 'react';
import styled from 'styled-components'
import PersonnalInfo from './sections/PersonnalInfo'
import ProjectInfo from './sections/ProjectInfo'
import ConterPartie from './sections/ConterPartie';
import ProjectMarket from './sections/ProjectMarket';
import Introduction from './sections/Introduction';
import Axios from 'axios';
import { connect } from 'react-redux'
const data = [
    {FormName:'PersonnalInfo', title: 'Personal Info' },
    {FormName:'ProjectInfo', title: 'Project General Info' },
    {FormName:'ProjectMarket', title: 'Project Market' },
    {FormName:'ProjectNeed', title: 'Project need & Ressource ' },
    {FormName:'ConterPartie', title: 'Long term vision' },
]
 
class SocialContractScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentForm:'PersonnalInfo',
            projectForm: false
        }
        this.launch= this.launch.bind(this)
        this.getData= this.getData.bind(this)
    }

    componentDidMount() {
        this.fetchProject()
        console.log(this.props)
    }

    fetchProject() {	
		Axios.get(this.props.baseApi+'api/Project/'+this.props.currentProject)
		.then((response) => {
            this.setState(response.data)
            console.log(response)
		})
		.catch((error) => {
			console.log(error);
		})
    }

    getData(type, data) {
        console.log(data)
        this.setState({
            [type]:data
        })
    }

    renderForm() {
        switch(this.state.currentForm) {
            case 'PersonnalInfo':
                return(
                    <Container>
                        
                        <PersonnalInfo getData={this.getData} data={this.state.team} />
                    </Container>
                )
            case 'ProjectInfo':
                return(
                    <Container>
                        <h2>Project General Info</h2>
                        <ProjectInfo  getData={this.getData} />
                    </Container>
                    )
            case 'ProjectMarket':
                return(
                    <Container>
                        <h2>Project Market</h2>
                        <ProjectMarket></ProjectMarket>
                        
                    </Container>
                )

            case 'ConterPartie':
                return(
                    <Container>
                        <h2>offred contrepartie</h2>
                        <ConterPartie></ConterPartie>
                    </Container>
                    )
            case 'ProjectRessource':
                return(
                    <Container>
                        <h2>Project Ressource and needs</h2>
                        <ProjectMarket></ProjectMarket>
                    </Container>
                    )

            default:
              return (
                <div> 
                    <p>wrong</p>
                </div>
            );
          }

    }

    handleClick(forms) {
        this.setState({currentForm: forms})
    }

    renderNav(formList) {
        let nav = formList.map( (info, index) => {
            if(info.FormName !== this.state.currentForm ) {
                return(
                    <StepButton key={index} onClick={e => this.handleClick(info.FormName)} >{info.title} </StepButton>
                )
            } else {
                return(
                    <SelecteStepButton key={index} onClick={e => this.handleClick(info.FormName)} >{info.title} </SelecteStepButton>
                )  
            }
 
        })
        return nav
    }

    launch() {
        this.setState({ projectForm: true })
    }

	render() {
        return(
            <div>
                {
                 this.state.projectForm ? 
                 <div>
                 <div>
                   
                 {this.renderNav(data)}
             </div>

                {this.renderForm()}
                <div>
                    <button>submit</button>
                </div>
                </div> : 
                <Introduction launch={this.launch} />
                }

            </div>
        )

	}
}

const mapStateToProps = (state) => {
    return{
        currentProject: state.currentProject,
        level:state.level,
        baseApi : state.baseApi
    }
}

export default connect(mapStateToProps)(SocialContractScreen)



const Container = styled.div`
    width: 80%;
    margin:4%;
    padding:2%;
    display:flex;
    justify-content:center;
    flex-direction:column;

`

const StepButton = styled.button`
    background-color: #ffffff;
    border-radius:15px;
    height: 30px;
    border: 2px solid #eeeeee;
    margin:2%;
    background-color: white;


`


const SelecteStepButton = styled.button`
    background-color: #ffffff;
    border-radius:15px;
    height: 30px;
    border: 2px solid #eeeeee;
    margin:2%;
    background-color: #deffde;


`