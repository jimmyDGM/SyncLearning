import React from 'react';
import Task from './Task.js';
import {AddButton, ColumnContainer, ColumnHeader} from './styles/ColumnStyle'
import { connect } from 'react-redux'

const axios = require('axios')

class Column extends React.Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	tasks:[],
		newTaskName:''
	  };
	  this.drag = this.drag.bind(this)
	  this.dragEnd = this.dragEnd.bind(this)
	}

	componentDidMount() {
		this.fetchCards()
	}
	fetchCards() {
		var url = window.location.href;
		var splitedUrl = url.split('/')
		axios.get(this.props.baseApi+'api/kanban/card/' + splitedUrl[4])
		.then((response) => {
			this.setState({tasks: response.data.cards})
		})
		.catch((error) => {
			console.log(error);
		});
	}

	drag(e, order) {
		//remove the card on dragStart
		var img = new Image(); 
		img.src = '/assets/default.png'; 
		e.dataTransfer.setData('text/plain', order);

	}
	


	drop(e) {
		e.preventDefault()
		const pieceOrder = JSON.parse( e.dataTransfer.getData('text'));
		let newTasks = this.state.tasks
		newTasks.push(pieceOrder)
		this.setState({
			Tasks :newTasks
		}, e => this.moveCard(this.props.uuid, pieceOrder))
		


	}

	allowDrop(e) {
		e.preventDefault()

	}

	dragEnd(order) {
		let moving = this.state.tasks.map(task => {
			if(task === order.uuid) {
				return false
			}else {
				return task
			}
		})
		this.setState({tasks : moving}, e => this.fetchCards())
	}

	handleChange(e) {
		this.setState({newTaskName: e.target.value })
	}

	moveCard(e, card) {
		// change the columnId of the task
	
		card.columnId= e
		var url = window.location.href;
		var splitedUrl = url.split('/')
		axios.post(this.props.baseApi+'api/kanban/cardUpdate/' + splitedUrl[4], card)
		.then((response) => {
			this.fetchCards()
		})
		.catch((error) => {
			console.log(error);
		});
	}

	addCard(e) {
		let newTasks = this.state.tasks
		newTasks.push({
			title: this.state.newTaskName,
			uuid: this.state.newTaskName +  newTasks.length,
			description: '',
			columnId: this.props.uuid,
			index: 4,
			checklists:[],
			categories: [],
			members: [],
			filesUrl:[],
			comments:[],
			})
		this.setState({
			tasks :newTasks,
			renderInput:false
		}, e => this.updateDbState())	
	}

	updateDbState() {

		var url = window.location.href;
		var splitedUrl = url.split('/')		
		axios.post(this.props.baseApi+'api/kanban/card/create/' + splitedUrl[4], this.state.tasks)
		  .then(function (response) {
			console.log(response);
		  })
		  .catch(function (error) {
			console.log(error);
		  });
	}

	removeCard(e) {
		console.log(e)
	}

	renderTasks() {
		let tasksId = []
		const taskRender = this.state.tasks.map( (task, i) => {
			if(task.columnId === this.props.uuid) {
				task.taskIndex = i
				task.teamMembers = this.props.members

				if (!tasksId.includes(task.uuid)) {
					tasksId.push(task.uuid)
					return (
						<Task 
							key={task.uuid}
							data= {task}
							drag={ this.drag}
							dragEnd={this.dragEnd}

						/>
					)
				}

			} else {return false}

		})
		return taskRender
	}

	render() {	
		return (
			<ColumnContainer>
				<ColumnHeader>
					<p> {this.props.title}</p>
					<img 
						src='/assets/close.png' 
						id={this.props.uuid} 
						onClick={e => this.props.removeColumn(e)} 
						height='30'
						alt= 'closing icon' />

				</ColumnHeader>

				<div 
					className='DropZone' 
					onDrop= {(e) => this.drop(e)} 
					onDragOver= {(e) => this.allowDrop(e)}
					style= {styles.drop}
				> 
				{ this.renderTasks()}

				</div> 
				

				<div style={{minHzight:'300px'}} >
				{this.state.renderInput ?
				<div>
				<input type="text" onChange={e => this.handleChange(e)}/>
				<div  style={{display:'flex'}} >
				<AddButton onClick={(e) => this.addCard(e) } >Add</AddButton>
				<AddButton onClick={(e) => this.setState({renderInput:false}) } >cancel</AddButton>
				</div>
				
				</div>:
				<AddButton onClick={(e) => this.setState({renderInput:true}) } >add card</AddButton>
				}

				</div>

			</ColumnContainer>
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

export default connect(mapStateToProps)(Column)


const styles = {
	drag: {

		backgroundColor: '#b0d1ff99'
	},
	drop: {
		overflow:'scroll',
		backgroundColor: '#b0d1ff99',
		minHeight: '120px',
		maxHeight: '460px',
		margin: '2%',
	},


}
