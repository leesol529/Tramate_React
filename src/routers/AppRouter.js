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

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={Main} exact={true} />
        <Route path="/result" component={Result} />
        <Route path="/guide/profile" component={GuideProfile} />
        <Route path="/asia" component={Asia} />
        <Route path="/africa" component={Africa} />
        <Route path="/antarctica" component={Antarctica} />
        <Route path="/australia" component={Australia} />
        <Route path="/europe" component={Europe} />
        <Route path="/north_america" component={NorthAmerica} />
        <Route path="/south_america" component={SouthAmerica} />
        <Route path="/guide/join" component={JoinGuide} />
        <Route path="/traveler/join" component={JoinTraveler} />
        <Route path="/traveler/choice" component={TravelerChoice} />
        <Route path="/guide/choice" component={GuideChoice} />
        <Route path="/login" component={Login} />
        <Route path="/traveler/profile" component={TravelerProfile} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
