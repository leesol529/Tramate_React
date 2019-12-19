import {createStore, combineReducers} from 'redux';
import {attractionReducer, activityReducer, restaurantReducer} from '../reducers/reducers';

const store = createStore(
    combineReducers({
    attractions: attractionReducer,
    activities: activityReducer,
    restaurants: restaurantReducer
}));

export default store;

