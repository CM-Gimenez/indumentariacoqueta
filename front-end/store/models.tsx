export interface IUsersItem {
  _id?: String
  createdAt: Date

  FirstName: string

  LastName: string

  Email: string
  Password: String

  ProfilePic: string
  Role: String
}

export interface IpaginatedUsers {
  docs: IUsersItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
export interface IProductoItem {
  _id?: String
  createdAt: Date

  Name: string

  Marca: string

  Description: string
  Price: Number

  image: string
}

export interface IpaginatedProducto {
  docs: IProductoItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export enum ApiStatus {
  NOTLOADED = 'notloaded',
  LOADING = 'loading',
  LOADED = 'loaded',
  FAILED = 'failed',
}
