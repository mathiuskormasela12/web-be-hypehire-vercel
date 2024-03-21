import type IToken from '@/interfaces/IToken'

type CreateTokenHandler = <T>(data: T) => IToken

export default CreateTokenHandler
