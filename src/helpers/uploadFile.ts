import { type UploadedFile } from 'express-fileupload'
import path from 'path'
import type UploadFileHandler from '@/types/UploadFileHandler'

const uploadFile: UploadFileHandler = async (allowedTypes, files, fieldName) => {
  if (files?.[fieldName]) {
    const file: UploadedFile = files[fieldName] as UploadedFile

    const extension = file.name.split('.').pop() ?? ''
    const checkMimeType = allowedTypes.test(file.mimetype)
    const checkExt = allowedTypes.test(extension)

    if (!checkExt && !checkMimeType) {
      return {
        statusCode: 400,
        errors: [`${extension} file is not alowed`]
      }
    }

    if (file.size > 3000000) {
      return {
        statusCode: 400,
        errors: ['Your file is too larger']
      }
    }

    let result = ''
    result += Date.now().toString()
    result += '.'
    result += extension

    try {
      await file.mv(path.join(__dirname, '../../public/' + result))
      return result
    } catch (err) {
      const { message } = err as Error
      return {
        statusCode: 500,
        errors: [message]
      }
    }
  } else {
    return {
      statusCode: 400,
      errors: [`${fieldName} is required`]
    }
  }
}

export default uploadFile
