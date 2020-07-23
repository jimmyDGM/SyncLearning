import React from 'react';
import styled from 'styled-components';



const Wrapper = styled.div`
justify-content: space-evenly;
text-align: center;
`

const Number = styled.h3`

`

const Text = styled.p`

`



const DesktopNumbers = (props) => {
    return(
        <Wrapper>
            <Number>{props.number}</Number>
            <Text>{props.text}</Text>
        </Wrapper>

    )
}


export default DesktopNumbers;