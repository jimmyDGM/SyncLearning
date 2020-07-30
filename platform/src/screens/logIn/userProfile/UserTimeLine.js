import React from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux'
import {TextContainer} from './ProfileStyle'

const axios = require('axios');

class UserTimeLine extends React.Component {

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
            newExperience: [{experienceDate:'', experienceName:'', experienceDescription:'' }],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    updateDb() {
        console.log(this.state)

        axios.post('http://localhost:6200/api/user/data', this.state)
            .then(res => {
                console.log(res)

                if (res.status === 200) {
                    this.setState(res.data);
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
        console.log(this.props.experience)
        if(this.props.experience) {
            let line = experience.map((event, index) => {
                return (
                    <TimePoint key={index} >
                        <DateBubble>
                            <p>{event.date} </p>
                        </DateBubble>
                        <div style={{ width: '80%' }} >
                            <h3>{event.name}</h3>
                            <p>{event.experienceName}</p>
                        </div>
                    </TimePoint>
                )
            })
            return line
        }

    }

    addExperience() {
		let experience = this.state.experience
		experience.push(this.state.newExperience)
		this.setState({ experience:experience, showForm:false }, () => this.updateDb())
	}

    renderExperienceForm() {
        return (

            <div>
                <label>title</label>
                <input
                    id='experienceName'
                    type='text'
                    onChange={e => this.handleChange(e)}
                />
                <label>description</label>

                <input
                    id='experienceDescription'
                    type='text'
                    onChange={e => this.handleChange(e)}
                />
                <label>date</label>

                <input
                    id= 'experienceDate'
                    type='date'
                    onChange={e => this.handleChange(e)}
                />
                <button onClick={e => this.addExperience()} >add</button>

            </div>
        )
    }

    

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value })
    }

    onChange(e) {
        this.setState({ file: e.target.files[0] }, e => console.log(this.state));

    }

    handleSubmit(e) {
        e.preventDefault()



        axios.post(this.props.url, this.state.experience)
        .then((response) => {
          console.log(response.data);
          
        })
        .catch((error) => {
          console.log(error);
        });
    }


    render() {

        return (

            <TextContainer>

                <div>
                    {this.props.show? this.renderExperienceForm(): this.renderTimeLine(this.state.experience)}
                </div>

            </TextContainer>
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

export default connect(mapStateToProps)(UserTimeLine)

const TimePoint = styled.div`
	display:flex;
	align-items:center;

`

const DateBubble = styled.div`
	font-size: 15px;
	margin:3%;
	border: 2px solid #b0d1ff;
	border-radius: 100px;
	width: 6%;
	height: 50px;
	text-align:center;
`


