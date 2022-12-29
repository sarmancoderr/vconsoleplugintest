<template>
  <v-sheet elevation="0" :style="stylesToContainer" class="vconsole">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header style="padding: 0px;">
          <v-toolbar dense elevation="0">
            <v-toolbar-title>Logs {{ orderedLogs.length }}</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-toolbar dense elevation="0">
            <v-tabs v-model="activeTab">
              <v-tab>Todo ({{ orderedLogs.length }})</v-tab>
              <v-tab>Info ({{ logsFiltered('info').length }})</v-tab>
              <v-tab>Warn ({{ logsFiltered('warn').length }})</v-tab>
              <v-tab>Error ({{ logsFiltered('error').length }})</v-tab>
            </v-tabs>
            <v-spacer />
            <v-btn small elevation="0" color="error" @click="$vconsole.clear()">
              Clear
            </v-btn>
          </v-toolbar>
          <v-list dense style="height: 400px; overflow: auto;">
            <v-list-item v-for="log in activeLogs" :key="log.date" style="max-height: 5px;">
              <v-list-item-avatar>
                <v-icon :color="levelsColors[log.level]">
                  {{ levelsIcons[log.level] }}
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-title>
                (<strong>{{ log.date | date }}</strong>) {{ log.msg }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

const positions = ['all', 'info', 'warn', 'error']

export default {
  filters: {
    date (tsmp) {
      const d = new Date(tsmp)
      return moment(d).format('YYYY/MM/DD HH:mm:ss')
    }
  },
  props: {
    stylesToContainer: {
      type: String,
      default: ''
    },
    dateFormat: {
      type: String,
      default: 'YYYY/MM/DD HH:mm:ss'
    },
    levelsColors: {
      type: Object,
      default: () => ({
        error: 'red',
        info: 'blue',
        warn: 'orange'
      })
    },
    levelsIcons: {
      type: Object,
      default: () => ({
        error: 'mdi-alert-circle',
        warn: 'mdi-alert',
        info: 'mdi-information'
      })
    }
  },
  data () {
    return {
      activeTab: 0
    }
  },
  computed: {
    ...mapGetters('vconsole', ['logsFiltered', 'orderedLogs']),
    activeLogs () {
      return positions[this.activeTab] === 'all' ? this.orderedLogs : this.logsFiltered(positions[this.activeTab])
    }
  }
}
</script>

<style>
.vconsole .v-expansion-panel-content__wrap {
  padding: 0px;
}
</style>
