<template>
  <keep-alive>
    <div class="pa-1">
      <v-container>
        <v-row dense>
          <v-col cols="9">
            <!-- <v-row dense v-for="article in article_list" :key="article.aid">
                  <v-col cols="12"> -->
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
                <v-divider vertical class="mx-2"></v-divider>
              </v-col>
              <v-col cols="11">
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
      article_list: {}
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
      })
    }
  }
}
</script>
