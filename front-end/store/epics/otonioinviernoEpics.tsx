import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  addedOtonioinvierno,
  addingOtonioinvierno,
  addingOtonioinviernoFailed,
  editedOtonioinvierno,
  editingOtonioinvierno,
  editingOtonioinviernoFailed,
  foundOtonioinvierno,
  loadedOtonioinvierno,
  loadingOtonioinvierno,
  loadingOtonioinviernoFailed,
  OtonioinviernoAction,
  OtonioinviernoActionTypes,
  removedSingleuntitled,
  removingSingleuntitled,
  removingSingleuntitledFailed,
  searchingOtonioinvierno,
  searchingOtonioinviernoFailed,
} from '../actions/otonioinviernoActions'
import { IState } from '../reducers'
import { buildFormData } from './index'

const searchOtonioinviernoEpic: Epic<OtonioinviernoAction, OtonioinviernoAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(OtonioinviernoActionTypes.SEARCH_OTONIOINVIERNO)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `http://127.0.0.1:4567/api/otonioinvierno/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundOtonioinvierno(response.data, action.keep)),
        startWith(searchingOtonioinvierno()),
        catchError(() => of(searchingOtonioinviernoFailed()))
      )
    })
  )

const loadOtonioinviernoEpic: Epic<OtonioinviernoAction, OtonioinviernoAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(OtonioinviernoActionTypes.LOAD_OTONIOINVIERNO)),
    switchMap((action) => {
      let url = `http://127.0.0.1:4567/api/otonioinvierno/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedOtonioinvierno(response.data)),
        startWith(loadingOtonioinvierno()),
        catchError(() => of(loadingOtonioinviernoFailed()))
      )
    })
  )
}

const addOtonioinviernoEpic: Epic<OtonioinviernoAction, OtonioinviernoAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(OtonioinviernoActionTypes.ADD_OTONIOINVIERNO)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`http://127.0.0.1:4567/api/otonioinvierno/`, data, config)).pipe(
        map((response) => addedOtonioinvierno(response.data)),
        startWith(addingOtonioinvierno()),
        catchError((err) => of(addingOtonioinviernoFailed(err.response)))
      )
    })
  )

const removeOtonioinviernoEpic: Epic<OtonioinviernoAction, OtonioinviernoAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(OtonioinviernoActionTypes.REMOVE_SINGLEUNTITLED)),
    mergeMap((action) =>
      from(axios.delete(`http://127.0.0.1:4567/api/otonioinvierno/${action.payload._id}`)).pipe(
        map((response) => removedSingleuntitled()),
        startWith(removingSingleuntitled()),
        catchError(() => of(removingSingleuntitledFailed()))
      )
    )
  )

const editOtonioinviernoEpic: Epic<OtonioinviernoAction, OtonioinviernoAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(OtonioinviernoActionTypes.EDIT_OTONIOINVIERNO)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`http://127.0.0.1:4567/api/otonioinvierno/${action.payload._id}`, data, config)).pipe(
        map((response) => editedOtonioinvierno(response.data)),
        startWith(editingOtonioinvierno()),
        catchError(() => of(editingOtonioinviernoFailed()))
      )
    })
  )

export default combineEpics(searchOtonioinviernoEpic, loadOtonioinviernoEpic, addOtonioinviernoEpic, removeOtonioinviernoEpic, editOtonioinviernoEpic)
