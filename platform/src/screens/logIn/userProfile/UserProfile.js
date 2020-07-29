import React from 'react';
import UserTimeLine from './UserTimeLine'
import { connect } from 'react-redux'

import { ProfileInputs, EditButton, TextContainer, TimePoint, BadgeCell, DateBubble, Container } from './ProfileStyle'
const axios = require('axios');

class UserProfile extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

			name: '',
			description: '',
			jobTitle: '',
			skillList: ['js', 'go', 'solidity'],
			experience: [],
			formations: [],
			file: null,
			photo: '',
			info:{
				firstName:'',
				lastName:''
			},
			newSkill:'',

		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		axios.get('http://localhost:6200/api/user/data')
			.then(res => {
				if (res.status === 200) {
					this.setState(res.data);
					console.log(res.data)
				} else {
					const error = new Error(res.error);
					throw error;
				}
			})
			.catch(err => {
				console.error(err);
				this.setState({ loading: false, redirect: true });
			});
	}

	updateDb() {
		axios.post('http://localhost:6200/api/user/details', this.state)
			.then(res => {
				console.log(res)
				if (res.status === 200) {
				} else {
					const error = new Error(res.error);
					throw error;
				}
			})
			.catch(err => {
				console.error(err);
				this.setState({ loading: false, redirect: true });
			});
	}

	

	renderTimeLine(experience) {
		let line = experience.map((event, index) => {
			return (
				<TimePoint key={index} >
					<DateBubble>
						<p>{event.date} </p>
					</DateBubble>
					<div style={{ width: '80%' }} >
						<h3>{event.name}</h3>
						<p>{event.description}</p>
					</div>

				</TimePoint>

			)
		})

		return line

	}

	renderExperienceForm() {
		return (

			<div>
				<label>title</label>
				<input
					type='text'
					onChange={e => this.handleChange(e)}
				/>
				<label>description</label>

				<input
					type='text'
					onChange={e => this.handleChange(e)}
				/>
				<label>date</label>

				<input
					type='date'
					onChange={e => this.handleChange(e)}
				/>
				<button onClick={e => this.addExperience()}>add</button>

			</div>
		)
	}

	addExperience() {
		let experience = this.state.experience
		experience.push(this.state.newExperience)
		this.setState({ experience:experience, showForm:false }, () => this.updateDb())
	}



	addSkill() {
		let skills = this.state.skillList
		skills.push(this.state.newSkill)
		this.setState({ skillList:skills, showForm:false }, () => this.updateDb())
	}

	renderAddSkills() {
		return(
			<div>
				<input id='newSkill' onChange={e => this.handleChange(e)} />
				<button onClick={e => this.addSkill()} >Add</button>
			</div>
		)
	}

	renderSkills() {
		let skills = this.state.skillList.map((skill, index) => {
			return (
				<BadgeCell key={index} >{skill} </BadgeCell>
			)
		})
		return skills
	}

	handleChange(e) {
		this.setState({ [e.target.id]: e.target.value })
	}

	onChange(e) {
		this.setState({ file: e.target.files[0] }, e => console.log(this.state));

	}

	handleSubmit(e) {
		e.preventDefault()
		const formData = new FormData();
		formData.append('myImage', this.state.file);
		console.log(formData)
		axios.post("http://localhost:6200/api/uploadProfile", formData)
			.then((response) => {
				console.log(response)
				alert("The file is successfully uploaded");
			}).catch((error) => {
				console.log(error)
			});
	}

	//incorporate dynamic input

	renderInput(type, value) {
		return (
			<div>
				<ProfileInputs
					id={type}
					type='text'
					value={value}
					onChange={e => this.handleChange(e)}
				/>
			</div>
		)
	}

	renderContent(content) {
		return (
			<div>
				{content}
			</div>
		)
	}

	renderDynamic(type, value) {
		return (
			<div>
				{
					this.state.showForm ? this.renderInput(type, value) : this.renderContent(value)

				}
			</div>
		)

	}



	render() {
		return (

			<Container>
				{
					this.state.showForm ?
						<EditButton onClick={e => this.updateDb()} > submit </EditButton> :

						<EditButton onClick={e => this.setState({ showForm: true })} >edit my profile</EditButton>
				}


				<div>
					<div style={{ marginRight: '4%' }} >
						{
							this.state.showForm ?
								<form onSubmit={this.handleSubmit}>
									<h3>upload profile picture</h3>
									<input type="file" name="myImage" onChange={this.onChange} />
									<button type="submit">Upload</button>
								</form>
								:
								null
						}

						<h3>{this.renderDynamic('jobTitle', this.state.jobTitle)}</h3>


					</div>


					<div>

					</div>
				</div>
				<div style={{display:'flex', justifyContent:'space-around' }} >
					<div>
						<h2>first name</h2>
						<p>{this.state.name}</p>
					</div>
					<div>
						<h2>last name</h2>
						<p>{this.state.name} </p>
					</div>
				</div>


						<h2>mail</h2>
						<p>{this.state.eMail} </p>




				<h2>Description</h2>
				<TextContainer>{this.renderDynamic('description', this.state.description)} </TextContainer>
				<h2>Skills</h2>

				<TextContainer>
					{this.state.showForm? this.renderAddSkills() : this.renderSkills()}

				</TextContainer>
				<h2>experience</h2>
				<UserTimeLine
					show={this.state.showForm}
					experience={this.state.experience}
					url={'http://localhost:6200/api/user/experience'}
				/>
				<h2>Formations</h2>

				<UserTimeLine
					show={this.state.showForm}
					experience={this.state.formations}
					url={'http://localhost:6200/api/user/formations'}
				/>

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

export default connect(mapStateToProps)(UserProfile)





const data = [
	{
		name: 'CEO',
		description: 'Cupidatat eu minim sint dolore qui sunt esse sit magna incididunt occaecat sit incididunt dolore.',
		date: '2016'
	},
	{
		name: 'CEO',
		description: 'Cupidatat eu minim sint dolore qui sunt esse sit magna incididunt occaecat sit incididunt dolore.',
		date: '2016'
	},
	{
		name: 'CEO',
		description: 'Cupidatat eu minim sint dolore qui sunt esse sit magna incididunt occaecat sit incididunt dolore.',
		date: '2016'
	},
	{
		name: 'CEO',
		description: 'Cupidatat eu minim sint dolore qui sunt esse sit magna incididunt occaecat sit incididunt dolore.',
		date: '2016'
	}
]