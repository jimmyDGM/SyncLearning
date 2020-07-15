import React from 'react';
import Column from './Column.js';
import Popover from '../../uiComponents/popover/Popover'
import { connect } from 'react-redux'
import { containsObject } from '../../../utils/util'
import { Container, AddButton, PlusButton, ButtonContainer, Header, AddContainer } from './styles/KanbanStyle'
const axios = require('axios');


class Kanban extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			open: null,
			addMember: false,
			renderInput: false,
			column: [],
			newColumnName: '',
			selectedData: {
				id: '1'
			},
			name: '',
			members: [],
			teamMembers: []
		};
		this.removeColumn = this.removeColumn.bind(this)
		this.closeModal = this.closeModal.bind(this)

	}

	componentDidMount() {
		this.fetchColumns()
		this.fetchMembers()
	}

	closeModal() {
		this.setState({ open: null })
	}

	fetchMembers() {
		axios.get(this.props.baseApi + 'api/Project/Team/' + this.props.currentProject)
			.then((response) => {
				console.log(response)
				this.setState({ teamMembers: response.data })
			})
			.catch((error) => {
				console.log(error);
			});
	}

	fetchColumns() {
		var url = window.location.href;
		var splitedUrl = url.split('/')
		axios.get(this.props.baseApi + 'api/kanban/' + splitedUrl[4])
			.then((response) => {
				console.log(response)
				this.setState({ name: response.data.name, column: response.data.columns, members: response.data.members })
			})
			.catch((error) => {
				console.log(error);
			});
	}

	addColumn(e) {
		let newColumn = this.state.column
		newColumn.push({ name: this.state.newColumnName, uuid: '' + (newColumn.length), Card: [] })
		this.setState({
			column: newColumn,
			renderInput: false
		}, e => this.updateDbState())
	}

	addMember() {
		let newMember = this.state.members
		newMember.push({ email: this.state.teamMembers })
		this.setState({
			members: newMember
		}, e => this.updateMembers())
	}

	updateMembers() {
		var url = window.location.href;
		var splitedUrl = url.split('/')
		let member = { name: this.state.newMember, email: this.state.mail }
		console.log(member)
		axios.post(this.props.baseApi + 'api/kanban/table/members/' + splitedUrl[4], member)
			.then((response) => {
				console.log(response)
				this.setState({
					members: response.data.members
				})
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	updateDbState() {

		var url = window.location.href;
		var splitedUrl = url.split('/')
		axios.post(this.props.baseApi + 'api/kanban/table/' + splitedUrl[4], this.state.column)
			.then(function (response) {
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	removeColumn(e) {
		alert('are you sure')
		this.setState({
			column: this.state.column.filter(col => {
				return col.uuid !== e.target.id
			})
		}, e => this.updateDbState())

	}

	renderColumn(data) {
		const columnRender = data.map(col => {
			if (col !== undefined) {
				return (
					<Column
						title={col.name}
						uuid={col.uuid}
						key={col.uuid}
						removeColumn={this.removeColumn}
						members={this.state.members}
					/>
				)
			} else {
				return null
			}

		})
		return columnRender
	}

	handleChange(e) {
		this.setState({ [e.target.id]: e.target.value })
	}




	renderAddMember(mem) {
		let members = this.state.teamMembers.map(member => {
			//if member is in table team the background should be blue

			if (containsObject(member, mem)) {
				return (
					<div style={{ backgroundColor: 'yellow' }} >
						<p>{member.mail} </p>
					</div>
				)
			}
			return (
				<div onClick={e => this.setState({ mail: member.mail, newMember: member.name })} >
					<p>{member.mail} </p>
				</div>
			)
		})

		return members

	}

	render() {
		return (
			<div >
				<Popover
					open={this.state.open}
					close={this.closeModal}
				>
					<div>
					{this.renderAddMember(this.state.members)}
					<button onClick={() => this.addMember()} >add </button>
					</div>


				</Popover>



				<Header>
					<p>{this.state.name} </p>

					<button onClick={() => this.setState({ open: true })} >add member</button>

				</Header>


				<Container>
					{this.renderColumn(this.state.column)}

					{this.state.renderInput ?
						<AddContainer >
							<input id='newColumnName' onChange={e => this.handleChange(e)} />

							<ButtonContainer >

								<AddButton onClick={(e) => this.addColumn(e)} >Add</AddButton>
								<AddButton onClick={(e) => this.setState({ renderInput: false })} >cancel</AddButton>

							</ButtonContainer>
						</AddContainer> :
						<PlusButton onClick={(e) => this.setState({ renderInput: true })} >
							<img src='/assets/ic_add.png' alt='add button' width='30px' />
						</PlusButton>

					}
				</Container>

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

export default connect(mapStateToProps)(Kanban)
