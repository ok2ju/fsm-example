const FSM = (initialState, transitions) => {
  const subscriptions = []
  const triggeredSubs = {}

  const machine = {
    state: initialState,

    send(trigger) {
      const currentState = this.state
      const nextState = transitions[currentState] && transitions[currentState][trigger]
        ? transitions[currentState][trigger]
        : this.state

      if (nextState !== currentState) {
        this.state = nextState

        subscriptions.forEach((fn) => fn(this.state))

        if (triggeredSubs[trigger]) {
          triggeredSubs[trigger].forEach((fn) => fn(this.state))
        }
      }
    },

    subscribe(fn, trigger) {
      if (trigger) {
        triggeredSubs[trigger] = []
        triggeredSubs[trigger].push(fn)

        return
      }

      subscriptions.push(fn)
    }
  }

  return machine
}

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

machine.subscribe((state) => {
  console.log('on state change', state)
})

machine.subscribe((state) => {
  console.log('called on `request` trigger', state)
}, 'request')

console.log(machine.state) // loading, initial state
machine.send('respond')
console.log(machine.state) // ready
