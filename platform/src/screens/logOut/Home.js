import React from 'react';
import styled from 'styled-components';
import Card from './Card';
import _ from 'lodash';
import Banner from './Banner';
import DesktopComponents from './DesktopComponents';
import DesktopRounds from './DesktopRounds';



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
]

let Rounds = [
  {image:`${require("./../../assets/images/round1.png")}`, text:"First"},
  {image:`${require("./../../assets/images/round2.png")}`, text:"Second"},
  {image:`${require("./../../assets/images/round3.png")}`, text:"Third"},
  {image:`${require("./../../assets/images/round4.png")}`, text:"Fourth"},

]

  
const CardWrapper = styled.div`
  display: flex;
  margin: 2em;
  justify-content: space-evenly;
  
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

    

    render() {
    return (
      <div>
        <CardWrapper>
          {this.renderRounds(Rounds)}
        </CardWrapper>
        <CardWrapper>
          {this.renderDesktopComponents(DesktopOnes)}
        </CardWrapper>
        <Banner item={BannerItems} position={`center`} />
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

