import { EventEmitter } from 'events'

export interface PromiseEmitter extends EventEmitter {
	/**
	 * Contains all pending promises for events that have not yet been triggered.
	 */
	__promises__: { [event: string]: Promise<any> }
}
