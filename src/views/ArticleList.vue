<template>
  <keep-alive>
    <div class="pa-1">
      <v-container>
        <v-row dense>
          <v-col :cols="colWidth">
            <!-- <v-row dense v-for="article in article_list" :key="article.aid">
                  <v-col cols="12"> -->
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
              color="#385F73"
              class="my-2"
              dark
              v-for="article in article_list"
              :key="article.aid"
            >
              <v-card-title class="headline">
                {{ article.title }}
              </v-card-title>

              <v-card-subtitle>
                {{ article.authorName }}
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
            <!-- </v-col>
                </v-row> -->
          </v-col>

          <v-col cols="3">
            <v-row>
              <v-col cols="1">
                <v-divider
                  vertical
                  class="mx-2 d-none d-md-flex d-lg-flex"
                ></v-divider>
              </v-col>
              <v-col cols="11" class="d-none d-md-flex d-lg-flex">
                <v-card color="#385F73" dark>
                  <v-card-title class="headline">
                    Unlimited music now
                  </v-card-title>

                  <v-card-subtitle>
                    Listen to your favorite artists and albums whenever and
                    wherever, online and offline.
                  </v-card-subtitle>

                  <v-card-actions>
                    <v-btn text> Listen Now </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </keep-alive>
</template>

<script>
// @ is an alias to /src
import * as moment from 'moment'
moment.locale('zh-cn')

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      article_list: {},
      loading: true
    }
  },
  computed: {
    colWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 12
        case 'sm':
          return 12
        case 'md':
          return 9
        case 'lg':
          return 9
        case 'xl':
          return 9
      }
      return 9
    }
  },
  mounted() {
    // console.info(this.$store.state.count)
    this.getArticleList()
  },
  methods: {
    addCount() {
      this.$store.commit('addCount')
    },
    getArticleList() {
      this.$axios.get('api/articles/visible').then(response => {
        console.info(response.data.data)
        this.article_list = response.data.data
        this.loading = false
      })
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
