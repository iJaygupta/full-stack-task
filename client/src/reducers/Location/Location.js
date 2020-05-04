const location = (state = {}, action) => {

    switch (action.type) {
        case 'init':
            return { email: '', password: '', error: false, msg: '', signupError: false, isManualLogout: false, signupMsg: '', isAuthenticated: false, userInfo: {}, isAuthSuccess: false }

        case 'getLocationList':
            return { ...state, error: action.error, msg: action.msg, location: action.data }
       
        default:
            return state

    }

}

export default location;