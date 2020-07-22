import React from 'react';
import styled from 'styled-components';



const Grid = styled.div`
`;

const Row = styled.div`
display: flex;
`;

const Col = styled.div`
flex: ${(props) => props.size};
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
        <Grid>
            <Row>
                <Col size={1}>
                    <DesktopImg src={props.image} />
                    <h3>{props.text}</h3>
                </Col>
               
            </Row>
          
        </Grid>
    )
}


export default DesktopComponents;