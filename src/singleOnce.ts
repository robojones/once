import { EventEmitter } from 'events'
import { createPromise } from './createPromise'
import { initCache } from './initCache'

/**
 * Returns a promise that resolves when the event is emitted. The promise gets rejected if the event is "error".
 * @param emitter - The EventEmitter that emits the event.
 * @param event - The name of the event.
 * @param arrayMode - If arrayMode is set to true, the promise will resolve to an array
 * containing all arguments that were passed to the event.
 * The arrayMode does not affect "error" events.
 */

export async function singleOnce (emitter: EventEmitter, event: string, arrayMode: boolean): Promise<any> {
	const target = initCache(emitter)

	// check if promise already exists
	if (target.__promises__[event]) {
		return target.__promises__[event]
	}

	const promise: Promise<any> = createPromise(target, event, arrayMode)

	target.__promises__[event] = promise

	return promise
}
