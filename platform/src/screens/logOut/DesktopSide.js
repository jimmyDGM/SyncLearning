import React from 'react';
import styled from 'styled-components';


const SideContainer = styled.div`
display: flex;
margin: auto;
width: 50%;
padding: 1em;
`

const SideImg = styled.img`
margin-left: 2em;
margin-right: 2em;
`
const TextWrapper = styled.div`
`
const SideTitle = styled.h3`
`

const Col = styled.div`
justify-content: space-between;
display: flex;
flex-direction: ${props => props.position};
`

const SideText = styled.p`
`

const DesktopSide = (props) => {

    return(
        <div>
            <SideContainer>
                <Col position={props.position}>
                <SideImg src={props.image} />
                    <TextWrapper>
                        <SideTitle>{props.title}</SideTitle>
                        <SideText>{props.text}</SideText>
                    </TextWrapper>
                </Col>
            </SideContainer>
        </div>
    )
}


export default DesktopSide