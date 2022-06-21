import produce from 'immer'
import { PrimaqveraveranoAction, PrimaqveraveranoActionTypes } from '../actions/primaqveraveranoActions'
import { ApiStatus, IPrimaqveraveranoItem } from '../models'

export const initialPrimaqveraveranoState: IPrimaqveraveranoState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  primaqveraverano: [],
  foundprimaqveraverano: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function primaqveraveranoReducer(state: IPrimaqveraveranoState = initialPrimaqveraveranoState, action: PrimaqveraveranoAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case PrimaqveraveranoActionTypes.SEARCH_PRIMAQVERAVERANO:
        draft.searchString = action.searchOptions.searchString
        break
      case PrimaqveraveranoActionTypes.SEARCHING_PRIMAQVERAVERANO:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case PrimaqveraveranoActionTypes.SEARCHING_PRIMAQVERAVERANO_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case PrimaqveraveranoActionTypes.FOUND_PRIMAQVERAVERANO:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep
          ? draft.foundprimaqveraverano.push(...action.payload.primaqveraverano.docs)
          : (draft.foundprimaqveraverano = action.payload.primaqveraverano.docs)
        draft.totalDocs = action.payload.primaqveraverano.totalDocs
        break

      case PrimaqveraveranoActionTypes.LOAD_PRIMAQVERAVERANO:
      case PrimaqveraveranoActionTypes.LOADING_PRIMAQVERAVERANO:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundprimaqveraverano = []
        break

      case PrimaqveraveranoActionTypes.LOADING_PRIMAQVERAVERANO_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case PrimaqveraveranoActionTypes.LOADED_PRIMAQVERAVERANO:
        draft.loadingStatus = ApiStatus.LOADED
        draft.primaqveraverano = action.payload.primaqveraverano.docs
        draft.totalDocs = action.payload.primaqveraverano.totalDocs
        break

      case PrimaqveraveranoActionTypes.ADD_PRIMAQVERAVERANO:
      case PrimaqveraveranoActionTypes.ADDING_PRIMAQVERAVERANO:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case PrimaqveraveranoActionTypes.ADDING_PRIMAQVERAVERANO_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case PrimaqveraveranoActionTypes.ADDED_PRIMAQVERAVERANO:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.primaqveraverano.push(action.payload.primaqveraverano.docs[0])
        if (draft.searchString) draft.foundprimaqveraverano.push(action.payload.primaqveraverano.docs[0])
        break

      case PrimaqveraveranoActionTypes.REMOVE_SINGLEUNTITLED:
        draft.primaqveraverano.splice(
          draft.primaqveraverano.findIndex((singleuntitled) => singleuntitled._id === action.payload._id),
          1
        )
        break

      case PrimaqveraveranoActionTypes.EDIT_PRIMAQVERAVERANO:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.primaqveraverano[draft.primaqveraverano.findIndex((singleuntitled) => singleuntitled._id === action.payload._id)] = action.payload
        break

      case PrimaqveraveranoActionTypes.EDITED_PRIMAQVERAVERANO:
        draft.addingStatus = ApiStatus.LOADED
        draft.primaqveraverano[draft.primaqveraverano.findIndex((singleuntitled) => singleuntitled._id === action.payload._id)] = action.payload
        draft.foundprimaqveraverano[draft.foundprimaqveraverano.findIndex((singleuntitled) => singleuntitled._id === action.payload._id)] =
          action.payload
        break
    }
  })
}

export interface IPrimaqveraveranoState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  primaqveraverano: IPrimaqveraveranoItem[]
  foundprimaqveraverano: IPrimaqveraveranoItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
