import { type IResponse } from '@/interfaces/IResponse'
import { type Request } from 'express'

type UploadFileHandler = (allowedTypes: RegExp, files: Request['files'], fieldName: string) => Promise<IResponse | string>

export default UploadFileHandler
