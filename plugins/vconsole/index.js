import Vue from 'vue'
import _ from 'lodash'
import ConsoleLines from './ConsoleLines.vue'

Vue.component('ConsoleLines', ConsoleLines)

export default function vConsolePlugin (ctx, inject) {
  const store = ctx.store

  store.registerModule('vconsole', {
    namespaced: true,
    state: () => ({
      logs: []
    }),
    getters: {
      orderedLogs (state) {
        return _.orderBy(state.logs, ['date'], ['desc'])
      },
      logsFiltered: (state, getters) => (level) => {
        return getters.orderedLogs.filter(a => a.level === level)
      }
    },
    mutations: {
      message (state, { messTxt, level, color }) {
        state.logs.push(createMessage(messTxt, level, color))
      },
      clear (state) {
        state.logs = []
      }
    }
  })

  const log = (msg, level, color) => {
    store.commit('vconsole/message', { messTxt: msg, level, color })
  }

  const logFactory = (level, color) => msg => log(msg, level, color)

  inject('vconsole', {
    log: logFactory(),
    info: logFactory('info', 'blue'),
    error: logFactory('error', 'red'),
    warn: logFactory('warn', 'red'),
    clear () {
      store.commit('vconsole/clear')
    }
  })
}

const createMessage = (messTxt, level = 'info', color = 'blue') => {
  return {
    msg: messTxt,
    level,
    date: Date.now(),
    color
  }
}
