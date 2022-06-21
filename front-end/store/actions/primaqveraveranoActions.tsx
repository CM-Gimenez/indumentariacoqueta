import { IpaginatedPrimaqveraverano, IPrimaqveraveranoItem } from '../models'

export enum PrimaqveraveranoActionTypes {
  SEARCH_PRIMAQVERAVERANO = 'primaqveraverano/search',
  SEARCHING_PRIMAQVERAVERANO = 'primaqveraverano/searching',
  FOUND_PRIMAQVERAVERANO = 'primaqveraverano/found',
  SEARCHING_PRIMAQVERAVERANO_FAILED = 'primaqveraverano/searching_failed',

  LOAD_PRIMAQVERAVERANO = 'primaqveraverano/load',
  LOADING_PRIMAQVERAVERANO = 'primaqveraverano/loading',
  LOADED_PRIMAQVERAVERANO = 'primaqveraverano/loaded',
  LOADING_PRIMAQVERAVERANO_FAILED = 'primaqveraverano/loading_failed',

  ADD_PRIMAQVERAVERANO = 'primaqveraverano/add',
  ADDING_PRIMAQVERAVERANO = 'primaqveraverano/adding',
  ADDED_PRIMAQVERAVERANO = 'primaqveraverano/added',
  ADDING_PRIMAQVERAVERANO_FAILED = 'primaqveraverano/adding_failed',

  REMOVE_SINGLEUNTITLED = 'primaqveraverano/remove',
  REMOVING_SINGLEUNTITLED = 'primaqveraverano/removing',
  REMOVED_SINGLEUNTITLED = 'primaqveraverano/removed',
  REMOVING_SINGLEUNTITLED_FAILED = 'primaqveraverano/removing_failed',

  EDIT_PRIMAQVERAVERANO = 'primaqveraverano/edit',
  EDITING_PRIMAQVERAVERANO = 'primaqveraverano/editing',
  EDITED_PRIMAQVERAVERANO = 'primaqveraverano/edited',
  EDITING_PRIMAQVERAVERANO_FAILED = 'primaqveraverano/editing_failed',
}

