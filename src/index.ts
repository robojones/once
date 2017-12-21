import { EventEmitter } from 'events'

export interface PromiseEmitter extends EventEmitter {
  /**
   * Contains all pending promises for events that have not yet been triggered.
   */
  __promises__: { [event: string]: Promise<any> }
}

/**
 * Returns a promise that resolves when the event is emitted. The promise gets rejected if the event is "error".
 * @param emitter - The EventEmitter that emits the event.
 * @param event - The name of the event.
 * @param arrayMode - If arrayMode is set to true, the promise will resolve to an array
 *                    containing all arguments that were passed to the event.
 *                    The arrayMode does not affect "error" events.
 */

async function singleOnce (emitter: EventEmitter, event: string, arrayMode?: boolean): Promise<any> {
  const target = emitter as PromiseEmitter

  if (!target.__promises__) {
    target.__promises__ = {}
  }

  // check if promise already exists
  if (target.__promises__[event]) {
    return target.__promises__[event]
  }

  const promise: Promise<any> = new Promise((resolve, reject) => {
    target.once(event, (...args) => {

      // remove from cache
      delete target.__promises__[event]

      if (event === 'error') {
        reject(args[0])
      } else {
        if (arrayMode) {
          resolve(args)
        } else {
          resolve(args[0])
        }
      }

    })
  })

  target.__promises__[event] = promise

  return promise
}


/**
 * Returns a promise that resolves when the event is emitted. The promise gets rejected if the event is "error".
 * @param emitter - The EventEmitter that emits the event.
 * @param event - The name of the event or an array of names and promises.
 * @param arrayMode - If arrayMode is set to true, the promise will resolve to an array
 *                    containing all arguments that were passed to the event.
 *                    The arrayMode does not affect "error" events.
 */

export default async function once (
  emitter: EventEmitter,
  event: string | Array<string | Promise<any>>,
  arrayMode: true
): Promise<any[]>

/**
 * Returns a promise that resolves when the event is emitted. The promise gets rejected if the event is "error".
 * @param emitter - The EventEmitter that emits the event.
 * @param event - The name of the event or an array of names and promises.
 * @param arrayMode - If arrayMode is set to true, the promise will resolve to an array
 *                    containing all arguments that were passed to the event.
 *                    The arrayMode does not affect "error" events.
 */

export default async function once (
  emitter: EventEmitter,
  event: string | Array<string | Promise<any>>,
  arrayMode?: false
): Promise<any>

/**
 * Returns a promise that resolves when the event is emitted. The promise gets rejected if the event is "error".
 * @param emitter - The EventEmitter that emits the event.
 * @param event - The name of the event or an array of names and promises.
 * @param arrayMode - If arrayMode is set to true, the promise will resolve to an array
 *                    containing all arguments that were passed to the event.
 *                    The arrayMode does not affect "error" events.
 */

export default async function once (
  emitter: EventEmitter,
  event: string | Array<string | Promise<any>>,
  arrayMode?: boolean
): Promise<any[]> {
  if (typeof event === 'string') {
    return singleOnce(emitter, event, arrayMode)
  }

  const promises = event.map(element => {
    if (typeof element === 'string') {
      return singleOnce(emitter, element, arrayMode)
    }

    return element
  })

  return Promise.race(promises)
}
