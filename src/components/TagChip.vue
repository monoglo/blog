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
    <v-avatar right :class="color + ' darken-1 white--text'"> {{ articleAmount }} </v-avatar>
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
    }
  }
}
</script>

<style></style>
