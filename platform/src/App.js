import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux'

 import Home from './screens/logOut/Home';
 import About from './screens/logOut/About';
// import News from './screens/logedOutScreen/NewsScreen/NewsScreen.js';
 import Contact from './screens/logOut/Contact';
 import Sign from './screens/logOut/sign/Sign.js';
// // import PortfolioScreen from './screens/logedOutScreen/portfolioScreen/PortfolioScreen.js'
// // import ForumScreen from './screens/logInScreens/forum/ForumScreen.js';
 //import Dashboard from './screens/logIn/dashboard/DashboardScreen.js'
// import Kanban from './screens/logedInScreens/managementTools/kanbanScreen/KanbanScreen.js';
// import TablesScreen from './screens/logedInScreens/managementTools/kanbanScreen/TablesScreen';
 import Agenda from './screens/logIn/agendaScreen/AgendaScreen.js'
// // import Chat from './screens/logInScreens/dashboard/ChatScreen.js'
 import Header from './components/general/header/Header';
// import AdminPanelScreen from './screens/adminScreens/AdminPanelScreen';
// //import DetailsNewsScreen from './screens/logedOutScreen/NewsScreen/DetailNewsScreen';
 //import LateralMenu from './components/general/lateralMenu/LateralMenu'; 
// import MarketStudyScreen from './screens/logedInScreens/levelA/MarketStudyScreen'
// // import BusinessPlanScreen from './screens/logInScreens/dashboard/BusinessPlanScreen'
// import SocialContractScreen from './screens/logedInScreens/project/SocialContractScreen';
import ProfileScreen from './screens/logIn/userProfile/ProfileScreen';
// // import InConstruction from './screens/inConstruction/InConstruction';
// import DetailNewsScreen from './screens/logedOutScreen/NewsScreen/DetailNewsScreen';
// // import CompanyOverviewScreen from './screens/logInScreens/dashboard/CompanyOverviewScreen';
// // import BusinessModelScreen from './screens/logInScreens/dashboard/BusinessModelScreen';
// // import TeamScreen from './screens/logInScreens/dashboard/TeamScreen';
// import InterviewScreen from './screens/logedInScreens/levelA/InterviewScreen';
// // import TopicScreen from './screens/logInScreens/forum/TopicScreen';
// import InterviewDetailScreen from './screens/logedInScreens/levelA/InterviewDetailScreen';
// import InterviewAnsweringScreen from './screens/logedOutScreen/intervieAnswering/InterviewAnsweringScreen.js';
 import withAuth from './validation/Validation'

// // import TimeLineScreen from './screens/logInScreens/dashboard/TimeLineScreen';
// // import MarketingCanvasScreen from './screens/logInScreens/dashboard/MarketingCanvasScreen';
// import ProductScreen from './screens/logedInScreens/levelB/ProductScreen';
// // import FinanceScreen from './screens/logInScreens/dashboard/financeScreen/FinancialScreen';
// import ValuePropositionScreen from './screens/logedInScreens/levelA/ValuePropositionScreen';
// import SegmentScreen from './screens/logedInScreens/levelB/SegmentScreen';
// // import RessourceScreen from './screens/logInScreens/dashboard/RessourceScreen';
// import ProfitAndLossScreen from './screens/logedInScreens/levelB/ProfitAndLossScreen';
//  import Footer from './components/general/footer/Footer';
// import LeanCanvasScreen from './screens/logedInScreens/levelB/LeanCanvasScreen';
// import OKRScreen from './screens/logedInScreens/levelA/OKRScreen';
// // import ShopScreen from './screens/logInScreens/shop/ShopScreen';
// // import BrandScreen from './screens/logInScreens/dashboard/BrandScreen';
// // import TutorialScreen from './screens/logedOutScreen/tutorials/TutorialScreen';
// import ProjectProfileScreen from './screens/logedInScreens/project/ProjectProfileScreen';
// import ProjectInvite from './screens/logedInScreens/project/ProjectInvite';

class App extends React.Component {
 
  constructor(props) {
    super(props)
    this.state= {
      openMenu:false
    }
    this.openLateral = this.openLateral.bind(this)
  }

  openLateral() {
    let menu = this.state.openMenu
    this.setState({openMenu: !menu})
  }

  render() { 
    return ( 
       <BrowserRouter >
        <div className="App" style={{color:'#999999'}} >
          <Header openLateral={this.openLateral} />
          { /*this.state.openMenu ? <LateralMenu baseApi={this.props.baseApi} openLateral={this.openLateral} /> : null*/}
        
         

          <Route exact path='/' component={Home}/>
          <Route path='/About' component={About}/>
          <Route path='/Contact' component={Contact}/>
          <Route path='/Sign' component={Sign}/>


          <Route exact path='/UserProfile' component={withAuth(ProfileScreen)}/>
       
          {/* <Route exact path='/Kanban' component={withAuth(Kanban)}/>
          <Route exact path='/Kanban/:id' component={TablesScreen}/> */}
          <Route path='/Agenda' component={Agenda}/>
        

        </div>

        {/* 
        <meta charSet="utf-8" />

          <Route path='/Portfolio' component={PortfolioScreen}/>
          <Route path='/Forum' component={ForumScreen}/>
          <Route path='/Chat' component={withAuth(Chat)}/>
          <Route path='/Chat/:id' component={Chat}/>
          <Route exact path='/DetailsNewsScreen' component={DetailsNewsScreen}/>
          <Route exact path='/BusinessPlan' component={BusinessPlanScreen}/>
          <Route exact path='/InConstruction' component={InConstruction}/>
          <Route exact path='/CompanyOverviewScreen' component={CompanyOverviewScreen}/>
          <Route exact path='/TeamScreen' component={TeamScreen}/>
          <Route exact path='/BusinessModelCanvas' component={BusinessModelScreen}/>
          
          <Route exact path='/TopicScreen' component={TopicScreen}/>
          <Route exact path='/TimeLine' component={TimeLineScreen}/>
          <Route exact path='/MarketingCanvas' component={MarketingCanvasScreen}/>
         
          <Route exact path='/Finance' component={FinanceScreen}/>
          
          <Route exact path='/resource' component={RessourceScreen}/>
          
          <Route exact path='/shop' component={ShopScreen}/>
          <Route exact path='/brand' component={BrandScreen}/>
          <Route exact path='/Tutorials' component={TutorialScreen}/>






        </div>
        */}
       

      </BrowserRouter>

    )
  }
}


const mapStateToProps = (state) => {
  return{
  currentProject: state.currentProject,
      level:state.level,
      baseApi : state.baseApi
  }
}

export default connect(mapStateToProps)(App)
