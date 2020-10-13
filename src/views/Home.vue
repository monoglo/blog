<template>
  <div class="pa-1">
    <v-container>
      <v-row dense>
        <v-col cols="9">
          <v-row dense>
            <v-col cols="12">
              <v-card color="#385F73" dark>
                <v-card-title class="headline">
                  Unlimited music now
                </v-card-title>

                <v-card-subtitle
                  >Listen to your favorite artists and albums whenever and
                  wherever, online and offline.</v-card-subtitle
                >

                <v-card-actions>
                  <v-btn text> Listen Now </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="12">
              <v-card color="#385F73" dark>
                <v-card-title class="headline">
                  Unlimited music now
                </v-card-title>

                <v-card-subtitle
                  >Listen to your favorite artists and albums whenever and
                  wherever, online and offline.</v-card-subtitle
                >

                <v-card-actions>
                  <v-btn text> Listen Now </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="12">
              <v-card color="#385F73" dark>
                <v-card-title class="headline">
                  Unlimited music now
                </v-card-title>

                <v-card-subtitle
                  >Listen to your favorite artists and albums whenever and
                  wherever, online and offline.</v-card-subtitle
                >

                <v-card-actions>
                  <v-btn text> Listen Now </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12">
              <v-card color="#385F73" dark>
                <v-card-title class="headline">
                  Unlimited music now
                </v-card-title>

                <v-card-subtitle
                  >Listen to your favorite artists and albums whenever and
                  wherever, online and offline.</v-card-subtitle
                >

                <v-card-actions>
                  <v-btn text> Listen Now </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12">
              <v-card color="#385F73" dark>
                <v-card-title class="headline">
                  Unlimited music now
                </v-card-title>

                <v-card-subtitle
                  >Listen to your favorite artists and albums whenever and
                  wherever, online and offline.</v-card-subtitle
                >

                <v-card-actions>
                  <v-btn text> Listen Now </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12">
              <v-card color="#385F73" dark>
                <v-card-title class="headline">
                  Unlimited music now
                </v-card-title>

                <v-card-subtitle
                  >Listen to your favorite artists and albums whenever and
                  wherever, online and offline.</v-card-subtitle
                >

                <v-card-actions>
                  <v-btn text> Listen Now </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12">
              <v-card color="#385F73" dark>
                <v-card-title class="headline">
                  Unlimited music now
                </v-card-title>

                <v-card-subtitle
                  >Listen to your favorite artists and albums whenever and
                  wherever, online and offline.</v-card-subtitle
                >

                <v-card-actions>
                  <v-btn text> Listen Now </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

        </v-col>

        <v-divider vertical class="mx-2"></v-divider>

        <v-col cols="2">
          <v-card color="#385F73" dark fixed>
            <v-card-title class="headline"> Unlimited music now </v-card-title>

            <v-card-subtitle
              >Listen to your favorite artists and albums whenever and wherever,
              online and offline.</v-card-subtitle
            >

            <v-card-actions>
              <v-btn text> Listen Now </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
