const attractionReducerDefaultState = [];
const activityReducerDefaultState = [];
const restaurantRedecerDefaultState = [];
const r_attractionReducerDefaultState = [];
const r_activityReducerDefaultState = [];
const r_restaurantReducerDefaultState = [];
const r_guideReducerDefaultState = [];
const calendarReducerDefaultState = {};
const scheduleReducerDefaultState = [];
const chatReducerDefaltState = [];


const attractionReducer = (state = attractionReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_ATTRACTION':
            return [
                ...state,
                action.attraction
            ];
        case 'DEL_ATTRACTION':
            return state.filter(({ gnum, name }) => !(gnum === action.attraction.gnum && name === action.attraction.name));
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
        case 'DEL_ACTIVITY':
                return state.filter(({ gnum, content }) => !(gnum === action.activity.gnum && content === action.activity.content));
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
        case 'DEL_RESTAURANT':
            return state.filter(({ gnum, content }) => !(gnum === action.restaurant.gnum && content === action.restaurant.content));
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

const calendarReducer = (state = calendarReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_CALENDAR':
            return action.calendar;
        case 'DEL_CALENDAR':
            return state = calendarReducerDefaultState;
        default:
            return state;
    }
}

const scheduleReducer = (state = scheduleReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_SCHEDULE':
            return [
                ...state,
                action.schedule
            ];
        case 'DEL_SCHEDULE':
            return state.filter(({ pks, type }) => !(pks === action.schedule.pks && type === action.schedule.type));
        default:
            return state;
    }
}

const chatReducer = (state = chatReducerDefaltState, action) => {
    switch (action.type) {
        case 'SET_CHAT':
            return action.chat;
        default:
            return state;
    }
}

export { attractionReducer, activityReducer, restaurantReducer, r_attractionReducer, r_activityReducer, r_restaurantReducer, r_guideReducer, calendarReducer, scheduleReducer, chatReducer };