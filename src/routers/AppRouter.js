import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from '../components/Main/Main';
import Result from '../components/Result/Result';
import Header from '../components/Base/Header';
import GuideProfile from '../components/Guide/GuideProfile';
import Asia from '../components/Main/Asia';
import Africa from '../components/Main/Africa';
import Antarctica from '../components/Main/Antarctica';
import Australia from '../components/Main/Australia';
import Europe from '../components/Main/Europe';
import NorthAmerica from '../components/Main/NorthAmerica';
import SouthAmerica from '../components/Main/SouthAmerica';
import JoinGuide from '../components/Guide/JoinGuide';
import JoinTraveler from '../components/Traveler/JoinTraveler';
import TravelerChoice from '../components/Traveler/TravelerChoice';
import GuideChoice from '../components/Guide/GuideChoice';
import Login from '../components/Base/Login';
import TravelerProfile from '../components/Traveler/Profile';
import Continent from '../components/Continent/Continent';
import GuideRate from '../components/Guide/GuideRate';
import TravelerRate from '../components/Traveler/TravelerRate';
import Chat from '../components/Util/Chat';
import Check from '../components/Util/Check';
import GuideSchedule from '../components/Guide/GuideSchedule';
import ScheduleDetail from '../components/Guide/ScheduleDetail';
import TravelerSchedule from '../components/Traveler/TravelerSchedule';
import TravelerScheduleDetail from '../components/Traveler/TravelerScheduleDetail';
//import ChatWraper from '../components/Util/ChatWrapper';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <hr className="divider" />
      <Switch>
        <Route path="/" component={Main} exact={true} />
        <Route path="/result/:spot" component={Result} />
        <Route path="/guide/profile/:gnum" component={GuideProfile} exact={true} />
        <Route path="/guide/profile/:gnum/:tnum" component={GuideProfile} />
        <Route path="/asia" component={Asia} />
        <Route path="/africa" component={Africa} />
        <Route path="/antarctica" component={Antarctica} />
        <Route path="/australia" component={Australia} />
        <Route path="/europe" component={Europe} />
        <Route path="/north_america" component={NorthAmerica} />
        <Route path="/south_america" component={SouthAmerica} />
        <Route path="/guide/join" component={JoinGuide} />
        <Route path="/traveler/join" component={JoinTraveler} />
        <Route path="/traveler/choice/:gnum/:tnum" exact={true} component={TravelerChoice} />
        <Route path="/guide/choice" component={GuideChoice} />
        <Route path="/login" component={Login} />
        <Route path="/traveler/profile/:tnum" component={TravelerProfile} exact={true} />
        <Route path="/traveler/profile/:gnum/:tnum" component={TravelerProfile} />
        <Route path="/continent/:continent" component={Continent} />
        <Route path="/guide/rate/:gnum/:tnum" component={GuideRate} />
        <Route path="/traveler/rate/:tnum/:gnum" component={TravelerRate} />
        <Route path="/chat/:gnum/:tnum" component={Chat} />
        <Route path="/check" component={Check} />
        {/* <Route path="/chatwrapper" component={ChatWraper} /> */}

        {/* 나중에 GuideProfile 컴포넌트에서 링크 주기  */}
        <Route path="/guide/schedule/:gnum" component={GuideSchedule} exact={true} />
        <Route path="/traveler/schedule/:tnum" component={TravelerSchedule} exact={true} />
        <Route path="/guide/schedule/detail/:gnum/:tnum" component={ScheduleDetail} />
        <Route path="/traveler/schedule/detail/:gnum/:tnum" component={TravelerScheduleDetail} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;