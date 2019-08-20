const user_status = (state = false, action) => {
    if(action.type === 'SET_USER_STATUS'){
//debugger;

        state = action.payload;
        return state;
    }

    return state;
};

export {user_status}
