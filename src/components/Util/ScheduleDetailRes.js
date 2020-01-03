import React from 'react';

export default class ScheduleDetailRes extends React.Component{
    render(){
        return(
            <table className="tChoice_table" id="choiceFrm">
                <thead>
                    <tr>
                        <th>
                            Restaurant{this.props.idx}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="tChoice_input tChoice_center">
                            <div className="thumbnail-wrapper">
                                <div className="thumbnail">
                                    <img src={`http://localhost:9000/image/${this.props.res.img}`} 
                                    className="tChoice_img" 
                                    alt="result_img"/>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="tChoice_input">
                            <b style={{margin:'-5px'}}>Type</b> : {this.props.res.type} restaurant
                        </td>
                    </tr>
                    <tr>
                        <td className="tChoice_input">
                            <b style={{marginLeft:'-5px'}}>Price range</b>: {this.props.res.price}
                        </td>
                    </tr>
                    <tr>
                        <td className="tChoice_input">
                            {this.props.res.content}
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}