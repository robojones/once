import { EventEmitter } from 'events'
import { PromiseEmitter } from './PromiseEmitter'

export function initCache(emitter: EventEmitter): PromiseEmitter {
	const target = emitter as PromiseEmitter

	if (!target.__promises__) {
		target.__promises__ = {}
	}

	return target
}
