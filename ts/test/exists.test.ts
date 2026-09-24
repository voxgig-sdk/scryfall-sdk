
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ScryfallSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = ScryfallSDK.test()
    equal(testsdk instanceof ScryfallSDK, true,
      'ScryfallSDK.test() must return a client synchronously')
  })

})
