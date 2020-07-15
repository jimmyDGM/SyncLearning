import React from 'react';
import { connect } from 'react-redux'
import UserActivities from './UserActivities'
import UserProfile from './UserProfile'
import UserProject from './UserProject'
import UserSettings from './UserSettings'
import { ProfilePicture, Container, SwitchContainer } from './ProfileStyle'
const axios = require('axios');

class ProfileScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            section:'profile',
            name: '',
        }

    }

    componentDidMount() {
		axios.get(this.props.baseApi+'api/user/data')
		  .then(res => {
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

    renderSwitch() {
        return(
            <div style={{display:'flex', marginLeft:'5%'}} >
                <SwitchContainer current={this.state.section} section='profile' > 
                    <button onClick={() => this.setState({section:'profile'})} >profile</button>
                </SwitchContainer>
                <SwitchContainer current={this.state.section} section='activities' > 
                    <button onClick={() => this.setState({section:'activities'})} >activities</button>
                </SwitchContainer>                
                <SwitchContainer current={this.state.section} section='projects' > 
                    <button onClick={() => this.setState({section:'projects'})} >projects</button>
                </SwitchContainer>                
                <SwitchContainer current={this.state.section} section='settings' > 
                    <button onClick={() => this.setState({section:'settings'})} >settings</button>
                </SwitchContainer>
               
            </div>
        )
    }

    renderSections() {
        switch (this.state.section) {
            case 'profile':
                return (
                    <UserProfile></UserProfile>
                )
            case 'activities':
                return (
                    <UserActivities></UserActivities>
                )
            case 'projects':
                return (
                    <UserProject></UserProject>
                )
            case 'settings':
                return (
                    <UserSettings></UserSettings>
                )
            default:
                break;
        }

    }




    render() {

        return (
            <div>
            <Container>
                <ProfilePicture>
                <img src='/assets/smiley.png' alt='profile' width='120px' height='120px'/>
                </ProfilePicture>
                <p>{this.state.name} </p>
            </Container>
            {this.renderSwitch()}

             {this.renderSections()}
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

export default connect(mapStateToProps)(ProfileScreen)

