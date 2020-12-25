<template>
  <v-snackbar v-model="snackbar" :timeout="timeout" :color="color">
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
        关闭
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'MessageBar',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    timeout: {
      type: String,
      default: '2000'
    },
    color: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    snackbar: {
      get() { return this.show },
      set() {}
    }
  }
}
</script>

<style></style>
