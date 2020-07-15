import React from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux'
const axios = require('axios')


//should contain a gradient with the different stages of a project (design, test, launch)
// should contain the logo, the description, the team, the name, the likes and comments, 
//the image gallery, some related articles. some stats

class ProjectProfileScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            addMember: '',
            level: '',
            part: '',
            description: '',
            section: 'details',
            team: [],
            temporaryTeam: [],
            formDescription:false,
        }
    }

    componentDidMount() {
        axios.get(this.props.baseApi + 'api/Project/Info/' + this.props.currentProject)
            .then(market => {
                console.log(market)
                this.setState({
                    name: market.data.details.name,
                    part: market.data.details.part,
                    level: market.data.details.level,
                    description: market.data.details.description,
                    team: market.data.team,
                    temporaryTeam: market.data.temporaryTeam
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    renderSwitch() {
        return (
            <div style={{ display: 'flex', marginLeft: '5%' }} >
                <SwitchContainer current={this.state.section} section='details' >
                    <button onClick={() => this.setState({ section: 'details' })} >details</button>
                </SwitchContainer>
                <SwitchContainer current={this.state.section} section='social' >
                    <button onClick={() => this.setState({ section: 'social' })} >social</button>
                </SwitchContainer>
                <SwitchContainer current={this.state.section} section='team' >
                    <button onClick={() => this.setState({ section: 'team' })} >team</button>
                </SwitchContainer>
                <SwitchContainer current={this.state.section} section='settings' >
                    <button onClick={() => this.setState({ section: 'settings' })} >settings</button>
                </SwitchContainer>

            </div>
        )
    }

    renderMember() {
        let members = this.state.team.map((member, i) => {
            return (
                <div key={'member' + i} >
                    {member.name}
                </div>
            )
        })
        return members
    }

    renderTemporaryMember() {
        let members = this.state.temporaryTeam.map((member, i) => {
            return (
                <div key={'member' + i} >
                    {member.mail}
                </div>
            )
        })
        return members
    }

    renderSections() {
        switch (this.state.section) {
            case 'details':
                return (
                    <div>
                        <h4>description</h4>
                        {
						this.state.formDescription ?
							<div>
								<div>
									<textarea
										id='mainSelfDescription'
										onChange={e => this.handleChange(e)}
										defaultValue={this.state.self}
									>
									</textarea>
								</div>

								<button >Save</button>
								<button onClick={e => this.setState({ formDescription: false })} >cancel</button>

							</div>

							: <div>
								<TextContainer><p>{this.state.self}</p></TextContainer>
								<button onClick={e => this.setState({ formDescription: true })} >edit</button>
							</div>
					}
                        <p>{this.state.description} </p>
                        <p>level: {this.state.level}. {this.state.part}</p>
                        <h4>Location</h4>
                        <h4>Founder</h4>
                        <h4>Story</h4>
                    </div>
                )
            case 'social':
                return (
                    <div>
                        <div>
                            <p>comments</p>
                        </div>
                        <div>
                            <p>likes</p>
                        </div>
                    </div>
                )
            case 'team':
                return (
                    <div style={{ display: 'flex', justifyContent: 'space-around' }} >
                        <div>
                            <h3> Members</h3>
                            {this.renderMember()}
                        </div>
                        <div>
                            <h3>waiting for approval</h3>
                            {this.renderTemporaryMember()}
                            <p>add member</p>
                            <input id='addMember' onChange={e => this.handleChange(e)} />
                            <button onClick={e => this.addMember()} >add</button>
                        </div>

                    </div>
                )
            case 'settings':
                return (
                    <div></div>
                )
            default:
                break;
        }

    }

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value })
    }


    addMember() {
        axios.post(this.props.baseApi + 'api/project/invite/' + this.props.currentProject, { eMail: this.state.addMember })
            .then(project => {
                console.log(project.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <Container>
                {

                    (this.props.currentProject !== '') ?
                        <div>
                            <img src='/asstes/canvas.svg' alt='company logo' />
                            <h2>{this.state.name} </h2>
                            {this.renderSwitch()}
                            {this.renderSections()}
                        </div>



                        : <p> please start or join a project</p>
                }
            </Container>




        );
    }
}


const mapStateToProps = (state) => {
    return {
        currentProject: state.currentProject,
        level: state.level,
        baseApi: state.baseApi

    }
}

export default connect(mapStateToProps)(ProjectProfileScreen)

export const SwitchContainer = styled.div`
    button{
        margin: 10px;
        font-size: 15px;
        color:  ${props => (props.section === props.current) ? '#b0d1ff' : '#cccccc'};;
        background-color: white;
        border-top-color: white;
        border-left-color: white;
        border-right-color:white;
        border-bottom-color:${props => (props.section === props.current) ? '#b0d1ff' : '#cccccc'};;;

    }
`

const Container = styled.div`
    text-align:center;
	
`

const TextContainer = styled.div`
    text-align:center;
    border: 2px solid #b0d1ff;
	
`

const PointContainer = styled.div`
	display:flex;
	justify-content: center;
	text-align:left;
	
`

const Cell = styled.div`
	margin:1%;
    background-color:${props => props.level > 0 ? '#cccc00' : '#00cccc'}


`