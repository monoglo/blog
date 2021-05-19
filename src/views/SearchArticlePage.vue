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
                  Search Results
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
                  搜索结果: {{ $route.query.keyword }}
                </p>
              </v-card-title>
            </v-parallax>
            <v-card-subtitle>
              发现
                  <strong>{{ article_list == null ? 0 : article_list.length }}</strong> 个接近的结果...
            </v-card-subtitle>
            <v-divider></v-divider>
            <v-card-text>
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
              <template v-else>
                <div v-for="article in article_list" :key="article.aid">
                  <article-card :article="article"></article-card>
                </div>
              </template>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ArticleCard from '@/components/ArticleCard.vue'
export default {
  name: 'SearchArticlePage',
  components: {
    'article-card': ArticleCard
  },
  data: () => ({
    tag: {},
    article_list: [],
    loading: true
  }),
  mounted() {
    this.getArticlesByKeyword()
  },
  methods: {
    getArticlesByKeyword() {
      this.$axios
        .get('api/articles/titleKey/' + this.$route.query.keyword)
        .then(response => {
          // console.info(response.data.data)
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
