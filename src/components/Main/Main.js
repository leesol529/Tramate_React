import React from 'react';
import MainContent from './MainContent';
import asia from '../../img/asia.jpg';
import africa from '../../img/africa.jpg';
import antarctica from '../../img/antarctica.jpg';
import australia from '../../img/australia.jpg';
import europe from '../../img/europe.jpg';
import northamerica from '../../img/northamerica.jpg';
import southamerica from '../../img/southamerica.jpg';

export default class Main extends React.Component{
    render(){
        return(
            <div>
                <div className="super">
                    <h3> Tramate 대륙별로 둘러보기 </h3>
                    <MainContent src={asia} country="아시아" to="asia"/>
                    <MainContent src={europe} country="유럽" to="europe"/>
                    <MainContent src={northamerica} country="북아메리카" to="north_america"/>
                    <MainContent src={southamerica} country="남아메리카" to="south_america"/>
                    <MainContent src={africa} country="아프리카" to="africa"/>
                    <MainContent src={australia} country="호주" to="australia"/>
                    <MainContent src={antarctica} country="남극" to="antarctica"/>
                </div>
            </div>
        );
    }
}