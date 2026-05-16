
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ScryfallSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await ScryfallSDK.test()
    equal(null !== testsdk, true)
  })

})
