import produce from 'immer'
import { OtonioinviernoAction, OtonioinviernoActionTypes } from '../actions/otonioinviernoActions'
import { ApiStatus, IOtonioinviernoItem } from '../models'

export const initialOtonioinviernoState: IOtonioinviernoState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  otonioinvierno: [],
  foundotonioinvierno: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function otonioinviernoReducer(state: IOtonioinviernoState = initialOtonioinviernoState, action: OtonioinviernoAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case OtonioinviernoActionTypes.SEARCH_OTONIOINVIERNO:
        draft.searchString = action.searchOptions.searchString
        break
      case OtonioinviernoActionTypes.SEARCHING_OTONIOINVIERNO:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case OtonioinviernoActionTypes.SEARCHING_OTONIOINVIERNO_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case OtonioinviernoActionTypes.FOUND_OTONIOINVIERNO:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep
          ? draft.foundotonioinvierno.push(...action.payload.otonioinvierno.docs)
          : (draft.foundotonioinvierno = action.payload.otonioinvierno.docs)
        draft.totalDocs = action.payload.otonioinvierno.totalDocs
        break

      case OtonioinviernoActionTypes.LOAD_OTONIOINVIERNO:
      case OtonioinviernoActionTypes.LOADING_OTONIOINVIERNO:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundotonioinvierno = []
        break

      case OtonioinviernoActionTypes.LOADING_OTONIOINVIERNO_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case OtonioinviernoActionTypes.LOADED_OTONIOINVIERNO:
        draft.loadingStatus = ApiStatus.LOADED
        draft.otonioinvierno = action.payload.otonioinvierno.docs
        draft.totalDocs = action.payload.otonioinvierno.totalDocs
        break

      case OtonioinviernoActionTypes.ADD_OTONIOINVIERNO:
      case OtonioinviernoActionTypes.ADDING_OTONIOINVIERNO:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case OtonioinviernoActionTypes.ADDING_OTONIOINVIERNO_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case OtonioinviernoActionTypes.ADDED_OTONIOINVIERNO:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.otonioinvierno.push(action.payload.otonioinvierno.docs[0])
        if (draft.searchString) draft.foundotonioinvierno.push(action.payload.otonioinvierno.docs[0])
        break

      case OtonioinviernoActionTypes.REMOVE_SINGLEUNTITLED:
        draft.otonioinvierno.splice(
          draft.otonioinvierno.findIndex((singleuntitled) => singleuntitled._id === action.payload._id),
          1
        )
        break

      case OtonioinviernoActionTypes.EDIT_OTONIOINVIERNO:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.otonioinvierno[draft.otonioinvierno.findIndex((singleuntitled) => singleuntitled._id === action.payload._id)] = action.payload
        break

      case OtonioinviernoActionTypes.EDITED_OTONIOINVIERNO:
        draft.addingStatus = ApiStatus.LOADED
        draft.otonioinvierno[draft.otonioinvierno.findIndex((singleuntitled) => singleuntitled._id === action.payload._id)] = action.payload
        draft.foundotonioinvierno[draft.foundotonioinvierno.findIndex((singleuntitled) => singleuntitled._id === action.payload._id)] = action.payload
        break
    }
  })
}

export interface IOtonioinviernoState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  otonioinvierno: IOtonioinviernoItem[]
  foundotonioinvierno: IOtonioinviernoItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
