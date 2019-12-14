import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from '../components/Main/Main';
import Result from '../components/Result/Result';
import Header from '../components/Base/Header';
import GuideProfile from '../components/GuideProfile/GuideProfile';
import GuideInput from '../components/GuideInput/GuideInput';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={Main} exact={true} />
        <Route path="/result" component={Result} />
        <Route path="/guide/profile" component={GuideProfile} />
        <Route path="/guide/input" component={GuideInput} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;