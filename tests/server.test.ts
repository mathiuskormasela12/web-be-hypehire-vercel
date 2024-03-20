import App from '@/core/App'
import server from '@/server'

describe('Server', () => {
  it('should create server object', () => {
    expect(server).toBeDefined()
    expect(server).toBeInstanceOf(App)
  })
})
