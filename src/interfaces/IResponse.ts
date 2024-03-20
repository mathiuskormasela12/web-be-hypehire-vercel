export interface IResponseWithParams<T> {
  statusCode: number
  message?: string
  data?: T
  errors?: Array<Record<string, string[]>>
}

export interface IResponse {
  statusCode: number
  message?: string
  errors?: Array<Record<string, string[]>>
}
