import React from 'react'
import { useSelector } from 'react-redux'
import { UserState } from '../reducers/userReducer'
import { RootState } from '../store'

const HomeScreen = () => {

  const userLogin = useSelector<RootState, UserState>(state => state.userLogin)

  return (
    <>
      {
        userLogin.userInfo ?
          (
            <>
              <h1>Welcome {userLogin.userInfo.username}</h1>
            </>
          ) :
          (
            <>
              <h1>Welcome to the Home Page!</h1>
            </>
          )
      }
    </>


  )
}

export default HomeScreen