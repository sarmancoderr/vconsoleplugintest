<template>
  <v-card elevation="0">
    <v-card-title>
      <v-toolbar elevation="0">
        <v-toolbar-title>
          Pagina de inicio
        </v-toolbar-title>
        <v-spacer />
        <v-btn elevation="0" color="primary" dark @click="addLog()">
          Add log
        </v-btn>
        <v-btn elevation="0" color="orange" dark @click="addLog('Advertencia', 'warn')">
          Add warning
        </v-btn>
        <v-btn elevation="0" color="error" dark @click="addLog('Hubo un error!', 'error')">
          Add error
        </v-btn>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <ConsoleLines :styles-to-container="'position: fixed; bottom: 0px; right: 0px; left: 0px; z-index: 20000;'" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'IndexPage',
  methods: {
    addLog (msg = 'Añadiendo mensaje (plugin)', level = 'log') {
      this.$vconsole[level](msg)
    }
  }
}
</script>
