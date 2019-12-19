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
    type = "",
    price="",
    content = "",
    img = "",
    gnum = 0
}={})=>({
    type: "ADD_ACTIVITY",
    activity: {
        type,
        price,
        content,
        img,
        gnum
    }
});

const addRestaurant = ({
    type = "",
    price = "",
    content = "",
    img = "",
    gnum = 0
}={})=>({
    type: "ADD_RESTAURANT",
    restaurant: {
        type,
        price,
        content,
        img,
        gnum
    }
});

export {addAttraction, addActivity, addRestaurant};