import React from 'react';
import { FormCentered, Name, MeetingList, CellContainer, Container, SendButton, Area, DetailContainer, AddButton, Meeting, FormContainer } from './MeetingStyle'
import _ from 'lodash'
import { connect } from 'react-redux'

const axios = require('axios')

class Meetings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meetings: props.data,
            openMeetingForm: false,
            currentMeeting: {},
            newMeeting: {},
            update:false,
        }
    }

    componentDidMount() {
        this.fetchProjectMeetings()
    }

    fetchMeetings() {
        axios.get(this.props.baseApi + 'api/Meeting')
            .then((response) => {
                console.log(response)
                let open = false
                if (response.data.length === 0) {
                    open = true
                }
                this.setState({ meetings: response.data, currentMeeting: response.data[0], openMeetingForm: open })
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
                this.setState({ meetings: response.data, currentMeeting: response.data[0], openMeetingForm: open })
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
                this.setState({ meetings: response.data, currentMeeting: response.data[0], openMeetingForm: open })
            })
            .catch((error) => {
                console.log(error);
            });
    }





    handleChange(e) {
        this.setState({ newMeeting: { ...this.state.newMeeting, [e.target.id]: e.target.value } })
    }


    handleSubmit(e) {
        e.preventDefault()
        let meeting = this.state.newMeeting
        meeting.project = this.props.currentProject

        let url = 'api/Agenda'
        if(this.state.update) {
            let current = this.state.currentMeeting
            url = 'api/Agenda/update/'+ current._id
            meeting.title = meeting.title ? meeting.title : current.title
            meeting.place = meeting.place ? meeting.place : current.place
            meeting.date = meeting.date ? meeting.date : current.date
            meeting.time = meeting.time ? meeting.time : current.time
            meeting.endDate = meeting.endDate ? meeting.endDate : current.date
            meeting.endTime = meeting.endTime ? meeting.endTime : current.time
            meeting.description = meeting.description ? meeting.description : current.description
          
            delete meeting._id
        }
        if (!meeting) {
            return false
        }
        if (!meeting.date || !meeting.title || !meeting.time) {
            return false
        }
        let cacheDate = meeting.date.split('-')
        meeting.date= cacheDate[2] +'-'+ cacheDate[1] +'-'+ cacheDate[0]
        axios.post(this.props.baseApi + url, meeting)
            .then((response) => {
                console.log(response);
                this.setState({ openMeetingForm: false, update:false })
                this.fetchMeetings()
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleDelete(e) {
        console.log(e.target.id)
        axios.post(this.props.baseApi + 'api/Agenda/delete', { _id: e.target.id })
        let newMeetings = []
        this.state.meetings.map(meeting => {
            if (meeting._id !== e.target.id) {
                newMeetings.push(meeting)
                return meeting
            } else {
                return {}
            }
        })
        this.setState({ meetings: newMeetings })
    }

    renderMeetingForm(meeting) {
        let buttonTitle = 'Update'
        if(meeting === null) {
            meeting= {title:'', date:'', time:'', place:''}
            buttonTitle = 'Add'

        }
        
        let title = meeting.title? meeting.title : ''
        let date = meeting.date? meeting.date : ''
        let time = meeting.time? meeting.time : ''
        let place = meeting.place? meeting.place : ''
        let description = meeting.description? meeting.description : ''
        return (
            <FormContainer onSubmit={e => this.handleSubmit(e)} >
                <Name>title</Name>
                <input
                    defaultValue={title}
                    id='title'
                    type='text'
                    onChange={e => this.handleChange(e)}
                />
                <Name>description</Name>
                <input
                    defaultValue={description}
                    id='description'
                    type='text'
                    onChange={e => this.handleChange(e)}
                />
                <h4>from</h4>

                <CellContainer>
                    <div>
                         date 
                        <input
                             defaultValue={date}
                            id='date'
                            type='date'
                            onChange={e => this.handleChange(e)}
                        />
                    </div>
                    <div>
                        time
                        <input
                            defaultValue={time}
                            id='time'
                            type='time'
                            onChange={e => this.handleChange(e)}
                        />
                    </div>

                </CellContainer>
                <h4>To</h4>
                <CellContainer>
                    <div>
                         date
                        <input
                             defaultValue={date}
                            id='endDate'
                            type='date'
                            onChange={e => this.handleChange(e)}
                        />
                    </div>
                    <div>
                         time
                        <input
                            defaultValue={time}
                            id='endTime'
                            type='time'
                            onChange={e => this.handleChange(e)}
                        />
                    </div>

                </CellContainer>
                <Name>place</Name>
                <input
                    defaultValue={place}
                    id='place'
                    type='text'
                    onChange={e => this.handleChange(e)}
                />
                
                <Name> members </Name>
                {/* only team members */}
                <input
                    placeholder='mail...'
                    id='place'
                    type='text'
                    onChange={e => this.handleChange(e)}
                />
                <Container>
                    <AddButton onClick={e => this.handleSubmit(e)} >{buttonTitle} </AddButton>
                    {(this.state.meetings.length !== 0)
                    ? <AddButton onClick={e => this.setState({ openMeetingForm: false, update:false })} >cancel</AddButton>
                    : null}
                </Container>

            </FormContainer>
        )
    }


    renderMeetings() {

        const meetings = this.state.meetings.map((meeting, i) => {
            return (
                <div style={{display:'flex', borderBottom:'1px solid #cccccc'}}  key={'meetings'+i}>
                <Meeting onClick={e => this.setState({ currentMeeting: meeting })} >
                    <p>{meeting.title} </p>
                    <p>{meeting.date} </p>
                    <p>{meeting.time} </p>
                    <p>{meeting.place} </p>
                </Meeting>
                <SendButton id={meeting._id} onClick={e => this.handleDelete(e)} >X</SendButton>

                </div>

            )
        })
        return meetings
    }

    renderMeetingDetails(meeting) {
        if (_.isEmpty(meeting)) {
            return null
        } else if (!this.state.update) {
            return (
                <DetailContainer>
                    <div>
                        <h3>{meeting.title} </h3>
                    </div>
                    <Area>
                        <p>when</p>
                    </Area>
                    <div>
                        <p>the: {meeting.date} </p>
                        <p>at: {meeting.time} </p>
                    </div>

                    <Area>
                        <p>place</p>

                    </Area>
                    <p>{meeting.place} </p>
                    <Area>
                        <p>description</p>
                    </Area>
                    <p>{meeting.description} </p>

                    <AddButton onClick={e => this.setState({update:true})} >update</AddButton>
                </DetailContainer>
            )
        } else {
            return this.renderMeetingForm(meeting)
        }

    }

    render() {
        return (
            <div style={{ textAlign: 'center' }} >
                <Container>
                    <MeetingList>
                        {this.renderMeetings()}
                    </MeetingList>
                    <FormCentered>
                        {this.state.openMeetingForm ?
                            this.renderMeetingForm(null) :
                            this.renderMeetingDetails(this.state.currentMeeting)
                        }
                    </FormCentered>
                </Container>
                {(this.state.meetings.length !== 0)
                    ? <AddButton onClick={e => this.setState({ openMeetingForm: true })} > Add</AddButton>
                    : null}

            </div>

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

export default connect(mapStateToProps)(Meetings)
