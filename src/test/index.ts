import * as assert from 'assert'
import { EventEmitter } from 'events'
import once from '..'

describe('once', () => {
  beforeEach(function () {
    this.emitter = new EventEmitter()
  })
  describe('returned promise', () => {

    describe('default', () => {
      it('should resolve to the first item of the event\'s arguments', async function () {
        const promise = once(this.emitter, 'test')
        const value = 'foo'

        this.emitter.emit('test', value)
        const result = await promise

        assert.strictEqual(result, value)
      })
    })

    describe('arrayMode', () => {
      it('should resolve to an array containing all the event\'s arguments', async function () {
        const promise = once(this.emitter, 'test', true)
        const values = ['arg1', 'arg2', true]

        this.emitter.emit('test', ...values)
        const result = await promise

        assert.deepEqual(result, values)
      })
    })

    describe('error event', () => {
      it('should reject the promise with the error', async function () {
        const promise = once(this.emitter, 'error')
        const error = new Error('test')

        this.emitter.emit('error', error)
        try {
          await promise
        } catch (err) {
          return assert.strictEqual(err, error)
        }

        throw new Error('The promise was not rejected.')
      })
    })


    describe('multiple events', () => {
      it('should resolve to the value of the first resolved promise', async function () {
        const promise = once(this.emitter, ['first', 'second', 'third'])
        const value = 'foo'

        this.emitter.emit('second', value)
        setImmediate(() => {
          this.emitter.emit('first', 2)
          this.emitter.emit('third', 3)
        })
        const result = await promise

        assert.strictEqual(result, value)
      })

      it('should correctly handle directly passed promises.', async function () {
        await once(this.emitter, [Promise.resolve('asdf'), Promise.resolve('huhn')])
      })
    })
  })
})