export function searchPrimaqveraverano(searchOptions: TSearchOptions | string, keep?: boolean): ISearchPrimaqveraveranoAction {
  return {
    type: PrimaqveraveranoActionTypes.SEARCH_PRIMAQVERAVERANO,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingPrimaqveraverano(): ISearchingPrimaqveraveranoAction {
  return {
    type: PrimaqveraveranoActionTypes.SEARCHING_PRIMAQVERAVERANO,
  }
}

export function foundPrimaqveraverano(primaqveraverano: IpaginatedPrimaqveraverano, keep?: boolean): IFoundPrimaqveraveranoAction {
  return {
    type: PrimaqveraveranoActionTypes.FOUND_PRIMAQVERAVERANO,
    keep: keep,
    payload: {
      primaqveraverano,
    },
  }
}

export function searchingPrimaqveraveranoFailed(): ISearchingPrimaqveraveranoFailedAction {
  return {
    type: PrimaqveraveranoActionTypes.SEARCHING_PRIMAQVERAVERANO_FAILED,
  }
}

export function loadPrimaqveraverano(loadOptions: TSearchOptions): ILoadPrimaqveraveranoAction {
  return {
    type: PrimaqveraveranoActionTypes.LOAD_PRIMAQVERAVERANO,
    loadOptions: loadOptions,
  }
}

export function loadingPrimaqveraverano(): ILoadingPrimaqveraveranoAction {
  return {
    type: PrimaqveraveranoActionTypes.LOADING_PRIMAQVERAVERANO,
  }
}

export function loadedPrimaqveraverano(primaqveraverano: IpaginatedPrimaqveraverano): ILoadedPrimaqveraveranoAction {
  return {
    type: PrimaqveraveranoActionTypes.LOADED_PRIMAQVERAVERANO,
    payload: {
      primaqveraverano,
    },
  }
}

export function loadingPrimaqveraveranoFailed(): ILoadingPrimaqveraveranoFailedAction {
  return {
    type: PrimaqveraveranoActionTypes.LOADING_PRIMAQVERAVERANO_FAILED,
  }
}

export function addPrimaqveraverano(singleuntitled: IPrimaqveraveranoItem): IAddPrimaqveraveranoAction {
  return {
    type: PrimaqveraveranoActionTypes.ADD_PRIMAQVERAVERANO,
    payload: singleuntitled,
  }
}

export function addingPrimaqveraverano(): IAddingPrimaqveraveranoAction {
  return {
    type: PrimaqveraveranoActionTypes.ADDING_PRIMAQVERAVERANO,
  }
}

export function addedPrimaqveraverano(primaqveraverano: IpaginatedPrimaqveraverano): IAddedPrimaqveraveranoAction {
  return {
    type: PrimaqveraveranoActionTypes.ADDED_PRIMAQVERAVERANO,
    payload: {
      primaqveraverano,
    },
  }
}

export function addingPrimaqveraveranoFailed(errData: {
  data: { message: string; field?: string }
  status: number
}): IAddingPrimaqveraveranoFailedAction {
  return {
    type: PrimaqveraveranoActionTypes.ADDING_PRIMAQVERAVERANO_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeSingleuntitled(singleuntitled: IPrimaqveraveranoItem): IRemoveSingleuntitledAction {
  return {
    type: PrimaqveraveranoActionTypes.REMOVE_SINGLEUNTITLED,
    payload: singleuntitled,
  }
}

export function removingSingleuntitled(): IRemovingSingleuntitledAction {
  return {
    type: PrimaqveraveranoActionTypes.REMOVING_SINGLEUNTITLED,
  }
}

export function removedSingleuntitled(): IRemovedSingleuntitledAction {
  return {
    type: PrimaqveraveranoActionTypes.REMOVED_SINGLEUNTITLED,
  }
}

export function removingSingleuntitledFailed(): IRemovingSingleuntitledFailedAction {
  return {
    type: PrimaqveraveranoActionTypes.REMOVING_SINGLEUNTITLED_FAILED,
  }
}

export function editPrimaqveraverano(singleuntitled: IPrimaqveraveranoItem): IEditPrimaqveraveranoAction {
  return {
    type: PrimaqveraveranoActionTypes.EDIT_PRIMAQVERAVERANO,
    payload: singleuntitled,
  }
}

export function editingPrimaqveraverano(): IEditingPrimaqveraveranoAction {
  return {
    type: PrimaqveraveranoActionTypes.EDITING_PRIMAQVERAVERANO,
  }
}

export function editedPrimaqveraverano(primaqveraverano: IPrimaqveraveranoItem): IEditedPrimaqveraveranoAction {
  return {
    type: PrimaqveraveranoActionTypes.EDITED_PRIMAQVERAVERANO,
    payload: primaqveraverano,
  }
}

export function editingPrimaqveraveranoFailed(): IEditingPrimaqveraveranoFailedAction {
  return {
    type: PrimaqveraveranoActionTypes.EDITING_PRIMAQVERAVERANO_FAILED,
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

export interface ISearchPrimaqveraveranoAction {
  type: PrimaqveraveranoActionTypes.SEARCH_PRIMAQVERAVERANO
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingPrimaqveraveranoAction {
  type: PrimaqveraveranoActionTypes.SEARCHING_PRIMAQVERAVERANO
}

export interface IFoundPrimaqveraveranoAction {
  type: PrimaqveraveranoActionTypes.FOUND_PRIMAQVERAVERANO
  keep?: boolean
  payload: {
    primaqveraverano: IpaginatedPrimaqveraverano
  }
}

export interface ISearchingPrimaqveraveranoFailedAction {
  type: PrimaqveraveranoActionTypes.SEARCHING_PRIMAQVERAVERANO_FAILED
}

export interface ILoadPrimaqveraveranoAction {
  type: PrimaqveraveranoActionTypes.LOAD_PRIMAQVERAVERANO
  loadOptions: TSearchOptions
}

export interface ILoadingPrimaqveraveranoAction {
  type: PrimaqveraveranoActionTypes.LOADING_PRIMAQVERAVERANO
}

export interface ILoadedPrimaqveraveranoAction {
  type: PrimaqveraveranoActionTypes.LOADED_PRIMAQVERAVERANO
  payload: {
    primaqveraverano: IpaginatedPrimaqveraverano
  }
}

export interface ILoadingPrimaqveraveranoFailedAction {
  type: PrimaqveraveranoActionTypes.LOADING_PRIMAQVERAVERANO_FAILED
}

export interface IAddPrimaqveraveranoAction {
  type: PrimaqveraveranoActionTypes.ADD_PRIMAQVERAVERANO
  payload: IPrimaqveraveranoItem
}

export interface IAddingPrimaqveraveranoAction {
  type: PrimaqveraveranoActionTypes.ADDING_PRIMAQVERAVERANO
}

export interface IAddedPrimaqveraveranoAction {
  type: PrimaqveraveranoActionTypes.ADDED_PRIMAQVERAVERANO
  payload: {
    primaqveraverano: IpaginatedPrimaqveraverano
  }
}

export interface IAddingPrimaqveraveranoFailedAction {
  type: PrimaqveraveranoActionTypes.ADDING_PRIMAQVERAVERANO_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveSingleuntitledAction {
  type: PrimaqveraveranoActionTypes.REMOVE_SINGLEUNTITLED
  payload: IPrimaqveraveranoItem
}

export interface IRemovingSingleuntitledAction {
  type: PrimaqveraveranoActionTypes.REMOVING_SINGLEUNTITLED
}

export interface IRemovedSingleuntitledAction {
  type: PrimaqveraveranoActionTypes.REMOVED_SINGLEUNTITLED
}

export interface IRemovingSingleuntitledFailedAction {
  type: PrimaqveraveranoActionTypes.REMOVING_SINGLEUNTITLED_FAILED
}

export interface IEditPrimaqveraveranoAction {
  type: PrimaqveraveranoActionTypes.EDIT_PRIMAQVERAVERANO
  payload: IPrimaqveraveranoItem
}

export interface IEditingPrimaqveraveranoAction {
  type: PrimaqveraveranoActionTypes.EDITING_PRIMAQVERAVERANO
}

export interface IEditedPrimaqveraveranoAction {
  type: PrimaqveraveranoActionTypes.EDITED_PRIMAQVERAVERANO
  payload: IPrimaqveraveranoItem
}

export interface IEditingPrimaqveraveranoFailedAction {
  type: PrimaqveraveranoActionTypes.EDITING_PRIMAQVERAVERANO_FAILED
}

export type PrimaqveraveranoAction =
  | ISearchPrimaqveraveranoAction
  | ISearchingPrimaqveraveranoAction
  | IFoundPrimaqveraveranoAction
  | ISearchingPrimaqveraveranoFailedAction
  | ILoadPrimaqveraveranoAction
  | ILoadingPrimaqveraveranoAction
  | ILoadedPrimaqveraveranoAction
  | ILoadingPrimaqveraveranoFailedAction
  | IAddPrimaqveraveranoAction
  | IAddingPrimaqveraveranoAction
  | IAddedPrimaqveraveranoAction
  | IAddingPrimaqveraveranoFailedAction
  | IRemoveSingleuntitledAction
  | IRemovingSingleuntitledAction
  | IRemovedSingleuntitledAction
  | IRemovingSingleuntitledFailedAction
  | IEditPrimaqveraveranoAction
  | IEditingPrimaqveraveranoAction
  | IEditedPrimaqveraveranoAction
  | IEditingPrimaqveraveranoFailedAction
