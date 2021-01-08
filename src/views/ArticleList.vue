<template>
  <div class="pa-1">
    <v-container>
      <v-row dense>
        <v-col :cols="colWidth">
          <!-- <v-row dense v-for="article in article_list" :key="article.aid">
                  <v-col cols="12"> -->
          <template v-if="articelLoading">
            <v-skeleton-loader
              id="articleSkeleton"
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
              阅读 {{ article.clickAmount }}<br />
              {{ moment.utc(article.createTime).fromNow() }}
            </v-card-subtitle>

            <v-card-actions>
              <v-btn
                text
                @click.stop="$router.push({ path: '/article/' + article.aid })"
              >
                Read
              </v-btn>
            </v-card-actions>
          </v-card>
          <template>
            <!-- <div class="text-center"> -->
            <v-container>
              <v-row justify="center">
                <v-col cols="7">
                  <!-- <v-container class="max-width"> -->
                  <v-pagination
                    v-model="page"
                    :length="pageAmount"
                  ></v-pagination>
                  <!-- </v-container> -->
                </v-col>
              </v-row>
            </v-container>
            <!-- </div> -->
          </template>
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
            <v-col cols="11" class="d-none d-md-block d-lg-block">
              <v-card color="#385F73" dark class="mb-2">
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
              <template v-if="tagLoading">
                <v-skeleton-loader
                  id="tagSkeleton"
                  v-for="i in (0, 7)"
                  v-bind:key="i"
                  type="button"
                ></v-skeleton-loader>
              </template>
              <template v-else>
                <v-btn
                  v-for="tag in tags"
                  v-bind:key="tag.tagId"
                  class="mt-2 mr-2 white--text"
                  :color="tag.tagColor"
                  @click.stop="$router.push({ path: '/tag/' + tag.tagId })"
                >
                  <v-icon left> {{ tag.tagIcon }} </v-icon>
                  {{ tag.tagName }}
                  <v-avatar right size="24" :class="lightenColor(tag.tagColor)">
                    {{ tag.articleAmount }}
                  </v-avatar>
                </v-btn>
              </template>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import * as moment from 'moment'
moment.locale('zh-cn')

export default {
  name: 'ArticleList',
  components: {},
  data() {
    return {
      article_list: [],
      tags: {},
      articelLoading: true,
      tagLoading: true,
      page: 1,
      pageAmount: 1
    }
  },
  watch: {
    page: function (val, oldVal) {
      this.getArticleList()
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
    this.getArticleAmount()
    this.getArticleList()
    this.getTags()
  },
  methods: {
    getArticleAmount() {
      this.$axios
        .get('api/articles/visible/count')
        .then(response => {
          this.pageAmount = parseInt((response.data.data / 5) + 1)
        })
        .catch(() => {})
    },
    getArticleList() {
      this.articelLoading = true
      this.article_list = []
      this.$axios
        .get('api/articles/visible', {
          params: { page: this.page - 1, size: 5 }
        })
        .then(response => {
          // console.info(response.data.data)
          this.article_list = response.data.data
          this.articelLoading = false
        })
    },
    getTags() {
      this.$axios.get('api/tags/').then(response => {
        // console.info(response.data)
        if (response.data.code === 200) {
          this.tags = response.data.data
          // console.info(this.tags)
          this.tagLoading = false
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

<style lang="sass">
.v-skeleton-loader__heading
  margin: 16px 16px 8px 16px
.v-skeleton-loader__text
  margin: 0px 16px
#articleSkeleton > .v-skeleton-loader__button
  margin: 24px 0px 0px 16px
#tagSkeleton > .v-skeleton-loader__button
  margin: 10px 0px 0px 0px
  width: 100%
</style>
