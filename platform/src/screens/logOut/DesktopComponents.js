import React from 'react';
import styled from 'styled-components';





const Row = styled.div`
display: flex;
`;

const Col = styled.div`
text-align: center;
`;

const DesktopImg = styled.img`
  width: 50%;
  height: 50%;
  object-fit: cover;
  border: 1px solid;
`;



const DesktopComponents = (props) => {
    return (
            <Row>
                <Col>
                    <DesktopImg src={props.image} />
                    <h3>{props.text}</h3>
                </Col>
               
            </Row>          
    )
}


export default DesktopComponents;