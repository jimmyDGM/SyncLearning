import React, { Profiler } from 'react';
import axios from 'axios';
import styled from 'styled-components';



const ProfileBanner = styled.div`
display: block;
overflow: hidden;
`

const AvatarCard = styled.div`
display: grid;
width: 30%;
`

const Avatar = styled.img`
width: 30%;
border-radius: 50%;
`
const UserName = styled.h3`

`
const Edit = styled.button`

`


const Profile = () => {

    
        return(
            <ProfileBanner>
                <AvatarCard>
                    <Avatar src={require('./../../assets/images/avatarcode.png')} />
                    <UserName>
                        User
                    </UserName>
                </AvatarCard>
                <Edit>Edit</Edit>

            </ProfileBanner>
        )
    }



export default Profile;