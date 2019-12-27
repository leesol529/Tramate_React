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
});

const addCalendar = ({
    gnum = 0,
    tnum = 0,
    startdate = "",
    enddate = "",
    accept = ""
}={}) =>({
    type: "ADD_CALENDAR",
    calendar: {
        gnum,
        tnum,
        startdate,
        enddate,
        accept
    }
})

const delCalendar = ({
    gnum = 0,
    tnum = 0,
    startdate = "",
    enddate = "",
    accept = ""
}={}) =>({
    type: "DEL_CALENDAR",
    calendar: {
        gnum,
        tnum,
        startdate,
        enddate,
        accept
    }
})

const addSchedule = ({
    gnum=0,
    tnum=0,
    pks = 0,
    type = 0
}={})=>({
    type: "ADD_SCHEDULE",
    schedule: {
        gnum,
        tnum,
        pks,
        type
    }
})

const delSchedule = ({
    gnum=0,
    tnum=0,
    pks = 0,
    type = 0
} = {}) =>({
    type: "DEL_SCHEDULE",
    schedule: {
        gnum,
        tnum,
        pks,
        type
    }
})

export { addAttraction, addActivity, addRestaurant, r_addAttraction, r_addActivity, r_addRestaurant, r_addGuide, addCalendar, delCalendar, addSchedule, delSchedule };