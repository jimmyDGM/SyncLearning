import React from 'react';
import styled from 'styled-components';




const RoundWrapper = styled.div`
width: 100%;
text-align: center; 
padding-left: 20px;
padding-right: 20px;
`

const RoundImg = styled.img`
border-radius: 50%;
`


const DesktopRounds =(props) => {

    return(
            <RoundWrapper>
                <RoundImg src={props.image} />
                <h3>{props.text}</h3>
            </RoundWrapper>
        
    )
}


export default DesktopRounds;