import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import Main from '../components/Main/Main';
import Result from '../components/Result/Result';
import GuideProfile from '../components/GuideProfile/GuideProfile';
import Asia from '../components/Main/Asia';
import Africa from '../components/Main/Africa';
import Antarctica from '../components/Main/Antarctica';
import Australia from '../components/Main/Australia';
import Europe from '../components/Main/Europe';
import NorthAmerica from '../components/Main/NorthAmerica';
import SouthAmerica from '../components/Main/SouthAmerica';

const AppRouter = () => (
  <BrowserRouter>
    <div>
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

      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;