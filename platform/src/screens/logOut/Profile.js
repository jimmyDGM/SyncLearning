import React, { Profiler } from 'react';
import axios from 'axios';
import styled from 'styled-components';





const ProfileBanner = styled.div`
display: inline-grid;
grid-template-columns:1fr 1fr 1fr;
grid-template-rows: 1fr 1fr;
background-color: #b0d1ffaa;

`

const AvatarCard = styled.div`
display: flex;
border: 1px solid;
position: relative;
`

const Avatar = styled.img`
width: 100%;
border-radius: 50%;
`
const UserName = styled.h3`
position: absolute;
top: 60%;
left: 50%;
`
const ConnectionsList = styled.ul`
display: flex;
`

const ListItem = styled.li`
margin: auto;
`

const Edit = styled.button`
`
const DesktopOneContainer= styled.div`
width:100%;
display: grid;
grid-template-columns:1fr 1fr 1fr;

grid-gap: 30px 30px;
justify-items: center;
align-items: center;
`


const Profile = () => {

    
    
    
        return(
            <div>
            <ProfileBanner>
                <AvatarCard>
                    <Avatar src={require('./../../assets/images/avatarcode.png')} />
                    <UserName>
                        User
                    </UserName>
                </AvatarCard>
                <div>
                    <button>follow</button>
                    <ConnectionsList>
                        <ListItem>total projects</ListItem>
                        <ListItem>followers</ListItem>
                        <ListItem>following</ListItem>
                    </ConnectionsList>
                </div>
                <Edit>Edit</Edit>

            </ProfileBanner>

            <div>
                <h2>info:</h2>
                <h2>quote:</h2>
            </div>

            <div>
                <h3>projects</h3>
                <h3>todo</h3>
            </div>
            
            </div>
        )
    }



export default Profile;