import React from 'react';
import { connect } from 'react-redux'
import { setProject } from '../../../store/actions/actions'
import { Link } from 'react-router-dom';

import { SquareCard, GridContainer } from './ProfileStyle'
const axios = require('axios');

class UserProject extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projects : []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:6200/api/user/data')
        .then((response) => {
            this.setState({projects:response.data.projects})
		})
		.catch((error) => {
			console.log(error);
		})
    }

    renderProjects(projects) {
        let projectList = projects.map(project => {
            return(
                <SquareCard onClick={e => setProject(project)} >
                    {project.name}
                </SquareCard>
            )
        })

        return projectList
    }


    render() {

        if(this.state.projects.length >0) {
            return (

                <GridContainer >
                    {this.renderProjects(this.state.projects)}
                   <Link  to="/SocialContract">
                   <SquareCard >
                        <img src='/assets/ic_add.png' alt='add project button' />
                    </SquareCard>
                   </Link> 
                </GridContainer>
            );
        } else {
            return(
                <div style={{textAlign:'center', marginTop: '30px'}}>
                    <div  >
                    <Link className="pages" to="/SocialContract"> <p>Launch a project</p> </Link>

                    </div>
                    <div>
                       or 
                    </div>
                    <div>
                    Join one of our community project

                    </div>
                </div>
            )
        }

    }
}

const mapStateToProps = (state) => {
    return {
        currentProject: state.currentProject,
        level: state.level,
        baseApi: state.baseApi
    }
}


export default connect(mapStateToProps, {setProject})(UserProject)

