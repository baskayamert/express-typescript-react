import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../constants/userConstants"
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from "../store"
import { User } from "../entities/user"
import Swal from "sweetalert2"

export const login = (username: string, password: string): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {
        try {
            dispatch({
                type: USER_LOGIN_REQUEST
            })

            //fetch data from backend
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password
                })

            })
            if (response.status === 201) {
                const data = await response.json();
                const user: User = data;
                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: user
                })
                localStorage.setItem('userInfo', JSON.stringify(user))
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Login Successful',
                    showConfirmButton: false,
                    timer: 1500
                  }).then(()=> {
                    window.location.href = '/'
                  })
                
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Login Failed',
                    showConfirmButton: false,
                    timer: 1500
                }).then(()=>{
                    dispatch({
                        type: USER_LOGIN_FAIL
                    })
                })
                
            }

            //pass this data to the reducer in the payload of the action
        } catch (error: any) {
            //USER LOGIN FAIL
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
    }
export const logout =
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
            Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: 'You have been logging out!',
                    showConfirmButton: false,
                    timer: 1500
                  }).then(()=> {
                    localStorage.removeItem('userInfo')
                    dispatch({ type: USER_LOGOUT })
                  })
            
        }