const attractionReducerDefaultState = [];
const activityReducerDefaultState = [];
const restaurantRedecerDefaultState = [];

const attractionReducer = (state=attractionReducerDefaultState, action)=>{
    switch(action.type){
        case 'ADD_ATTRACTION':
            return [
                ...state,
                action.attraction
            ];
        default:
            return state;
    }
};

const activityReducer = (state=activityReducerDefaultState, action)=>{
    switch(action.type){
        case 'ADD_ACTIVITY':
            return[
                ...state,
                action.activity
            ];
        default:
            return state;
    };
}

const restaurantReducer = (state=restaurantRedecerDefaultState, action)=>{
    switch(action.type){
        case 'ADD_RESTAURANT':
            return [
                ...state,
                action.restaurant
            ];
        default:
            return state;
    }
}

export {attractionReducer, activityReducer, restaurantReducer};