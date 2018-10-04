import { EventEmitter } from 'events'
import { singleOnce } from './singleOnce'

/**
 * Returns a promise that resolves when the event is emitted. The promise gets rejected if the event is "error".
 * @param emitter - The EventEmitter that emits the event.
 * @param event - The name of the event or an array of names and promises.
 * @param arrayMode - If arrayMode is set to true, the promise will resolve to an array
 * containing all arguments that were passed to the event.
 * The arrayMode does not affect "error" events.
 */

export async function once (
	emitter: EventEmitter,
	event: string | string[],
	arrayMode: true,
): Promise<any[]>

/**
 * Returns a promise that resolves when the event is emitted. The promise gets rejected if the event is "error".
 * @param emitter - The EventEmitter that emits the event.
 * @param event - The name of the event or an array of names and promises.
 * @param arrayMode - If arrayMode is set to true, the promise will resolve to an array
 * containing all arguments that were passed to the event.
 * The arrayMode does not affect "error" events.
 */

export async function once (
	emitter: EventEmitter,
	event: string | string[],
	arrayMode?: false,
): Promise<any>

/**
 * Returns a promise that resolves when the event is emitted. The promise gets rejected if the event is "error".
 * @param emitter - The EventEmitter that emits the event.
 * @param event - The name of the event or an array of names and promises.
 * @param arrayMode - If arrayMode is set to true, the promise will resolve to an array
 * containing all arguments that were passed to the event.
 * The arrayMode does not affect "error" events.
 */

export async function once (
	emitter: EventEmitter,
	event: string | string[],
	arrayMode: boolean = false,
): Promise<any[]> {
	if (typeof event === 'string') {
		return singleOnce(emitter, event, arrayMode)
	}

	const promises = event.map((element) => {
		return singleOnce(emitter, element, arrayMode)
	})

	return Promise.race(promises)
}
