import React from 'react';
import styled from 'styled-components';
import {Wrapper, Number, Text} from './DesktopStyles';





const DesktopNumbers = (props) => {
    return(
        <Wrapper>
            <Number>{props.number}</Number>
            <Text>{props.text}</Text>
        </Wrapper>

    )
}


export default DesktopNumbers;