import React from 'react';
import moment from 'moment'
import AgendaModal from './AgendaModal'
import {Container, CalendarBoard, ArrowButton, Meeting, Card, ColorCard, CalendarHeader} from './AgendaStyle'

export default class Agenda extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			open: null,
			selectedDay: 1,
			meetings: props.data,
			currentData: [{}],
			currentMonth: moment().format('MMMM YYYY'),
			monthIndex:0,
		}
		this.closeModal = this.closeModal.bind(this);
	}


	openModal(e, index, currentDate) {
	
		var id = index;
		let dates = [];
		 const meetings =  this.state.meetings.map((meeting) => {
			let dateArray = meeting.date.split("-")
			let dateInt = parseInt(dateArray[2])
			if(dateInt === index) {
				dates.push(meeting)
			}
			this.setState({
				open: id,
				selectedDay: id,
				currentData: dates,
			})
			return false
        })
        return meetings
	
	  }

    closeModal(e) {	
		 if (e !== undefined) {
		  e.preventDefault();
		}
		this.setState({open: null, currentData: {}})
	}

	renderMeetings(currentDate) {
		let month = moment().subtract(this.state.monthIndex, 'month').format('L');

		const meetings =  this.state.meetings.map(meeting => {
			let monthArray = month.split('/')
			let dateArray = meeting.date.split("-")
			let dateInt = parseInt(dateArray[2])
			if(dateInt === currentDate && dateArray[1] === monthArray[0] && dateArray[0] === monthArray[2] ) {
				return(
					<Meeting id={meeting._id} key={meeting._id} onClick={e => this.openModal(e, currentDate)} >
						{meeting.title}
					</Meeting>
				)
			} else {
				return null;
			}

        })
        return meetings
	}

	renderCell(i) {
		return (
			<Card id={i} key={i} onClick={e => this.openModal(e, i, this.state.currentData)}>
				
				<p>{i} </p>
				{this.renderMeetings(i)}
			</Card>
		)
	}

	renderColorCell(i) {
		return (
			<ColorCard id={i} key={i} onClick={e => this.openModal(e, i, this.state.currentData)}>
				
				<p>{i} </p>
				{this.renderMeetings(i)}
			</ColorCard>
		)
	}
	renderCalendarHeader() {
		let days= ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
		let dayCells = days.map((day) => {
			return(
				<div key={day} >{day} </div>
			)
		})

		return dayCells
	}

	addEmptyCells() {
		let days= ['Monday', 'Tursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
		let first=0
		let currentMonth = moment().subtract(this.state.monthIndex, 'month').format("YYYY-MM-DD")
		let firstDay = moment(currentMonth).startOf('month').format('dddd')
		let cellsToAdd = days.map((day, i) => {
			if(firstDay === day) {
				first =i +1
			}
			return true
		})
		return first

	}

	renderCalendar() {
		this.renderMeetings()
		let cells = [];

		var cellNumber = moment().subtract(this.state.monthIndex, 'month').daysInMonth();
		let toDay = moment().format('l').split('/');
		for(var i = 0; i< cellNumber; i++) {
			if((i+1) === parseInt(toDay[1])) {
				cells.push(this.renderColorCell(i+1))

			} else {
				cells.push(this.renderCell(i+1))
			}
		}
		return cells
	}

	clickMonth() {
		let month = moment().subtract(this.state.monthIndex, 'month').format('MMMM YYYY');
		this.setState({currentMonth:month});
	}

	render() {
		return (
			<Container>
				<AgendaModal
					closeModal= {this.closeModal}
					open={this.state.open}
					selectedDay= {this.state.currentData}
				/>
				<div style={{display:'flex', justifyContent:'center', alignItems:'center'}} >


				<ArrowButton onClick={e => this.setState({monthIndex:this.state.monthIndex+1}, e => this.clickMonth())} >
					<img src='/assets/leftArrow.png' alt='left ArrowButton' />
				</ArrowButton>
				<h3> {this.state.currentMonth} </h3>
				<ArrowButton onClick={e => this.setState({monthIndex:this.state.monthIndex-1}, e => this.clickMonth())} >
				<img src='/assets/rightArrow.png' alt='right ArrowButton' />

				</ArrowButton>
				</div>
				<CalendarHeader>
				{this.renderCalendarHeader()}

				</CalendarHeader>
				<CalendarBoard
					firstDay={() => this.addEmptyCells()}
				>
				{this.renderCalendar()}
				</CalendarBoard>
					
			</Container>
		);
	}
}

