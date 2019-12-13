import React from 'react';
import MainContent from './MainContent';
import asia from '../../img/asia.jpg';
import africa from '../../img/africa.jpg';
import antarctica from '../../img/antarctica.jpg';
import australia from '../../img/australia.jpg';
import europe from '../../img/europe.jpg';
import northamerica from '../../img/northamerica.jpg';
import southamerica from '../../img/southamerica.jpg';

import Header from '../Base/Header';

export default class Main extends React.Component{
    render(){
        return(
            <div>
                <Header />
                <hr className="divider"/>
                <div className="super">
                    <h3> Tramate 대륙별로 둘러보기 </h3>
                    <MainContent src={asia} country="아시아"/>
                    <MainContent src={europe} country="유럽"/>
                    <MainContent src={northamerica} country="북아메리카"/>
                    <MainContent src={southamerica} country="남아메리카"/>
                    <MainContent src={africa} country="아프리카"/>
                    <MainContent src={australia} country="호주"/>
                    <MainContent src={antarctica} country="남극"/>
                </div>

            </div>
        );
    }
}