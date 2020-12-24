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
                  Tag
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
                  标签: {{ tag.tagName }}
                </p>
                <v-chip
                  class="ml-3 mb-3"
                  :color="tag.tagColor"
                  label
                  text-color="white"
                >
                  <v-icon left> {{ tag.tagIcon }} </v-icon>
                  {{ tag.tagName }}
                  <v-avatar right :class="lightenColor(tag.tagColor)">
                    {{ tag.articleAmount }}
                  </v-avatar>
                </v-chip>
              </v-card-title>
            </v-parallax>
            <v-divider></v-divider>
            <v-card-text>
              <v-divider></v-divider>
              <template v-if="loading">
                <v-skeleton-loader
                  class="my-2"
                  elevation="2"
                  height="137px"
                  type="heading, text, button"
                  v-for="i in (0, 5)"
                  v-bind:key="i"
                ></v-skeleton-loader>
              </template>
              <v-card
                :color="darkenColor(tag.tagColor)"
                class="my-2"
                dark
                v-for="article in article_list"
                :key="article.aid"
              >
                <v-card-title class="headline">
                  {{ article.title }}
                </v-card-title>

                <v-card-subtitle>
                  阅读 {{ article.clickAmount }}
                </v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    text
                    @click.stop="
                      $router.push({ path: '/article/' + article.aid })
                    "
                  >
                    Read
                  </v-btn>
                </v-card-actions>
              </v-card>
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
    tag: {},
    article_list: [],
    loading: true
  }),
  mounted() {
    this.getTagByTagId()
  },
  methods: {
    getTagByTagId() {
      this.$axios
        .get('api/tags/id/' + this.$route.params.tagId)
        .then(response => {
          // console.info(response.data)
          if (response.data.code === 200) {
            this.tag = response.data.data
            console.info(this.tag)
            this.getArticlesByTag()
          }
        })
    },
    getArticlesByTag() {
      this.$axios.get('api/articles/tag/' + this.tag.tagName).then(response => {
        console.info(response.data.data)
        this.article_list = response.data.data
        this.loading = false
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
    },
    darkenColor(color) {
      color = String(color)
      if (color.indexOf('lighten') !== -1) {
        return color.split(' ')[0]
      } else if (color.indexOf('darken') !== -1) {
        return (
          color.slice(0, color.length - 1) +
          (Number(color.charAt(color.length - 1)) + 1)
        )
      } else if (color.indexOf('accent') !== -1) {
        return color.split(' ')[0] + ' darken-1'
      } else {
        return color + ' darken-1'
      }
    }
  }
}
</script>

<style lang="sass">
.v-skeleton-loader__heading
  margin: 16px 16px 8px 16px
.v-skeleton-loader__text
  margin: 0px 16px
.v-skeleton-loader__button
  margin: 24px 16px 16px 16px
</style>
