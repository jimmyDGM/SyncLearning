import React from 'react';
import Agenda from '../../../components/complexComponents/agenda/Agenda.js'
import Meetings from '../../../components/complexComponents/agenda/Meetings.js'
import Week from '../../../components/complexComponents/agenda/Week.js'
import EventProgramer from '../../../components/complexComponents/agenda/EventProgramer.js'
import { AgendaSwitch, CalendarBox, MeetingsBox, Header, P, SwitchContainer} from './AgendaStyle'
import { connect } from 'react-redux'

const axios = require('axios')

class AgendaScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state= {
			meetings: [
            ],
            openMeetingForm: false,
			currentMeeting:{},
			calendar: false,
			meetingColor: '#b0d1ff',
			section:'Meetings'
		}
	}
	
    componentDidMount() {
        this.fetchMeetings()
    }

	openCalendar() {

	}
    fetchMeetings() {
        axios.get(this.props.baseApi + 'api/Meeting')
            .then((response) => {
                console.log(response)
                let open = false
                if (response.data.length === 0) {
                    open = true
                }
                this.setState({ meetings: response.data})
            })
            .catch((error) => {
                console.log(error);
            });
    }

    fetchPersonalMeetings() {
        axios.get(this.props.baseApi + 'api/Meeting/personal')
            .then((response) => {
                let open = false
                if (response.data.length === 0) {
                    open = true
                }
                this.setState({ meetings: response.data})
            })
            .catch((error) => {
                console.log(error);
            });
    }

    fetchProjectMeetings() {
        axios.get(this.props.baseApi + 'api/Meeting/project/'+this.props.currentProject)
            .then((response) => {
                console.log(response)
                let open = false
                if (response.data.length === 0) {
                    open = true
                }
                this.setState({ meetings: response.data})
            })
            .catch((error) => {
                console.log(error);
            });
    }
	
	updateMeetings(newMeetings) {
		//updateMeetingList
//TODO

		axios.post(this.props.baseApi+'api/Agenda/update', newMeetings)
        .then((response) => {
          console.log(response);
          this.fetchMeetings()
        })
        .catch((error) => {
          console.log(error);
        });
	}


	renderSwitch() {
        return(
            <AgendaSwitch >
                <SwitchContainer current={this.state.section} section='Meetings' > 
                    <button onClick={() => this.setState({section:'Meetings'})} >Meetings</button>
                </SwitchContainer>
                <SwitchContainer current={this.state.section} section='Month' > 
                    <button onClick={() => this.setState({section:'Month'})} >Month</button>
                </SwitchContainer>                
                <SwitchContainer current={this.state.section} section='week' > 
                    <button onClick={() => this.setState({section:'week'})} >week</button>
                </SwitchContainer>                
                <SwitchContainer current={this.state.section} section='Program' > 
                    <button onClick={() => this.setState({section:'Program'})} >Program</button>
                </SwitchContainer>
               
            </AgendaSwitch>
        )
    }

    renderSections() {
        switch (this.state.section) {
            case 'Meetings':
                return (
					<Meetings data={this.state.meetings}/>
                )
            case 'Month':
                return (
                    <Agenda data={this.state.meetings} />
                )
            case 'week':
                return (
					<Week data={this.state.meetings} />
                )
            case 'Program':
                return (
                   <EventProgramer/>
                )
            default:
                break;
        }

    }




	render() {
		return (
		
            <div>

				{this.renderSwitch()}
			

				<div style={{width:'100%'}}  >
					<Header>
					<p onClick={() => this.fetchProjectMeetings()} >Project</p>
					<p onClick={() => this.fetchPersonalMeetings()} >Personnal</p>
					</Header>

					{this.renderSections()}
				</div>
                
            </div>
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

export default connect(mapStateToProps)(AgendaScreen)

