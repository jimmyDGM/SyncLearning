import React,{ Fragment }from 'react';
import styled from 'styled-components'

export default class SignInForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            sliderImages: ['/assets/calendar.svg', '/assets/canvas.svg', '/assets/businessPlan.svg', '/assets/default.png'],
            frontImage: '/assets/calendar.svg',
        }
    }
	render() {
		return (
			<Fragment>
                <SliderContainer>
                    <img src={this.state.frontImage} alt='slider Message' />
                </SliderContainer>
			</Fragment>
		);
	}
}

const SliderContainer = styled.div`
	border: 2px solid black;
	border-radius:10px;
    height: 300px;
    display: flex;
	justify-content:space-around;

`