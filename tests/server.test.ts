import server from '../src/server'

describe('Server', () => {
  it('should return "Hello World"', () => {
    expect(server()).toBe('Hello World')
  })
})
