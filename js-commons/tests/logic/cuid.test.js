const cuidWithPrefix = require('../../src/logic/cuid')

const CUID_LENGTH = 25

describe('cuidWithPrefix', () => {
  test('with prefix', () => {
    const prefix = 'ban_'
    const cuid = cuidWithPrefix(prefix)()
    expect(cuid.startsWith(prefix)).toBe(true)
    expect(cuid.length).toBe(CUID_LENGTH + prefix.length)
  })

  test('without prefix', () => {
    const cuid = cuidWithPrefix()()
    expect(cuid.startsWith('ban_')).toBe(false)
    expect(cuid.length).toBe(CUID_LENGTH)
  })
})
