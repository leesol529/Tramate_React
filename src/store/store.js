import { createStore, combineReducers } from 'redux';
import { attractionReducer, activityReducer, restaurantReducer, r_attractionReducer, r_activityReducer, r_restaurantReducer } from '../reducers/reducers';

const store = createStore(
    combineReducers({
        attractions: attractionReducer,
        activities: activityReducer,
        restaurants: restaurantReducer,
        r_attractions: r_attractionReducer,
        r_activities: r_activityReducer,
        r_restaurants: r_restaurantReducer
    }));

export default store;

