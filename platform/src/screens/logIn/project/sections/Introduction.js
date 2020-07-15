import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { setProject } from '../actions/actions'
const axios = require('axios');

class Introduction extends React.Component {

	constructor(props) {
		super(props);
		this.state= {
            name:''
		}
    }

    componentDidMount() {
        this.fetchUser() 
    }

    fetchUser() {
		axios.get(this.props.baseApi+'api/user/data')
		  .then(res => {
			if (res.status === 200) {
                console.log(res)
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
    
    handleChange(e) {
		this.setState({[e.target.id]: e.target.value})
    }
    

    LanchProject(e) {
		
        axios.post(this.props.baseApi+'api/Project', { 
            name:this.state.name, 
            email:this.state.email,
             })
        .then((response) => {
            this.props.setProject(response.data)
            this.props.launch()

            return	<Link className="pages" to={'/SocialContract/'+response.data._id} ></Link>
        })
        .catch((error) => {
          console.log(error);
        });   
    }
    
	render() {
		return (
            <div>

                <Container>
                    <h2>Launch</h2>
                    <p>launching a project is like building a house it require plans, resources and the right 
                        people to truly make it amazing
                    </p>
                    <p> by applying to this you take the first step to find those tree essential elements</p>
                    <p> you can save your answers and continue later</p>
                    <p>take the time to make it well</p>
                    {this.state.adding ? 
				<div>
					<input 
						id='name' 
						type='text'
						onChange={e => this.handleChange(e)}
					/>
					<AddButton onClick={e => this.LanchProject()} >Create</AddButton> 
                </div>:
			
                
				<AddButton onClick={e => this.setState({adding: true})} >Create new Project</AddButton> 

				}


                    <h3>Step 1</h3>
                    <p> 
                        when you create a project, you'll get access to different tools in your dashboard,
                        that will help you to develop your project
                        
                    </p>
                    <h3>Step 2</h3>
                    <p> 
                        when you are ready, publish the first draft of your project plan 
                        that will put your project in the forum
                        so you can get precious feed backs from the community.
                        you then get access to more tools.
                        
                    </p>
                    <h3>Step 3</h3>
                    <p> 
                        Ask for community's help and use our suggestion tools to help you understand 
                        how to get the best agreements.
                        
                    </p>

                </Container> 
            </div>
		);
	}
}

//const setProject = () => ({ type: 'SET_PROJECT' })

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateProject: () => dispatch(setProject()),

//   }
// };

const mapStateToProps = (state) => {
  return{
      currentProject: state.currentProject,
      level:state.level,
      baseApi : state.baseApi
  }
}

export default connect(mapStateToProps, {setProject})(Introduction)



const Container = styled.div`

	width:100%;
	margin: 2%;
`

const AddButton = styled.div`
	color: white;
	background-color: #b0d1ff;
	padding : 2%;
	border-radius : 10px;
    max-width: 10%;
`
