const addAttraction = ({
    gnum = 0,
    name = "",
    img = "",
    content = ""
}={})=>({
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
    price="",
    content = ""
}={})=>({
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
    price="",
    content = ""
}={})=>({
    type: "ADD_RESTAURANT",
    restaurant: {
        gnum,
        type,
        img,
        price,
        content
    }
});

export {addAttraction, addActivity, addRestaurant};