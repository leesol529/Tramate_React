import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

export default class StarRage extends React.Component {
    render() {
        return (
            <div>
                <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={this.props.rating}
                    onStarClick={this.props.onStarClick}
                />
            </div>
        );
    }
}