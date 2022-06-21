import produce from 'immer'
import { ProductoAction, ProductoActionTypes } from '../actions/productoActions'
import { ApiStatus, IProductoItem } from '../models'

export const initialProductoState: IProductoState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  producto: [],
  foundproducto: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function productoReducer(state: IProductoState = initialProductoState, action: ProductoAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case ProductoActionTypes.SEARCH_PRODUCTO:
        draft.searchString = action.searchOptions.searchString
        break
      case ProductoActionTypes.SEARCHING_PRODUCTO:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case ProductoActionTypes.SEARCHING_PRODUCTO_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case ProductoActionTypes.FOUND_PRODUCTO:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundproducto.push(...action.payload.producto.docs) : (draft.foundproducto = action.payload.producto.docs)
        draft.totalDocs = action.payload.producto.totalDocs
        break

      case ProductoActionTypes.LOAD_PRODUCTO:
      case ProductoActionTypes.LOADING_PRODUCTO:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundproducto = []
        break

      case ProductoActionTypes.LOADING_PRODUCTO_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case ProductoActionTypes.LOADED_PRODUCTO:
        draft.loadingStatus = ApiStatus.LOADED
        draft.producto = action.payload.producto.docs
        draft.totalDocs = action.payload.producto.totalDocs
        break

      case ProductoActionTypes.ADD_PRODUCTO:
      case ProductoActionTypes.ADDING_PRODUCTO:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case ProductoActionTypes.ADDING_PRODUCTO_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case ProductoActionTypes.ADDED_PRODUCTO:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.producto.push(action.payload.producto.docs[0])
        if (draft.searchString) draft.foundproducto.push(action.payload.producto.docs[0])
        break

      case ProductoActionTypes.REMOVE_SINGLEUNTITLED:
        draft.producto.splice(
          draft.producto.findIndex((singleuntitled) => singleuntitled._id === action.payload._id),
          1
        )
        break

      case ProductoActionTypes.EDIT_PRODUCTO:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.producto[draft.producto.findIndex((singleuntitled) => singleuntitled._id === action.payload._id)] = action.payload
        break

      case ProductoActionTypes.EDITED_PRODUCTO:
        draft.addingStatus = ApiStatus.LOADED
        draft.producto[draft.producto.findIndex((singleuntitled) => singleuntitled._id === action.payload._id)] = action.payload
        draft.foundproducto[draft.foundproducto.findIndex((singleuntitled) => singleuntitled._id === action.payload._id)] = action.payload
        break
    }
  })
}

export interface IProductoState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  producto: IProductoItem[]
  foundproducto: IProductoItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
