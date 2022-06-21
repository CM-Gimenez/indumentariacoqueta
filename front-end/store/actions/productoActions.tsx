import { IpaginatedProducto, IProductoItem } from '../models'

export enum ProductoActionTypes {
  SEARCH_PRODUCTO = 'producto/search',
  SEARCHING_PRODUCTO = 'producto/searching',
  FOUND_PRODUCTO = 'producto/found',
  SEARCHING_PRODUCTO_FAILED = 'producto/searching_failed',

  LOAD_PRODUCTO = 'producto/load',
  LOADING_PRODUCTO = 'producto/loading',
  LOADED_PRODUCTO = 'producto/loaded',
  LOADING_PRODUCTO_FAILED = 'producto/loading_failed',

  ADD_PRODUCTO = 'producto/add',
  ADDING_PRODUCTO = 'producto/adding',
  ADDED_PRODUCTO = 'producto/added',
  ADDING_PRODUCTO_FAILED = 'producto/adding_failed',

  REMOVE_SINGLEUNTITLED = 'producto/remove',
  REMOVING_SINGLEUNTITLED = 'producto/removing',
  REMOVED_SINGLEUNTITLED = 'producto/removed',
  REMOVING_SINGLEUNTITLED_FAILED = 'producto/removing_failed',

  EDIT_PRODUCTO = 'producto/edit',
  EDITING_PRODUCTO = 'producto/editing',
  EDITED_PRODUCTO = 'producto/edited',
  EDITING_PRODUCTO_FAILED = 'producto/editing_failed',
}

