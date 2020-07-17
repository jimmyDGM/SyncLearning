import React from 'react';
import Styled from 'styled-components';
import styled from 'styled-components';
import Card from './Card';
import _ from 'lodash';
import Banner from './Banner';



let projects = [
  {status:"Done", image:`${require("./../../assets/images/project-done.png")}`, name:"first"},
  {status:"In progress", image:`${require("./../../assets/images/inprogress.jpg")}`, name:"second"},
  {status:"In progress", image:`${require("./../../assets/images/inprogress.jpg")}`, name:"third"},
  {status:"Done", image:`${require("./../../assets/images/project-done.png")}`, name:"fourth"}];

  let BannerItems = 
    {image:`${require("./../../assets/images/golden-gate.jpg")}`, text:"Lorem Ipsum it amet, te vel nobis consul recusabo, qui numquam senserit eu. Nominavi repudiandae ut per. Debet cetero at sed. Mea ei agam feugiat nonumes, vim et tractatos conceptam. Id dicit dolores sea, et sed laudem dolores. Per munere postulant mnesarchum ad, vis admodum molestie antiopam ut.", title:"ejejejeje", button:"Contact us"};

  
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

    

    render() {
    return (
      <div>
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

