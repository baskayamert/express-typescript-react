import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'
import { userLoginReducer } from './reducers/userReducer';

const reducers = combineReducers({
  userLogin: userLoginReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')!)
  : undefined

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
} as {}

const middleware = [thunk]

const store = configureStore({
  reducer: reducers,
  preloadedState: initialState,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(...middleware),
  // devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>