export function searchProducto(searchOptions: TSearchOptions | string, keep?: boolean): ISearchProductoAction {
  return {
    type: ProductoActionTypes.SEARCH_PRODUCTO,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingProducto(): ISearchingProductoAction {
  return {
    type: ProductoActionTypes.SEARCHING_PRODUCTO,
  }
}

export function foundProducto(producto: IpaginatedProducto, keep?: boolean): IFoundProductoAction {
  return {
    type: ProductoActionTypes.FOUND_PRODUCTO,
    keep: keep,
    payload: {
      producto,
    },
  }
}

export function searchingProductoFailed(): ISearchingProductoFailedAction {
  return {
    type: ProductoActionTypes.SEARCHING_PRODUCTO_FAILED,
  }
}

export function loadProducto(loadOptions: TSearchOptions): ILoadProductoAction {
  return {
    type: ProductoActionTypes.LOAD_PRODUCTO,
    loadOptions: loadOptions,
  }
}

export function loadingProducto(): ILoadingProductoAction {
  return {
    type: ProductoActionTypes.LOADING_PRODUCTO,
  }
}

export function loadedProducto(producto: IpaginatedProducto): ILoadedProductoAction {
  return {
    type: ProductoActionTypes.LOADED_PRODUCTO,
    payload: {
      producto,
    },
  }
}

export function loadingProductoFailed(): ILoadingProductoFailedAction {
  return {
    type: ProductoActionTypes.LOADING_PRODUCTO_FAILED,
  }
}

export function addProducto(singleuntitled: IProductoItem): IAddProductoAction {
  return {
    type: ProductoActionTypes.ADD_PRODUCTO,
    payload: singleuntitled,
  }
}

export function addingProducto(): IAddingProductoAction {
  return {
    type: ProductoActionTypes.ADDING_PRODUCTO,
  }
}

export function addedProducto(producto: IpaginatedProducto): IAddedProductoAction {
  return {
    type: ProductoActionTypes.ADDED_PRODUCTO,
    payload: {
      producto,
    },
  }
}

export function addingProductoFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingProductoFailedAction {
  return {
    type: ProductoActionTypes.ADDING_PRODUCTO_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeSingleuntitled(singleuntitled: IProductoItem): IRemoveSingleuntitledAction {
  return {
    type: ProductoActionTypes.REMOVE_SINGLEUNTITLED,
    payload: singleuntitled,
  }
}

export function removingSingleuntitled(): IRemovingSingleuntitledAction {
  return {
    type: ProductoActionTypes.REMOVING_SINGLEUNTITLED,
  }
}

export function removedSingleuntitled(): IRemovedSingleuntitledAction {
  return {
    type: ProductoActionTypes.REMOVED_SINGLEUNTITLED,
  }
}

export function removingSingleuntitledFailed(): IRemovingSingleuntitledFailedAction {
  return {
    type: ProductoActionTypes.REMOVING_SINGLEUNTITLED_FAILED,
  }
}

export function editProducto(singleuntitled: IProductoItem): IEditProductoAction {
  return {
    type: ProductoActionTypes.EDIT_PRODUCTO,
    payload: singleuntitled,
  }
}

export function editingProducto(): IEditingProductoAction {
  return {
    type: ProductoActionTypes.EDITING_PRODUCTO,
  }
}

export function editedProducto(producto: IProductoItem): IEditedProductoAction {
  return {
    type: ProductoActionTypes.EDITED_PRODUCTO,
    payload: producto,
  }
}

export function editingProductoFailed(): IEditingProductoFailedAction {
  return {
    type: ProductoActionTypes.EDITING_PRODUCTO_FAILED,
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

export interface ISearchProductoAction {
  type: ProductoActionTypes.SEARCH_PRODUCTO
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingProductoAction {
  type: ProductoActionTypes.SEARCHING_PRODUCTO
}

export interface IFoundProductoAction {
  type: ProductoActionTypes.FOUND_PRODUCTO
  keep?: boolean
  payload: {
    producto: IpaginatedProducto
  }
}

export interface ISearchingProductoFailedAction {
  type: ProductoActionTypes.SEARCHING_PRODUCTO_FAILED
}

export interface ILoadProductoAction {
  type: ProductoActionTypes.LOAD_PRODUCTO
  loadOptions: TSearchOptions
}

export interface ILoadingProductoAction {
  type: ProductoActionTypes.LOADING_PRODUCTO
}

export interface ILoadedProductoAction {
  type: ProductoActionTypes.LOADED_PRODUCTO
  payload: {
    producto: IpaginatedProducto
  }
}

export interface ILoadingProductoFailedAction {
  type: ProductoActionTypes.LOADING_PRODUCTO_FAILED
}

export interface IAddProductoAction {
  type: ProductoActionTypes.ADD_PRODUCTO
  payload: IProductoItem
}

export interface IAddingProductoAction {
  type: ProductoActionTypes.ADDING_PRODUCTO
}

export interface IAddedProductoAction {
  type: ProductoActionTypes.ADDED_PRODUCTO
  payload: {
    producto: IpaginatedProducto
  }
}

export interface IAddingProductoFailedAction {
  type: ProductoActionTypes.ADDING_PRODUCTO_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveSingleuntitledAction {
  type: ProductoActionTypes.REMOVE_SINGLEUNTITLED
  payload: IProductoItem
}

export interface IRemovingSingleuntitledAction {
  type: ProductoActionTypes.REMOVING_SINGLEUNTITLED
}

export interface IRemovedSingleuntitledAction {
  type: ProductoActionTypes.REMOVED_SINGLEUNTITLED
}

export interface IRemovingSingleuntitledFailedAction {
  type: ProductoActionTypes.REMOVING_SINGLEUNTITLED_FAILED
}

export interface IEditProductoAction {
  type: ProductoActionTypes.EDIT_PRODUCTO
  payload: IProductoItem
}

export interface IEditingProductoAction {
  type: ProductoActionTypes.EDITING_PRODUCTO
}

export interface IEditedProductoAction {
  type: ProductoActionTypes.EDITED_PRODUCTO
  payload: IProductoItem
}

export interface IEditingProductoFailedAction {
  type: ProductoActionTypes.EDITING_PRODUCTO_FAILED
}

export type ProductoAction =
  | ISearchProductoAction
  | ISearchingProductoAction
  | IFoundProductoAction
  | ISearchingProductoFailedAction
  | ILoadProductoAction
  | ILoadingProductoAction
  | ILoadedProductoAction
  | ILoadingProductoFailedAction
  | IAddProductoAction
  | IAddingProductoAction
  | IAddedProductoAction
  | IAddingProductoFailedAction
  | IRemoveSingleuntitledAction
  | IRemovingSingleuntitledAction
  | IRemovedSingleuntitledAction
  | IRemovingSingleuntitledFailedAction
  | IEditProductoAction
  | IEditingProductoAction
  | IEditedProductoAction
  | IEditingProductoFailedAction
