import React from 'react';
import {RoundImg, RoundWrapper} from './DesktopStyles';





const DesktopRounds =(props) => {

    return(
            <RoundWrapper>
                <RoundImg src={props.image} />
                <h3>{props.text}</h3>
            </RoundWrapper>
        
    )
}


export default DesktopRounds;