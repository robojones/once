# once-promise

Create promises for events.

[![CircleCI](https://circleci.com/gh/robojones/once.svg?style=svg)](https://circleci.com/gh/robojones/once)

[![Test Coverage](https://api.codeclimate.com/v1/badges/eb25331c1c82047fc8ad/test_coverage)](https://codeclimate.com/github/robojones/once/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/eb25331c1c82047fc8ad/maintainability)](https://codeclimate.com/github/robojones/once/maintainability)

## Contents

1. [Usage examples](#usage-examples)
2. [JavaScript example](#javascript-example)
3. [TypeScript example](#typescript-example)
4. [Docs](#docs)

## Usage examples

### Await the "exit" event of the process

```javascript
await once(process, 'exit')
```

_This will await the "exit" event of the nodejs process._

### Multiple events

```javascript
await once(readable, ['error', 'end'])
```

_In this example we are awaiting the "error" or "end" event of a readable stream. If the stream emits the "end" event, the promise will get resolved. If an "error" gets emitted first, the promise gets rejected to the error._

## JavaScript example

```javascript
const once = require('once-promise').default
const { EventEmitter } = require('events')

async function example () {
  const emitter = new EventEmitter()

  setTimeout(() => {
    emitter.emit('continue')
  }, 5000)

  console.log('start')

  // Create and await a promise for the "continue" event.
  // It should take 5s until the promise gets resolved.
  await once(emitter, 'continue')

  console.log('end :D')
}

example()
```

## TypeScript example

```typescript
import EventEmitter from 'events'
import once from 'once-promise'

async function example () {
  const emitter = new EventEmitter()


  setTimeout(() => {
    emitter.emit('continue')
  }, 5000)

  console.log('start')

  // Create and await a promise for the "continue" event.
  // It should take 5s until the promise gets resolved.
  await once(emitter, 'continue')

  console.log('end :D')
}

example()
```

## Docs

### once(emitter, event, arrayMode)
1. emitter `<internal.EventEmitter>` - This can be any EventEmitter (e.g. the `process` object, a stream,...)
2. event `<string|Array<string|Promise<any>>>` - Either one eventname or an array containing the names of multiple events. The array can also contain promises (e.g. from other events). If an array is passed, the returned promise will resolve to the first promise/event that gets resolved.
3. arrayMode? `<true>` - If you pass true as last parameter, the promise will resolve to an array containing all arguments provided by the (fastest) event. This can be useful if an event emits multiple values.

__Note:__ When you are listening for an `"error"` event and the event gets emittet, the promise gets rejected instead of resolved.
