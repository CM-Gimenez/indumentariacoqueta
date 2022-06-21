import { IOtonioinviernoItem, IpaginatedOtonioinvierno } from '../models'

export enum OtonioinviernoActionTypes {
  SEARCH_OTONIOINVIERNO = 'otonioinvierno/search',
  SEARCHING_OTONIOINVIERNO = 'otonioinvierno/searching',
  FOUND_OTONIOINVIERNO = 'otonioinvierno/found',
  SEARCHING_OTONIOINVIERNO_FAILED = 'otonioinvierno/searching_failed',

  LOAD_OTONIOINVIERNO = 'otonioinvierno/load',
  LOADING_OTONIOINVIERNO = 'otonioinvierno/loading',
  LOADED_OTONIOINVIERNO = 'otonioinvierno/loaded',
  LOADING_OTONIOINVIERNO_FAILED = 'otonioinvierno/loading_failed',

  ADD_OTONIOINVIERNO = 'otonioinvierno/add',
  ADDING_OTONIOINVIERNO = 'otonioinvierno/adding',
  ADDED_OTONIOINVIERNO = 'otonioinvierno/added',
  ADDING_OTONIOINVIERNO_FAILED = 'otonioinvierno/adding_failed',

  REMOVE_SINGLEUNTITLED = 'otonioinvierno/remove',
  REMOVING_SINGLEUNTITLED = 'otonioinvierno/removing',
  REMOVED_SINGLEUNTITLED = 'otonioinvierno/removed',
  REMOVING_SINGLEUNTITLED_FAILED = 'otonioinvierno/removing_failed',

  EDIT_OTONIOINVIERNO = 'otonioinvierno/edit',
  EDITING_OTONIOINVIERNO = 'otonioinvierno/editing',
  EDITED_OTONIOINVIERNO = 'otonioinvierno/edited',
  EDITING_OTONIOINVIERNO_FAILED = 'otonioinvierno/editing_failed',
}

