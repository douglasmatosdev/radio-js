import { jest, expect, describe, test, beforeEach } from '@jest/globals'
import { Controller } from '../../../server/controller.js'
import TestUtil from '../_util/testUtil.js'
import config from './../../../server/config.js'
import { handler } from '../../../server/routes.js'

const {
    pages,
    location
} = config

describe('#Routes', () => {

    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    test('GET / - should redirect to home page', async () => {
        const params = TestUtil.defaultHandleParams()
        params.request.method = 'GET'
        params.request.url = '/'

        await handler(...params.values())

        expect(params.response.writeHead).toBeCalledWith(302, { 'Location': location.home })
        expect(params.response.end).toHaveBeenCalled()
    })
    test(`GET /home - should response with ${pages.homeHTML}} file stream`, async () => {
        const params = TestUtil.defaultHandleParams()
        params.request.method = 'GET'
        params.request.url = '/home'

        const mockFileStream = TestUtil.generateReadableStream(['data'])

        jest.spyOn(
            Controller.prototype,
            Controller.prototype.getFileStream.name
        ).mockResolvedValue({
            stream: mockFileStream,
        })

        jest.spyOn(
            mockFileStream,
            'pipe'
        ).mockReturnValue()

        await handler(...params.values())

        expect(Controller.prototype.getFileStream).toBeCalledWith(pages.homeHTML)
        expect(mockFileStream.pipe).toHaveBeenCalledWith(params.response)
    })
    test.todo(`GET /home - should response with ${pages.controllerHTML}} file stream`)
    test.todo(`GET /file.ext - should response with file stream`)
    test.todo(`GET /unknow - given an inexistest route it should response with 404`)

    describe('exceptions', () => {
        test.todo('given inexistent file it should respond with 404')
        test.todo('given an error ir should respond width 500')
    })
})