import React from 'react';
import styled from 'styled-components';
import {SideCol, SideContainer, SideImg, SideTitle, TextWrapper, SideText} from './Desktopstyles';



const DesktopSide = (props) => {

    return(
        <div>
            <SideContainer>
                <SideCol position={props.position}>
                <SideImg src={props.image} />
                    <TextWrapper>
                        <SideTitle>{props.title}</SideTitle>
                        <SideText>{props.text}</SideText>
                    </TextWrapper>
                </SideCol>
            </SideContainer>
        </div>
    )
}


export default DesktopSide