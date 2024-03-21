import { type IResponse, type IResponseWithParams } from '@/interfaces/IResponse'
import { type Response } from 'express'

type ResponseHandlerParams<T, K> = T extends 'IResponseWithParams' ? IResponseWithParams<K> : IResponse

type ResponseHandler = <T, K>(res: Response, params: ResponseHandlerParams<T, K>) => Response

export default ResponseHandler
