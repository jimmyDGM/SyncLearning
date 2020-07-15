import React from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom';

const axios = require('axios')


//should contain a gradient with the different stages of a project (design, test, launch)
// should contain the logo, the description, the team, the name, the likes and comments, 
//the image gallery, some related articles. some stats

class ProjectInvite extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name:''
        }
    }

    fetchProjectName() {
        // var url = window.location.href;
		// var splitedUrl = url.split('/')		
        // axios.get(this.props.baseApi+'api/project/name/'+ splitedUrl[4])
        // .then(res => {
        //     if (res.status === 200) {

        //       } else {
        //         const error = new Error(res.error);
        //         throw error;
        //       }
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
    }

    addMember() {
        var url = window.location.href;
		var splitedUrl = url.split('/')		
        axios.get(this.props.baseApi+'api/project/invite/'+ splitedUrl[4])
        .then(res => {
            if (res.status === 200) {
                window.location.replace("/Dashboard");
                return <Redirect to="/UserProfile" />;
              } else {
                const error = new Error(res.error);
                throw error;
              }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

	render() {
		return (
           <Container>
               <h2>welcome to </h2>
                <button onClick={e => this.addMember()} >JOIN</button>
           </Container>
		);
	}
}


const mapStateToProps = (state) => {
    return{
		currentProject: state.currentProject,
        level:state.level,
		baseApi: state.baseApi
        
    }
}

export default connect(mapStateToProps)(ProjectInvite)



const Container = styled.div`
    text-align:center;

    button {
        text-align: center;
        background-color: #12d238;
        color: white;
        border-radius: 15px;
        width: 80px;
        padding:1%;
    }
	
`
