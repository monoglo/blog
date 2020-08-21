<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    {{ $store.state.count }}
    <button @click="addCount()">Add count</button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
  data: () => ({}),
  created() {
    console.info(this.$store.state.count)
  },
  methods: {
    addCount() {
      this.$store.commit('addCount')
    }
  }
}
</script>
