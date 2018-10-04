import { PromiseEmitter } from './PromiseEmitter'

/**
 * Creates a new promise for an event.
 * @param target The EventEmitter that will emit the event.
 * @param event The name of the event.
 * @param arrayMode If set to true the promise will resolve to an array containing all arguments of the event.
 */
export function createPromise(target: PromiseEmitter, event: string, arrayMode: boolean): Promise<any> {
	return new Promise((resolve, reject) => {
		target.once(event, (...args) => {

			// remove from cache
			delete target.__promises__[event]

			if (event === 'error') {
				reject(args[0])
			} else if (arrayMode) {
				resolve(args)
			} else {
				resolve(args[0])
			}
		})
	})
}