export function searchOtonioinvierno(searchOptions: TSearchOptions | string, keep?: boolean): ISearchOtonioinviernoAction {
  return {
    type: OtonioinviernoActionTypes.SEARCH_OTONIOINVIERNO,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingOtonioinvierno(): ISearchingOtonioinviernoAction {
  return {
    type: OtonioinviernoActionTypes.SEARCHING_OTONIOINVIERNO,
  }
}

export function foundOtonioinvierno(otonioinvierno: IpaginatedOtonioinvierno, keep?: boolean): IFoundOtonioinviernoAction {
  return {
    type: OtonioinviernoActionTypes.FOUND_OTONIOINVIERNO,
    keep: keep,
    payload: {
      otonioinvierno,
    },
  }
}

export function searchingOtonioinviernoFailed(): ISearchingOtonioinviernoFailedAction {
  return {
    type: OtonioinviernoActionTypes.SEARCHING_OTONIOINVIERNO_FAILED,
  }
}

export function loadOtonioinvierno(loadOptions: TSearchOptions): ILoadOtonioinviernoAction {
  return {
    type: OtonioinviernoActionTypes.LOAD_OTONIOINVIERNO,
    loadOptions: loadOptions,
  }
}

export function loadingOtonioinvierno(): ILoadingOtonioinviernoAction {
  return {
    type: OtonioinviernoActionTypes.LOADING_OTONIOINVIERNO,
  }
}

export function loadedOtonioinvierno(otonioinvierno: IpaginatedOtonioinvierno): ILoadedOtonioinviernoAction {
  return {
    type: OtonioinviernoActionTypes.LOADED_OTONIOINVIERNO,
    payload: {
      otonioinvierno,
    },
  }
}

export function loadingOtonioinviernoFailed(): ILoadingOtonioinviernoFailedAction {
  return {
    type: OtonioinviernoActionTypes.LOADING_OTONIOINVIERNO_FAILED,
  }
}

export function addOtonioinvierno(singleuntitled: IOtonioinviernoItem): IAddOtonioinviernoAction {
  return {
    type: OtonioinviernoActionTypes.ADD_OTONIOINVIERNO,
    payload: singleuntitled,
  }
}

export function addingOtonioinvierno(): IAddingOtonioinviernoAction {
  return {
    type: OtonioinviernoActionTypes.ADDING_OTONIOINVIERNO,
  }
}

export function addedOtonioinvierno(otonioinvierno: IpaginatedOtonioinvierno): IAddedOtonioinviernoAction {
  return {
    type: OtonioinviernoActionTypes.ADDED_OTONIOINVIERNO,
    payload: {
      otonioinvierno,
    },
  }
}

export function addingOtonioinviernoFailed(errData: {
  data: { message: string; field?: string }
  status: number
}): IAddingOtonioinviernoFailedAction {
  return {
    type: OtonioinviernoActionTypes.ADDING_OTONIOINVIERNO_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeSingleuntitled(singleuntitled: IOtonioinviernoItem): IRemoveSingleuntitledAction {
  return {
    type: OtonioinviernoActionTypes.REMOVE_SINGLEUNTITLED,
    payload: singleuntitled,
  }
}

export function removingSingleuntitled(): IRemovingSingleuntitledAction {
  return {
    type: OtonioinviernoActionTypes.REMOVING_SINGLEUNTITLED,
  }
}

export function removedSingleuntitled(): IRemovedSingleuntitledAction {
  return {
    type: OtonioinviernoActionTypes.REMOVED_SINGLEUNTITLED,
  }
}

export function removingSingleuntitledFailed(): IRemovingSingleuntitledFailedAction {
  return {
    type: OtonioinviernoActionTypes.REMOVING_SINGLEUNTITLED_FAILED,
  }
}

export function editOtonioinvierno(singleuntitled: IOtonioinviernoItem): IEditOtonioinviernoAction {
  return {
    type: OtonioinviernoActionTypes.EDIT_OTONIOINVIERNO,
    payload: singleuntitled,
  }
}

export function editingOtonioinvierno(): IEditingOtonioinviernoAction {
  return {
    type: OtonioinviernoActionTypes.EDITING_OTONIOINVIERNO,
  }
}

export function editedOtonioinvierno(otonioinvierno: IOtonioinviernoItem): IEditedOtonioinviernoAction {
  return {
    type: OtonioinviernoActionTypes.EDITED_OTONIOINVIERNO,
    payload: otonioinvierno,
  }
}

export function editingOtonioinviernoFailed(): IEditingOtonioinviernoFailedAction {
  return {
    type: OtonioinviernoActionTypes.EDITING_OTONIOINVIERNO_FAILED,
  }
}

type TSearchOptions = {
  searchString?: string
  searchField?: string
  page?: number
  limit?: number
  populate?: boolean
  sort?: {
    field: string
    method?: 'asc' | 'desc'
  }
  filters?: { field: string; value: string }[]
}

export interface ISearchOtonioinviernoAction {
  type: OtonioinviernoActionTypes.SEARCH_OTONIOINVIERNO
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingOtonioinviernoAction {
  type: OtonioinviernoActionTypes.SEARCHING_OTONIOINVIERNO
}

export interface IFoundOtonioinviernoAction {
  type: OtonioinviernoActionTypes.FOUND_OTONIOINVIERNO
  keep?: boolean
  payload: {
    otonioinvierno: IpaginatedOtonioinvierno
  }
}

export interface ISearchingOtonioinviernoFailedAction {
  type: OtonioinviernoActionTypes.SEARCHING_OTONIOINVIERNO_FAILED
}

export interface ILoadOtonioinviernoAction {
  type: OtonioinviernoActionTypes.LOAD_OTONIOINVIERNO
  loadOptions: TSearchOptions
}

export interface ILoadingOtonioinviernoAction {
  type: OtonioinviernoActionTypes.LOADING_OTONIOINVIERNO
}

export interface ILoadedOtonioinviernoAction {
  type: OtonioinviernoActionTypes.LOADED_OTONIOINVIERNO
  payload: {
    otonioinvierno: IpaginatedOtonioinvierno
  }
}

export interface ILoadingOtonioinviernoFailedAction {
  type: OtonioinviernoActionTypes.LOADING_OTONIOINVIERNO_FAILED
}

export interface IAddOtonioinviernoAction {
  type: OtonioinviernoActionTypes.ADD_OTONIOINVIERNO
  payload: IOtonioinviernoItem
}

export interface IAddingOtonioinviernoAction {
  type: OtonioinviernoActionTypes.ADDING_OTONIOINVIERNO
}

export interface IAddedOtonioinviernoAction {
  type: OtonioinviernoActionTypes.ADDED_OTONIOINVIERNO
  payload: {
    otonioinvierno: IpaginatedOtonioinvierno
  }
}

export interface IAddingOtonioinviernoFailedAction {
  type: OtonioinviernoActionTypes.ADDING_OTONIOINVIERNO_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveSingleuntitledAction {
  type: OtonioinviernoActionTypes.REMOVE_SINGLEUNTITLED
  payload: IOtonioinviernoItem
}

export interface IRemovingSingleuntitledAction {
  type: OtonioinviernoActionTypes.REMOVING_SINGLEUNTITLED
}

export interface IRemovedSingleuntitledAction {
  type: OtonioinviernoActionTypes.REMOVED_SINGLEUNTITLED
}

export interface IRemovingSingleuntitledFailedAction {
  type: OtonioinviernoActionTypes.REMOVING_SINGLEUNTITLED_FAILED
}

export interface IEditOtonioinviernoAction {
  type: OtonioinviernoActionTypes.EDIT_OTONIOINVIERNO
  payload: IOtonioinviernoItem
}

export interface IEditingOtonioinviernoAction {
  type: OtonioinviernoActionTypes.EDITING_OTONIOINVIERNO
}

export interface IEditedOtonioinviernoAction {
  type: OtonioinviernoActionTypes.EDITED_OTONIOINVIERNO
  payload: IOtonioinviernoItem
}

export interface IEditingOtonioinviernoFailedAction {
  type: OtonioinviernoActionTypes.EDITING_OTONIOINVIERNO_FAILED
}

export type OtonioinviernoAction =
  | ISearchOtonioinviernoAction
  | ISearchingOtonioinviernoAction
  | IFoundOtonioinviernoAction
  | ISearchingOtonioinviernoFailedAction
  | ILoadOtonioinviernoAction
  | ILoadingOtonioinviernoAction
  | ILoadedOtonioinviernoAction
  | ILoadingOtonioinviernoFailedAction
  | IAddOtonioinviernoAction
  | IAddingOtonioinviernoAction
  | IAddedOtonioinviernoAction
  | IAddingOtonioinviernoFailedAction
  | IRemoveSingleuntitledAction
  | IRemovingSingleuntitledAction
  | IRemovedSingleuntitledAction
  | IRemovingSingleuntitledFailedAction
  | IEditOtonioinviernoAction
  | IEditingOtonioinviernoAction
  | IEditedOtonioinviernoAction
  | IEditingOtonioinviernoFailedAction
