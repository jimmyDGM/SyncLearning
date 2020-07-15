import React from 'react';
import CheckList from './CheckList'
import moment from 'moment'
import { connect } from 'react-redux'
import { OffDescription, 
	TodoContainer, 
	AddButton, 
	TextArea, 
	Widgets, 
	Header, 
	Cell, 
	Footer, 
	Switcher, 
	WidgetWrapper, 
	Info,
	Comment,
	CommentInput,
	ContentCell
} from './styles/TaskModalStyle'

const axios = require('axios');

//TO DO
//add date handler function, add comments, put widgets into a box with changes

//add category, date, and member badge in header

class TaskModal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			description: props.description,
			changeDescription: false,
			uuid: props.uuid,
			checkList: props.checkList,
			title: props.title,
			members: props.members,
			member: 0,
			category: props.badges,
			team: props.teamMembers,
			widget:'description',
			comments: props.comments,
			addComment:'',
		}
	}

	componentDidMount() {
		this.setState({ description: this.props.description })

	}

	addCategory() {
		let newTasks = this.state.category
		let badge = {}
		badge.title = this.state.badgeName
		badge.color = this.state.badgeColor

		newTasks.push(badge)
		this.setState({
			category: newTasks
		}, e => this.addCategoryDb())
	}

	addCategoryDb() {
		var url = window.location.href;
		var splitedUrl = url.split('/')
		let badge = {}
		badge.title = this.state.badgeName
		badge.color = this.state.badgeColor
		axios.post(this.props.baseApi+'api/kanban/card/badges/' + splitedUrl[4], this.state)
		.then((response) => {
			console.log(response.data)
		})
		.catch((error) => {
			console.log(error);
		});
	}

	addComment() {
		let newTasks = this.state.comments
		let text = this.state.addComment
		let date = moment().format('MMMM Do YYYY, h:mm:ss a');
		let comment = { text: text, date: date, uuid:this.state.uuid }
		var url = window.location.href;
		var splitedUrl = url.split('/')
		axios.post(this.props.baseApi+'api/kanban/card/comments/' + splitedUrl[4], comment)
		.then((response) => {
			console.log(response.data)
		})
		.catch((error) => {
			console.log(error);
		});

		// newTasks.push({
		// 	text: text, date: date
		// })
		// this.setState({
		// 	comments: newTasks
		// }, e => this.addMemberDb())
	}

	addMember() {
		let newTasks = this.state.members
		let name = this.state.team[this.state.member].name
		let mail = this.state.team[this.state.member].mail
		newTasks.push({
			name: name, mail: mail, tasks: []
		})
		this.setState({
			members: newTasks
		}, e => this.addMemberDb())
	}

	addMemberDb() {
		var url = window.location.href;
		var splitedUrl = url.split('/')
		axios.post(this.props.baseApi+'api/kanban/card/members/' + splitedUrl[4], this.state)
		.then((response) => {
			console.log(response.data)
		})
		.catch((error) => {
			console.log(error);
		});
	}

	changeValue(e) {
		e.persist()
		this.setState({
			description: e.target.value
		})
	}

	handleChange(e) {
		console.log(e.target.value)
		this.setState({ [e.target.id]: e.target.value })
	}

	handleDelete() {
		var url = window.location.href;
		var splitedUrl = url.split('/')
		axios.post(this.props.baseApi+'api/kanban/card/delete/' + splitedUrl[4], this.state)
			.then((response) => {
				console.log(response.data)
				this.setState({ open: null })

			})
			.catch((error) => {
				console.log(error);
			});
	}

	handleSave() {
		var url = window.location.href;
		var splitedUrl = url.split('/')
		axios.post(this.props.baseApi+'api/kanban/card/description/' + splitedUrl[4], this.state)
			.then((response) => {
				console.log(response.data)
				this.handleCancel()
			})
			.catch((error) => {
				console.log(error);
			});
	}

	handleCancel() {
		this.setState({ changeDescription: false })
	}

	renderDescriptionForm() {
		return (
			<form>
				<TextArea
					value={this.state.description}
					onChange={e => this.changeValue(e)}
				>

				</TextArea>
				<div style={{ width: '5%', display: 'flex' }} >
					<AddButton onClick={e => this.handleSave()} ><p>save</p></AddButton>
					<AddButton onClick={e => this.handleCancel()}><p>cancel</p></AddButton>
				</div>

			</form>
		)
	}

	renderDescription() {
		let description = this.state.description
		if (description.length < 2) {
			description = 'write a description'
		}
		return (
			<OffDescription onClick={e => this.setState({ changeDescription: true })} >
				<p>{description} </p>
			</OffDescription>

		)
	}

	renderMember() {
		let team = this.state.members.map((mem, i) => {
			return (
				<ContentCell key={i + mem.name} >
					<p>{mem.name} </p>
				</ContentCell>
			)
		})
		return team
	}

	renderAddMember() {
		let people = this.state.team.map((peo, i) => {
			return (
				<option key={'opt'+i} value={i} >{peo.name} </option>
			)
		})

		return (
			<select id='member' onChange={e => this.handleChange(e)} >
				{people}
			</select>
		)
	}

	renderAddCategory() {
		return (
			<div>
				name
				<input id='badgeName' onChange={e => this.handleChange(e)} />
				color
				<input id='badgeColor' type='color' onChange={e => this.handleChange(e)} />
				<button onClick={e => this.addCategory()} >add category</button>
			</div>
		)
	}

	renderCategory() {
		let badges = this.state.category.map((cat, i) => {
			return (
				<div key={'badges' +i} style={{backgroundColor:cat.color }} >
					{cat.title}
					
				</div>
			)
		})
		return badges
	}

	renderComments() {
		let comments = this.state.comments.map((com, i) => {
			return (
				<Comment key={'comment'+i} >
					{com.text}
					<p>{com.date} by {com.author} </p>
				</Comment>
			)
		})
		return comments

	}

	renderWidgets() {
		switch (this.state.widget) {
			case 'todo':
				return (
					<TodoContainer>
						<h3>To Do</h3>
						<CheckList items={this.state.checkList} uuid={this.state.uuid} ></CheckList>
					</TodoContainer>
				)
			case 'members':
				return (
					<WidgetWrapper>
						<h3>members</h3>
						{this.renderMember()}
						{this.renderAddMember()}
						<button onClick={e => this.addMember()} >Add</button>

					</WidgetWrapper>
				)
			case 'categories':
				return (
					<WidgetWrapper>
						<h3>badges</h3>
						{this.renderCategory()}
						{this.renderAddCategory()}

					</WidgetWrapper>
				)
			case 'date':
				return (
					<WidgetWrapper>
						<h3>Time</h3>
						<p>Add a date</p>
						title
						<input type='text'/>
						date
						<input type='date'/>
						<button>add</button>
						<p>time it will take</p>
						years
						<input type='number' />
						month
						<input type='number' />
						days
						<input type='number' />
						hours
						<input type='number' />
						minutes
						<input type='number' />



					</WidgetWrapper>
				)
			case 'comments':
				return (
					<WidgetWrapper>
						<h3>comments</h3>
			

						{this.renderComments()}
						<CommentInput>
						<input id='addComment' onChange={e => this.handleChange(e)} />
						<button onClick={e => this.addComment()} >Comment</button>
						</CommentInput>
					</WidgetWrapper>
				)
			case 'description':
				return (
					<WidgetWrapper>
						<h3 onClick={e => this.setState({ changeDescription: true })} >Description</h3>
						{
							this.state.changeDescription ? this.renderDescriptionForm() : this.renderDescription()

						}

					</WidgetWrapper>
				)

			default:
				break;
		}
	}

	renderWidgetSwitch() {
		return (
			<Switcher>
				<Cell onClick={() => this.setState({ widget: 'description' })} ><p>Description </p></Cell>
				<Cell onClick={() => this.setState({ widget: 'todo' })} ><p>To Do </p></Cell>
				<Cell onClick={() => this.setState({ widget: 'members' })} ><p>members</p> </Cell>
				<Cell onClick={() => this.setState({ widget: 'categories' })} ><p>badges</p> </Cell>
				<Cell onClick={() => this.setState({ widget: 'date' })} ><p>Time</p> </Cell>
				<Cell onClick={() => this.setState({ widget: 'resources' })} ><p>Resources</p> </Cell>
				<Cell onClick={() => this.setState({ widget: 'comments' })} ><p>comments</p> </Cell>
			</Switcher>
		)
	}

	render() {

		const { closeModal } = this.props
		if (this.props.open !== null) {
			return (
				<div style={styles.container} >

					<Info>
						<Header>
							<div >
								<h2>{this.props.title}</h2>
							</div>
							<div>
								<img src='/assets/close.png' onClick={closeModal} height='30' alt='' />

							</div>
						</Header>
						<Widgets>
							{this.renderWidgetSwitch()}
							{this.renderWidgets()}
						</Widgets>

						<Footer>
							
								<button onClick={e => this.handleDelete()} >delete</button>

							
							{/* <button >move in</button>
							<button  >copy to</button>
							<button  >duplicate</button>
							<button  >create child table</button> */}

						</Footer>
					</Info>
				</div>
			);

		} else {
			return (
				<div></div>
			)
		}

	}
}

const mapStateToProps = (state) => {
    return{
		currentProject: state.currentProject,
        level:state.level,
        baseApi : state.baseApi
    }
}

export default connect(mapStateToProps)(TaskModal)


const styles = {
	container: {
		backgroundColor: '#00000099',
		zIndex: 30,
		top: 0,
		left: 0,
		height: '100%',
		position: 'absolute',
		width: window.innerWidth,
		display: 'flex',

	},

}



TaskModal.defaultProps = {
	source: '/imageCha/artCha1.jpg',
	sourceCross: '/cross.png',
	artiste: 'picasso',
	title: 'guernica',
	annee: 'annee',
	hash: '0x6d6zg664e661fa2d2e3f56a67e6b6d',
	descritption: 'tyui',
}
