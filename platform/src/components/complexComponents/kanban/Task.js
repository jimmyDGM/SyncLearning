import React from 'react';
import TaskModal from './TaskModal.js'
import styled from 'styled-components';

export default class Task extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: null,
			teamMembers: props.data.teamMembers
		}
		this.closeModal = this.closeModal.bind(this)
	}

	openModal(e) {
		e.preventDefault()
		this.setState({
			open: 'yop'
		})

	}
	closeModal(e) {
		e.preventDefault()
		this.setState({
			open: null
		})
	}

	drag(e, order) {
		e.dataTransfer.setData('text/plain', order);
		console.log('drag', order)
	}
	render() {
		var description = this.props.data.description.length > 3
		var check = this.props.data.checklists.length > 1
		return (
			<div>
				<Card
					draggable
					onDragStart={(e) => this.props.drag(e, JSON.stringify(this.props.data))}
					onDragEnd={e => this.props.dragEnd(this.props.data)}
					onClick={(e) => this.openModal(e)}
				>
					<p>{this.props.data.title}</p>
					<div style={{ display: 'flex', justifyContent: 'space-around' }} >
						{description ? <img src='/assets/comments.png' alt='comment icon' /> : null}
						{check ? <img src='/assets/ic_check_box.png' alt='comment icon' /> : null}

						<img src='/assets/ic_chat.png' alt='chat icon' />

					</div>
				</Card>

				<TaskModal
					open={this.state.open}
					title={this.props.data.title}
					closeModal={this.closeModal}
					description={this.props.data.description}
					uuid={this.props.data.uuid}
					checkList={this.props.data.checklists}
					members={this.props.data.members}
					teamMembers= {this.state.teamMembers}
					comments= {this.props.data.comments}
					badges= {this.props.data.categories}
				/>
			</div>

		);
	}
}

const Card = styled.div`
	color: #999999;
	background-color: #ffffff;
	box-shadow: 2px 2px #99999922;
	border-radius: 5;
	padding:1%;
	margin-bottom: 10px;
`