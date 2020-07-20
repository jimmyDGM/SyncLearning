import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid light;
  border-radius: 10px;
`;
const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: none;
`;

const StyledContainer = styled.div`
  max-width: 300px;
  width: 100%;
  text-align: center; 
  border: 3px solid;
  justify-content: space-between;
  border-radius: 10px;
  border-style: outset;
`;
const Card = (props) => {

    return (
        <div>
            <StyledContainer>

            <h3>{props.status}</h3>
            <StyledImg src={props.image} />
            <Button>{props.name}</Button>
            </StyledContainer>

        </div>

    )
}

export default Card;