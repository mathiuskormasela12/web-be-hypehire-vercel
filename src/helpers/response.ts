import type ResponseHandler from '@/types/ResponseHandler'

const response: ResponseHandler = (res, params) => {
  return res.status(params.statusCode).json(params)
}

export default response
