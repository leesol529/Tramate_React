import React from 'react';

export default class ScheduleDetailAtt extends React.Component{
    render(){
        return(
            <table className="tChoice_table" id="choiceFrm">
                <thead>
                    <tr>
                        <th>
                            Attraction{this.props.idx}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="tChoice_input tChoice_center">
                            <div className="thumbnail-wrapper">
                                <div className="thumbnail">
                                    <img src={`http://localhost:9000/image/${this.props.att.img}`} 
                                        className="tChoice_img" 
                                        alt="result_img"/>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="tChoice_input tChoice_center">
                            {this.props.att.name}
                        </td>
                    </tr>
                    <tr>
                        <td className="tChoice_input">
                            {this.props.att.content}
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}