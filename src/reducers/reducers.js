const user_status = (state = false, action) => {
    if(action.type === 'SET_USER_STATUS'){
        state = action.payload;
        return state;
    }

    return state;
};

export {user_status}

const showInfo = (state = false, action) => {
    if(action.type === 'SHOW_HOW_IT_WORKS'){
        state = action.payload;
        return state;
    }

    return state;
};

export {showInfo}
