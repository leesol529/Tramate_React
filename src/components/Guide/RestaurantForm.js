import React from 'react'; 
import ImageUpload from '../Util/ImageUpload';

export default class RestaurantForm extends React.Component{
    render(){
        return(
            <table className="gchoice_form_table" id="choiceFrm">
                <thead>
                    <tr>
                        <th>Restaurant Form</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <ImageUpload />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <select name="type" defaultValue="" className="gchoice_input">
                                <option value="" disabled>Type of a restaurant </option>
                                <option value="korean"> Korean </option>
                                <option value="chinese"> Chinese </option>
                                <option value="japanese"> Japanese </option>
                                <option value="indian"> Indian </option>
                                <option value="thai"> Thai </option>
                                <option value="italian"> Italian </option>
                                <option value="mexican"> Mexican </option>
                                <option value="french"> French </option>
                                <option value="vietnamese"> Vietnamese </option>
                                <option value="greek"> Greek </option>
                                <option value="german"> German </option>
                                <option value="american"> American </option>
                                <option value="etc"> Etc </option>
                                <option value="-" disabled> *** alergy info *** </option>
                                <option value="seafood"> Sea food </option>
                                <option value="glutenFree"> Gluten free </option>
                                <option value="vegitarian"> Vegitarian </option>
                                <option value="vegan"> Vegan </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <textarea name="content" placeholder="Please describe the restaurant"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}