import React from 'react';
import LookAround from './LookAround';
import Host from './Host';
import Room from './Room';
import Spot from './Spot';
import Restaurant from './Restaurant';
import Africa from '../../img/africa.jpg';
import host1 from '../../img/host1.jpg';
import host2 from '../../img/host2.jpg';
import host3 from '../../img/host3.jpg';
import host4 from '../../img/host4.jpg';
import host5 from '../../img/host5.jpg';
import host6 from '../../img/host6.jpg';
import room1 from '../../img/room1.jpg';
import room2 from '../../img/room2.jpg';
import room3 from '../../img/room3.jpg';
// import room4 from '../../img/room4.jpg';


const room4 = require('../../img/room4.jpg');

export default class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lookAroundTitle: ['호스트', '숙소', '엑티비티', '스팟'],
            hostInfo: [
                { title: 'Nicole', subtitle: 'NewYork', img: host1 },
                { title: 'James', subtitle: 'London', img: host2 },
                { title: 'Jack', subtitle: 'Pari', img: host3 },
                { title: 'Paul', subtitle: 'Proto', img: host4 },
                { title: 'Sera', subtitle: 'Santorini', img: host5 },
                { title: 'Nee', subtitle: 'Danang', img: host6 },
            ],
            roomInfo: [
                { title: 'Nicole', subtitle: 'NewYork', img: room1 },
                { title: 'James', subtitle: 'London', img: room2 },
                { title: 'Jack', subtitle: 'Pari', img: room3 },
                { title: 'Paul', subtitle: 'Proto', img: room4 },
            ]
        }
    }
    render() {
        return (
            <div className="container">
                <hr />
                <h4> 다낭 둘러보기</h4>
                <div className="lookaround_flexbox">
                    {this.state.lookAroundTitle.map((title) => {
                        return <LookAround img={Africa} title={title} key={title} />
                    })}
                </div>
                <h4>인기 호스트</h4>
                <p className="font-small">인기있는 호스트를 소개 받아보세요.</p>
                <div className="lookaround_flexbox">
                    {this.state.hostInfo.map((info) => {
                        return <Host title={info.title} subtitle={info.subtitle} img={info.img} key={info.title} />
                    })}
                </div>
                <h4>인기 숙소</h4>
                <p className="font-small">인기있는 숙소를 소개 받아보세요.</p>
                <div className="lookaround_flexbox">
                    {this.state.roomInfo.map((info) => {
                        return <Room title={info.title} subtitle={info.subtitle} img={info.img} key={info.title} />
                    })}
                </div>
                <h4>인기 관광명소</h4>
                <p className="font-small">인기있는 관광명소를 소개 받아보세요.</p>
                <div className="lookaround_flexbox">
                    <Spot />
                    <Spot />
                    <Spot />
                    <Spot />
                </div>
                <div className="lookaround_flexbox">
                    <Spot />
                    <Spot />
                    <Spot />
                    <Spot />
                </div>
                <h4>인기 레스토랑</h4>
                <p className="font-small">인기있는 레스토랑을 소개 받아보세요.</p>
                <div className="lookaround_flexbox">
                    <Restaurant />
                    <Restaurant />
                    <Restaurant />
                    <Restaurant />
                </div>
                <div className="lookaround_flexbox">
                    <Restaurant />
                    <Restaurant />
                    <Restaurant />
                    <Restaurant />
                </div>


            </div >
        );
    }
}