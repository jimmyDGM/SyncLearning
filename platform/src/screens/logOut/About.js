import React from 'react';
import Banner from './Banner';
import _ from 'lodash';
import DesktopRounds from './DesktopRounds';
import DesktopSide from './DesktopSide';
import styled from 'styled-components';
import DesktopComponents from './DesktopComponents';



let BannerItems = 
    {image:`${require("./../../assets/images/golden-gate.jpg")}`, text:"Lorem Ipsum it amet, te vel nobis consul recusabo, qui numquam senserit eu. Nominavi repudiandae ut per. Debet cetero at sed. Mea ei agam feugiat nonumes, vim et tractatos conceptam. Id dicit dolores sea, et sed laudem dolores. Per munere postulant mnesarchum ad, vis admodum molestie antiopam ut.", title:"ejejejeje", button:"Contact us"};

	let Sides = {text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam', 
	image:`${require("./../../assets/images/example.jpg")}`,
	title:'Lorem Ipsum'}	
	
	let DesktopOnes = [
		{image:`${require("./../../assets/images/test1.png")}`, text:"First Column"},
		{image:`${require("./../../assets/images/test2.png")}`, text:"Second Column"},
		{image:`${require("./../../assets/images/test3.png")}`, text:"Third Column"},
	]

let Rounds = [
	{image:`${require("./../../assets/images/round1.png")}`, text:"lorem ipsul dollores et git"},
	{image:`${require("./../../assets/images/round2.png")}`, text:"lorem ipsul dollores et git"},
	{image:`${require("./../../assets/images/round3.png")}`, text:"lorem ipsul dollores et git"},
	{image:`${require("./../../assets/images/round4.png")}`, text:"lorem ipsul dollores et git"},
	  
] 

const DesktopOneContainer= styled.div`
width:100%;
display: grid;
grid-template-columns:1fr 1fr 1fr;

grid-gap: 30px 30px;
justify-items: center;
align-items: center;
`

const RoundContainer = styled.div`
  display: flex;
  margin: 2em auto;
  overflow-x: scroll;
  width: 50%;
`  


export default class AboutScreen extends React.Component {


renderRounds(Round, index) {
	let roundList = _.partition(Round, index)
	let result = roundList[0].map(Round => {
	  return(
		<DesktopRounds image={Round.image} text={Round.text}/>
	  )
	})
	return(result)
};

renderDesktopComponents(DesktopOne, index) {
	let desktopList = _.partition(DesktopOne, index)
	let outcome = desktopList[0].map(DesktopOne => {
	  return (
		<DesktopComponents image={DesktopOne.image} text={DesktopOne.text}/>
	  )
	})
	return(outcome)
  };
	render() {
		return (
			<div>
				<Banner item={BannerItems} position={`center`} />
                About
				<DesktopOneContainer>
          			{this.renderDesktopComponents(DesktopOnes)}
        		</DesktopOneContainer>
				<DesktopSide image={Sides.image} text={Sides.text} title={Sides.title} position={'row'} />
				<DesktopSide image={Sides.image} text={Sides.text} title={Sides.title} position={'row-reverse'} />
				<RoundContainer>
					{this.renderRounds(Rounds)}
				</RoundContainer>

				
            </div>
		)
	}
}
