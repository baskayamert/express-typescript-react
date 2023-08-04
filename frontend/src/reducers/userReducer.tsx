import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../constants/userConstants";
import { Role, User } from "../entities/user";

export interface UserState {
    loading?: boolean,
    error?: string,
    userInfo: User
}

interface Action {
    type: string,
    payload?: string
}

export const userLoginReducer = (state:UserState={userInfo:{id:'',password:'',role:Role.EMPLOYEE,token:'',username:''}}, action:Action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true}
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload}
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload}
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}