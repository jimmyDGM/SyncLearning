import React from 'react';
import styled from 'styled-components';
import Card from './Card';
import _ from 'lodash';
import Banner from './Banner';
import DesktopComponents from './DesktopComponents';
import DesktopRounds from './DesktopRounds';
import DesktopSide from './DesktopSide';
import DesktopNumbers from './DesktopNumbers';



let projects = [
  {status:"Done", image:`${require("./../../assets/images/project-done.png")}`, name:"first"},
  {status:"In progress", image:`${require("./../../assets/images/inprogress.jpg")}`, name:"second"},
  {status:"In progress", image:`${require("./../../assets/images/inprogress.jpg")}`, name:"third"},
  {status:"Done", image:`${require("./../../assets/images/project-done.png")}`, name:"fourth"}];

let BannerItems = 
    {image:`${require("./../../assets/images/golden-gate.jpg")}`, text:"Lorem Ipsum it amet, te vel nobis consul recusabo, qui numquam senserit eu. Nominavi repudiandae ut per. Debet cetero at sed. Mea ei agam feugiat nonumes, vim et tractatos conceptam. Id dicit dolores sea, et sed laudem dolores. Per munere postulant mnesarchum ad, vis admodum molestie antiopam ut.", title:"ejejejeje", button:"Contact us"};

let DesktopOnes = [
  {image:`${require("./../../assets/images/test1.png")}`, text:"First Column"},
  {image:`${require("./../../assets/images/test2.png")}`, text:"Second Column"},
  {image:`${require("./../../assets/images/test3.png")}`, text:"Third Column"},
  {image:`${require("./../../assets/images/test1.png")}`, text:"First Column"},
  {image:`${require("./../../assets/images/test2.png")}`, text:"Second Column"},
  {image:`${require("./../../assets/images/test3.png")}`, text:"Third Column"},
  {image:`${require("./../../assets/images/test2.png")}`, text:"Second Column"},
  {image:`${require("./../../assets/images/test3.png")}`, text:"Third Column"},

]





let Numbers = [
  {number: 23, text:'Fancy text'},
  {number: 34, text:'Fancier text'},
  {number: 7, text:'Fanciest text'},
]
  
const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  
`
  


const DesktopOneContainer= styled.div`
width:100%;
display: grid;
grid-template-columns:1fr 1fr 1fr;

grid-gap: 30px 30px;
justify-items: center;
align-items: center;
`

const NumbersContainer = styled.div`
width: 100%;
display: grid;
grid-template-columns:1fr 1fr 1fr;

`
  
  
  export default class HomeScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state={projects:projects}
    }
    
    renderProjects(project, type)  {
      let projectList = _.partition(project, {'status':type})
      let result = projectList[0].map(project => {
        return (
          <Card image={project.image} name={project.name}/>
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

    renderRounds(Round, index) {
      let roundList = _.partition(Round, index)
      let result = roundList[0].map(Round => {
        return(
          <DesktopRounds image={Round.image} text={Round.text}/>
        )
      })
      return(result)
    };

    renderNumbers(Number, index) {
      let numbersList = _.partition(Number, index)
      let result = numbersList[0].map(Number => {
        return(
          <DesktopNumbers number={Number.number} text={Number.text} />
        )
      })
      return(result)
    };

    

    render() {
    return (
      <div>
        <NumbersContainer>
          {this.renderNumbers(Numbers)}
        </NumbersContainer>
        <Banner item={BannerItems} position={`right`} />
        
        <DesktopOneContainer>
          {this.renderDesktopComponents(DesktopOnes)}
        </DesktopOneContainer>
        <h1>In progress</h1>

        <CardWrapper>
          {this.renderProjects(this.state.projects, 'In progress')}
        </CardWrapper>

        <h1>Done</h1>
        <CardWrapper>

          {this.renderProjects(this.state.projects, 'Done')}
        </CardWrapper>
      </div>
    )
    
}
}

