import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  addedPrimaqveraverano,
  addingPrimaqveraverano,
  addingPrimaqveraveranoFailed,
  editedPrimaqveraverano,
  editingPrimaqveraverano,
  editingPrimaqveraveranoFailed,
  foundPrimaqveraverano,
  loadedPrimaqveraverano,
  loadingPrimaqveraverano,
  loadingPrimaqveraveranoFailed,
  PrimaqveraveranoAction,
  PrimaqveraveranoActionTypes,
  removedSingleuntitled,
  removingSingleuntitled,
  removingSingleuntitledFailed,
  searchingPrimaqveraverano,
  searchingPrimaqveraveranoFailed,
} from '../actions/primaqveraveranoActions'
import { IState } from '../reducers'
import { buildFormData } from './index'

const searchPrimaqveraveranoEpic: Epic<PrimaqveraveranoAction, PrimaqveraveranoAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(PrimaqveraveranoActionTypes.SEARCH_PRIMAQVERAVERANO)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `http://127.0.0.1:4567/api/primaqveraverano/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundPrimaqveraverano(response.data, action.keep)),
        startWith(searchingPrimaqveraverano()),
        catchError(() => of(searchingPrimaqveraveranoFailed()))
      )
    })
  )

const loadPrimaqveraveranoEpic: Epic<PrimaqveraveranoAction, PrimaqveraveranoAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(PrimaqveraveranoActionTypes.LOAD_PRIMAQVERAVERANO)),
    switchMap((action) => {
      let url = `http://127.0.0.1:4567/api/primaqveraverano/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedPrimaqveraverano(response.data)),
        startWith(loadingPrimaqveraverano()),
        catchError(() => of(loadingPrimaqveraveranoFailed()))
      )
    })
  )
}

const addPrimaqveraveranoEpic: Epic<PrimaqveraveranoAction, PrimaqveraveranoAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(PrimaqveraveranoActionTypes.ADD_PRIMAQVERAVERANO)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`http://127.0.0.1:4567/api/primaqveraverano/`, data, config)).pipe(
        map((response) => addedPrimaqveraverano(response.data)),
        startWith(addingPrimaqveraverano()),
        catchError((err) => of(addingPrimaqveraveranoFailed(err.response)))
      )
    })
  )

const removePrimaqveraveranoEpic: Epic<PrimaqveraveranoAction, PrimaqveraveranoAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(PrimaqveraveranoActionTypes.REMOVE_SINGLEUNTITLED)),
    mergeMap((action) =>
      from(axios.delete(`http://127.0.0.1:4567/api/primaqveraverano/${action.payload._id}`)).pipe(
        map((response) => removedSingleuntitled()),
        startWith(removingSingleuntitled()),
        catchError(() => of(removingSingleuntitledFailed()))
      )
    )
  )

const editPrimaqveraveranoEpic: Epic<PrimaqveraveranoAction, PrimaqveraveranoAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(PrimaqveraveranoActionTypes.EDIT_PRIMAQVERAVERANO)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`http://127.0.0.1:4567/api/primaqveraverano/${action.payload._id}`, data, config)).pipe(
        map((response) => editedPrimaqveraverano(response.data)),
        startWith(editingPrimaqveraverano()),
        catchError(() => of(editingPrimaqveraveranoFailed()))
      )
    })
  )

export default combineEpics(
  searchPrimaqveraveranoEpic,
  loadPrimaqveraveranoEpic,
  addPrimaqveraveranoEpic,
  removePrimaqveraveranoEpic,
  editPrimaqveraveranoEpic
)
