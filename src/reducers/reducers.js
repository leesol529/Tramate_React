const attractionReducerDefaultState = [];
const activityReducerDefaultState = [];
const restaurantRedecerDefaultState = [];
const r_attractionReducerDefaultState = [];
const r_activityReducerDefaultState = [];
const r_restaurantReducerDefaultState = [];
const r_guideReducerDefaultState = [];

const attractionReducer = (state = attractionReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_ATTRACTION':
            return [
                ...state,
                action.attraction
            ];
        default:
            return state;
    }
};

const activityReducer = (state = activityReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_ACTIVITY':
            return [
                ...state,
                action.activity
            ];
        default:
            return state;
    };
}

const restaurantReducer = (state = restaurantRedecerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_RESTAURANT':
            return [
                ...state,
                action.restaurant
            ];
        default:
            return state;
    }
}

const r_attractionReducer = (state = r_attractionReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_R_ATTRACTION':
            return [
                ...state,
                action.attraction
            ];
        default:
            return state;
    }
}

const r_activityReducer = (state = r_activityReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_R_ACTIVITY':
            return [
                ...state,
                action.activity
            ]
        default:
            return state;
    }
}

const r_restaurantReducer = (state = r_restaurantReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_R_RESTAURANT':
            return [
                ...state,
                action.restaurant
            ]
        default:
            return state;
    }
}

const r_guideReducer = (state = r_guideReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_R_GUIDE':
            return [
                ...state,
                action.guide
            ]
        default:
            return state;
    }
}

export { attractionReducer, activityReducer, restaurantReducer, r_attractionReducer, r_activityReducer, r_restaurantReducer, r_guideReducer };