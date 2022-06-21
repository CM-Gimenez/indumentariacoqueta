import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  addedProducto,
  addingProducto,
  addingProductoFailed,
  editedProducto,
  editingProducto,
  editingProductoFailed,
  foundProducto,
  loadedProducto,
  loadingProducto,
  loadingProductoFailed,
  ProductoAction,
  ProductoActionTypes,
  removedSingleuntitled,
  removingSingleuntitled,
  removingSingleuntitledFailed,
  searchingProducto,
  searchingProductoFailed,
} from '../actions/productoActions'
import { IState } from '../reducers'
import { buildFormData } from './index'

const searchProductoEpic: Epic<ProductoAction, ProductoAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ProductoActionTypes.SEARCH_PRODUCTO)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `http://127.0.0.1:4567/api/producto/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundProducto(response.data, action.keep)),
        startWith(searchingProducto()),
        catchError(() => of(searchingProductoFailed()))
      )
    })
  )

const loadProductoEpic: Epic<ProductoAction, ProductoAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(ProductoActionTypes.LOAD_PRODUCTO)),
    switchMap((action) => {
      let url = `http://127.0.0.1:4567/api/producto/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedProducto(response.data)),
        startWith(loadingProducto()),
        catchError(() => of(loadingProductoFailed()))
      )
    })
  )
}

const addProductoEpic: Epic<ProductoAction, ProductoAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ProductoActionTypes.ADD_PRODUCTO)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`http://127.0.0.1:4567/api/producto/`, data, config)).pipe(
        map((response) => addedProducto(response.data)),
        startWith(addingProducto()),
        catchError((err) => of(addingProductoFailed(err.response)))
      )
    })
  )

const removeProductoEpic: Epic<ProductoAction, ProductoAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ProductoActionTypes.REMOVE_SINGLEUNTITLED)),
    mergeMap((action) =>
      from(axios.delete(`http://127.0.0.1:4567/api/producto/${action.payload._id}`)).pipe(
        map((response) => removedSingleuntitled()),
        startWith(removingSingleuntitled()),
        catchError(() => of(removingSingleuntitledFailed()))
      )
    )
  )

const editProductoEpic: Epic<ProductoAction, ProductoAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ProductoActionTypes.EDIT_PRODUCTO)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`http://127.0.0.1:4567/api/producto/${action.payload._id}`, data, config)).pipe(
        map((response) => editedProducto(response.data)),
        startWith(editingProducto()),
        catchError(() => of(editingProductoFailed()))
      )
    })
  )

export default combineEpics(searchProductoEpic, loadProductoEpic, addProductoEpic, removeProductoEpic, editProductoEpic)
