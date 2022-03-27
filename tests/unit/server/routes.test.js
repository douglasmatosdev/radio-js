import { jest, expect, describe, test, beforeEach } from '@jest/globals'

describe('#Routes', () => {

    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    test.todo('GET / - should redirect to home page')
    test.todo('GET /home - should response with index.html file stream')
})