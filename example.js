const once = require('once-promise').default
const { EventEmitter } = require('events')

const emitter = new EventEmitter()


setTimeout(() => {
  emitter.emit('continue')
}, 5000)

console.log('start')

// create and await a promise for the "continue" event.
// It should take 5s until the promise gets resolved.
await once(emitter, 'continue')

console.log('end :D')
