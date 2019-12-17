import React from 'react';
import minus from '../../img/minus.png';
import plus from '../../img/plus.png';
import AttractionForm from './AttractionForm';
import ActivityForm from './ActivityForm';
import RestaurantForm from './RestaurantForm';

export default class GuideChoice extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            attractionNum: 0,
            activityNum: 0,
            restaurantNum: 0
        }
    }

    render(){
        //state내의 num만큼 Form 출력되도록 for문 작성 후 아래 div에서 출력 
        const attraction = [];
        const activity = [];
        const restaurant = [];
        for(let i=0; i<this.state.attractionNum; i++){
            attraction.push(<AttractionForm key={i}/>)
        }
        for(let i=0; i<this.state.activityNum; i++){
            activity.push(<ActivityForm key={i}/>)
        }
        for(let i=0; i<this.state.restaurantNum; i++){
            restaurant.push(<RestaurantForm key={i}/>)
        }

        return(
            <div className="super">
                <table className="gchoice_table">
                    <thead>
                        <tr>
                            <th colSpan="2"> Add guide options </th>
                        </tr>
                        <tr>
                            <td colSpan="2"> <hr/> </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th> Attractions </th>
                            <td>
                                <div className="gchoice_flexbox">
                                    <img src={minus} alt="minus"
                                         onClick={()=>{
                                             if(this.state.attractionNum>0){
                                                this.setState({
                                                    attractionNum: this.state.attractionNum-1
                                                 });
                                             }
                                         }}/>
                                    &nbsp;&nbsp;&nbsp;
                                    {this.state.attractionNum}
                                    &nbsp;&nbsp;&nbsp;
                                    <img src={plus} alt="plus"
                                         onClick={()=>{
                                             this.setState({
                                                 attractionNum: this.state.attractionNum+1
                                             });
                                         }}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th> Activity </th>
                            <td>
                                <div className="gchoice_flexbox">
                                    <img src={minus} alt="minus"
                                         onClick={()=>{
                                            if(this.state.activityNum>0){
                                               this.setState({
                                                   activityNum: this.state.activityNum-1
                                                });
                                            }
                                        }}/>
                                    &nbsp;&nbsp;&nbsp;
                                    {this.state.activityNum}
                                    &nbsp;&nbsp;&nbsp;
                                    <img src={plus} alt="plus"
                                         onClick={()=>{
                                            this.setState({
                                                activityNum: this.state.activityNum+1
                                            });
                                        }}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th> Restaurant </th>
                            <td>
                                <div className="gchoice_flexbox">
                                    <img src={minus} alt="minus"
                                         onClick={()=>{
                                            if(this.state.restaurantNum>0){
                                               this.setState({
                                                   restaurantNum: this.state.restaurantNum-1
                                                });
                                            }
                                        }}/>
                                    &nbsp;&nbsp;&nbsp;
                                    {this.state.restaurantNum}
                                    &nbsp;&nbsp;&nbsp;
                                    <img src={plus} alt="plus"
                                         onClick={()=>{
                                            this.setState({
                                                restaurantNum: this.state.restaurantNum+1
                                            });
                                        }}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2"> <hr/> </td>
                        </tr>
                    </tbody>
                </table>
                {/* form 출력 위치 */}
                <div className="form_div">{attraction}</div>
                <div className="form_div">{activity}</div>
                <div className="form_div">{restaurant}</div>
            </div>
        );
    }
}