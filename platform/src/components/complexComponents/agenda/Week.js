import React from 'react';
import moment from 'moment'
import AgendaModal from './AgendaModal'
import {Container, WeekBoard, ArrowButton, Meeting, Card, ColorCard, CalendarHeader} from './AgendaStyle'
const days= ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']

export default class Week extends React.Component {

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
		let dayCells = days.map((day) => {
			return(
				<div key={day} >{day} </div>
			)
		})

		return dayCells
    }
    
    getCurrentWeek() {
        var currentDate = moment();
      
        var weekStart = currentDate.clone().startOf('isoWeek').format('L');
        var weekEnd = currentDate.clone().endOf('isoWeek').format('L');
      
        var days = [];
      
        for (var i = 0; i <= 6; i++) {
          days.push(moment(weekStart).add(i, 'days').format("L"));
        }
        console.log(days)
        return(days)
      }

	renderDay() {
		let hours = []
		for (let i = 0; i < 24; i++) {
			hours.push(this.renderCell(i))
			
		}
		return(
			<div>
				{hours}
			</div>
		)
	}

	renderCalendar() {
        
		this.renderMeetings()
		let cells = [];
        let week = this.getCurrentWeek()

		
		for(var i = 0; i< week.length; i++) {

				cells.push(this.renderDay(i+1))
			
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
				<WeekBoard>
				{this.renderCalendar()}
				</WeekBoard>
					
			</Container>
		);
	}
}

