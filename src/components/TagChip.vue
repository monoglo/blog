<template>
  <v-chip
    label
    class="ma-2"
    :color="color"
    :close="labelSelected"
    :outlined="!labelSelected"
    :text-color="labelSelected ? textColor : ''"
    @click="select()"
    @click:close="cancelSelect()"
  >
    <v-icon left> {{ icon }} </v-icon>
    {{ text }}
    <v-avatar right :class="lightenColor(color) + ' white--text'">
      {{ articleAmount }}
    </v-avatar>
  </v-chip>
</template>

<script>
export default {
  name: 'TagChip',
  props: {
    selected: Boolean,
    color: {
      type: String,
      default: 'pink'
    },
    textColor: {
      type: String,
      default: 'white'
    },
    icon: {
      type: String,
      default: 'mdi-label'
    },
    text: {
      type: String,
      default: ''
    },
    articleAmount: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    labelSelected: false
  }),
  mounted() {
    this.labelSelected = this.selected
  },
  methods: {
    select() {
      if (this.labelSelected === false) {
        this.labelSelected = true
        this.$emit('update:selected', true)
      }
    },
    cancelSelect() {
      this.labelSelected = false
      this.$emit('update:selected', false)
    },
    lightenColor(color) {
      color = String(color)
      if (color.indexOf('darken') !== -1 || color.indexOf('accent') !== -1) {
        return color.split(' ')[0]
      } else if (color.indexOf('lighten') !== -1) {
        return (
          color.slice(0, color.length - 1) +
          (Number(color.charAt(color.length - 1)) + 1)
        )
      } else {
        return color + ' lighten-1'
      }
    }
  }
}
</script>

<style></style>
