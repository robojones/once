# once-promise

Create promises for events.

[![CircleCI](https://circleci.com/gh/robojones/once.svg?style=shield)](https://circleci.com/gh/robojones/once)
[![Test Coverage](https://codeclimate.com/github/robojones/once/badges/coverage.svg)](https://codeclimate.com/github/robojones/once/coverage)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

NPM:
```
npm install once-promise --save
```

## JS Example

```javascript
const once = require('once-promise').default
const { EventEmitter } = require('events')

async function example () {
  const emitter = new EventEmitter()
  
  setTimeout(() => {
    emitter.emit('continue')
  }, 5000)
  
  console.log('start')
  
  // create and await a promise for the "continue" event.
  // It should take 5s until the promise gets resolved.
  await once(emitter, 'continue')
  
  console.log('end :D')
}

example()
```

## TypeScript Example
```typescript
import EventEmitter from 'events'
import once from 'once-promise'

async function example () {
  const emitter = new EventEmitter()


  setTimeout(() => {
    emitter.emit('continue')
  }, 5000)

  console.log('start')

  // create and await a promise for the "continue" event.
  // It should take 5s until the promise gets resolved.
  await once(emitter, 'continue')

  console.log('end :D')
}

example()
```

## once(emitter, event, arrayMode)
1. emitter `<internal.EventEmitter>` - This can be any EventEmitter (e.g. the `process` object, a stream,...)
2. event `<string|Array<string|Promise<any>>>` - Either one eventname or an array containing the names of multiple events. The array can also contain promises (e.g. from other events). If an array is passed, the returned promise will resolve to the first promise/event that gets resolved.
3. arrayMode? `<true>` - If you pass true as last parameter, the promise will resolve to an array containing all arguments provided by the (fastest) event. This can be useful if an event emits multiple values.
