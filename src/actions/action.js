const addAttraction = ({
    gnum = 0,
    name = "",
    img = "",
    content = ""
} = {}) => ({
    type: "ADD_ATTRACTION",
    attraction: {
        gnum,
        name,
        img,
        content
    }
});

const addActivity = ({
    gnum = 0,
    type = "",
    img = "",
    price = "",
    content = ""
} = {}) => ({
    type: "ADD_ACTIVITY",
    activity: {
        gnum,
        type,
        img,
        price,
        content
    }
});

const addRestaurant = ({
    gnum = 0,
    type = "",
    img = "",
    price = "",
    content = ""
} = {}) => ({
    type: "ADD_RESTAURANT",
    restaurant: {
        gnum,
        type,
        img,
        price,
        content
    }
});

const r_addAttraction = ({
    gnum = 0,
    name = "",
    img = "",
    content = ""
} = {}) => ({
    type: "ADD_R_ATTRACTION",
    attraction: {
        gnum,
        name,
        img,
        content
    }
});

const r_addActivity = ({
    gnum = 0,
    type = "",
    img = "",
    price = "",
    content = ""
} = {}) => ({
    type: "ADD_R_ACTIVITY",
    activity: {
        gnum,
        type,
        img,
        price,
        content
    }
});

const r_addRestaurant = ({
    gnum = 0,
    type = "",
    img = "",
    price = "",
    content = ""
} = {}) => ({
    type: "ADD_R_RESTAURANT",
    restaurant: {
        gnum,
        type,
        img,
        price,
        content
    }
});

const r_addGuide = ({
    num = 0,
    name = '',
    nat = '',
    spot = '',
    mobile = '',
    addr = '',
    content = '',
    img = '',
    fare = 0,
    id = '',
    pass = '',
    email = '',
    continent = ''
} = {}) => ({
    type: "ADD_R_GUIDE",
    guide: {
        num,
        name,
        nat,
        spot,
        mobile,
        addr,
        content,
        img,
        fare,
        id,
        pass,
        email,
        continent
    }
})

const addTraveler = ({
    num = 0,
    name = '',
    nat = '',
    mobile = '',
    addr = '',
    content = '',
    img = '',
    id = '',
    pass = '',
    email = ''
} = {}) => ({
    type: 'ADD_TRAVELER',
    traveler: {
        num,
        name,
        nat,
        mobile,
        addr,
        content,
        img,
        id,
        pass,
        email
    }
})

export { addAttraction, addActivity, addRestaurant, r_addAttraction, r_addActivity, r_addRestaurant, r_addGuide, addTraveler };