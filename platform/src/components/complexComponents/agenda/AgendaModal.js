import React from 'react';
import { connect } from 'react-redux'
import { Name, FormContainer, Container, SendButton, Countainer, AddButton, Info, Meetings, DayMeetingList, CrossContainer } from './AgendaModalStyle'
const axios = require('axios');

class AgendaModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			renderForm: false,
			currentMeeting: props.selectedDay
		}
	}

	handleSubmit(e) {
		e.preventDefault()
		axios.post(this.props.baseApi + 'api/Agenda', this.state.currentMeeting)
			.then((response) => {
			})
			.catch((error) => {
				console.log(error);
			});
	}
	handleChange(e) {
		this.setState({ currentMeeting: { ...this.state.currentMeeting, [e.target.id]: e.target.value } })
	}
	renderForm() {
		return (
			<div>
				<FormContainer onSubmit={e => this.handleSubmit(e)} >
					<Name>
						title
                </Name>
					<input
						id='title'
						type='text'
						onChange={e => this.handleChange(e)}
					/>
					<Container>
						<Name>

							date
						</Name>
						<input
							id='date'
							type='date'
							onChange={e => this.handleChange(e)}
						/>
						<Name>
							time
						</Name>
						<input
							id='time'
							type='time'
							onChange={e => this.handleChange(e)}
						/>
					</Container>


					<Name>
						place
                </Name>
					<input
						id='place'
						type='text'
						onChange={e => this.handleChange(e)}
					/>
					<Container>
						<AddButton onClick={e => this.handleSubmit(e)} >Add</AddButton>
						<AddButton onClick={e => this.setState({ renderForm: false, currentMeeting: {} })}>cancel</AddButton>
					</Container>

				</FormContainer>



			</div>
		)
	}

	renderMeetingDetails() {
		let meeting = this.state.currentMeeting

		if (meeting) {
			return (
				<div>
					<p>{meeting.title} </p>
					<p>{meeting.date} </p>
					<p>{meeting.time} </p>
					<p>{meeting.place} </p>
				</div>
			)
		} else {
			this.setState({ renderForm: true })
		}

	}
	removeMeeting(e) {
		console.log(this.state)
		axios.post(this.props.baseApi + 'api/Agenda/delete', { _id: e.target.id })
		// chopper l'identifiant update le state puis update le reste
		//let meetings = this.state.
	}

	renderMeetings() {
		let currentMeetings = this.props.selectedDay;
		if (currentMeetings) {
			const meetings = currentMeetings.map(meeting => {

				return (
					<Meetings key={meeting._id} onClick={e => this.setState({ currentMeeting: meeting, renderForm: false })} >
						<p>{meeting.title} </p>
						<p>{meeting.date} </p>
						<SendButton id={meeting._id} onClick={e => this.removeMeeting(e)} >X</SendButton>
					</Meetings>
				)
			})
			return meetings
		}

	}

	render() {
		const { closeModal } = this.props
		console.log(this.props)
		if (this.props.open !== null) {
			return (
				<Countainer>

					<Info>
						<CrossContainer>
							<img src={defaultProps.sourceCross} style={{ margin: '3%', width: '100%' }} onClick={closeModal} alt='' />
						</CrossContainer>
						{this.state.renderForm ? this.renderForm() : this.renderMeetingDetails()}
					</Info>
					<DayMeetingList>
						<h2>current meeting</h2>
						{this.renderMeetings()}
						<AddButton onClick={e => this.setState({ renderForm: true })} >add event</AddButton>

					</DayMeetingList>

				</Countainer>
			);

		} else {
			return (
				<div></div>
			)
		}

	}
}

const defaultProps = {
	source: '/assets/default.png',
	sourceCross: '/assets/close.png',

}

const mapStateToProps = (state) => {
	return {
		currentProject: state.currentProject,
		level: state.level,
		baseApi: state.baseApi
	}
}

export default connect(mapStateToProps)(AgendaModal)
