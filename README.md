# Finite State Machine example

- Loading -> trigger:Respond -> Ready
- Ready -> trigger:Request -> Loading

```js
// States: loading, ready
// Triggers: request, respond
const machine = FSM('loading', {
  loading: {
    respond: 'ready'
  },
  ready: {
    request: 'loading'
  }
})

// General subscribers
machine.subscribe((state) => {
  console.log('on state change', state)
})

// Subscribers by specific trigger
machine.subscribe((state) => {
  console.log('called on `request` trigger', state)
}, 'request')

machine.state // loading, initial state
machine.send('respond')
machine.state // ready
```
