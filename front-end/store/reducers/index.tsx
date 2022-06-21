import { combineReducers } from 'redux'
import productoReducer, { initialProductoState, IProductoState } from './productoReducer'
import usersReducer, { initialUsersState, IUsersState } from './usersReducer'

export interface IState {
  users: IUsersState
  producto: IProductoState
}

export const initialState: IState = {
  users: initialUsersState,
  producto: initialProductoState,
}

export default combineReducers({
  users: usersReducer,
  producto: productoReducer,
})
