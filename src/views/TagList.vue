<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card outlined>
            <v-parallax
              height="200"
              src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
            >
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-btn icon @click.stop="$router.go(-1)" color="white">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>

                <v-toolbar-title class="title pl-0 white--text">
                  Tags
                </v-toolbar-title>
                <v-spacer></v-spacer>

                <v-menu left bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" color="white">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item v-for="n in 5" :key="n" @click="() => {}">
                      <v-list-item-title>Option {{ n }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-app-bar>

              <v-card-title>
                <p class="ml-3 font-weight-medium text-h4 white--text">
                  标签列表
                </p>
              </v-card-title>
            </v-parallax>
            <v-divider></v-divider>
            <v-card-text>
              <v-chip
                v-for="tag in tags"
                v-bind:key="tag.tagId"
                class="ma-2"
                :color="tag.tagColor"
                label
                text-color="white"
              >
                <v-icon left> {{ tag.tagIcon }} </v-icon>
                {{ tag.tagName }}
                <v-avatar right :class="lightenColor(tag.tagColor)"> {{ tag.articleAmount }} </v-avatar>
              </v-chip>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    tags: []
  }),
  mounted() {
    this.getArticleTags()
  },
  methods: {
    getArticleTags() {
      this.$axios.get('api/tags/').then(response => {
        // console.info(response.data)
        if (response.data.code === 200) {
          this.tags = response.data.data
          console.info(this.tags)
        }
      })
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
