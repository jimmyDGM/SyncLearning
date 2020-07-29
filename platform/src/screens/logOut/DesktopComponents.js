import React from 'react';
import styled from 'styled-components';
import {Row, Col, DesktopImg} from './DesktopStyles';








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