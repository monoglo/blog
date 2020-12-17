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
              <v-app-bar flat color="rgba(0, 0, 0, 0)" class="mt-6">
                <v-btn color="white" icon @click.stop="$router.go(-1)">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>

                <v-toolbar-title class="title white--text pl-0">
                  Article
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
              <v-card-title class="white--text mt-16">
                <p class="ml-3 font-weight-medium text-h4">
                  {{ article.title }}
                </p>
              </v-card-title>
            </v-parallax>
            <v-card-subtitle>
              上次编辑于 {{ moment.utc(article.lastEditTime).fromNow() }} |
              创建于{{ moment.utc(article.createTime).local().format('lll') }}
            </v-card-subtitle>
            <v-divider></v-divider>
            <v-card-text>
              <p
                v-for="paragraph in article.paragraph"
                v-bind:key="paragraph"
                class="text-body-1"
                style="white-space: pre-line"
              >
                {{ paragraph }}
              </p>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-subtitle>
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
              </v-chip>
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import * as moment from 'moment'
moment.locale('zh-cn')

export default {
  data() {
    return {
      article: {
        title: null,
        text: null,
        paragraph: []
      },
      tags: [],
      readMark: true,
      readTime: 60000
    }
  },
  mounted() {
    this.getArticleInfo()
    this.getArticleTags()
    this.$vuetify.goTo(0)
  },
  methods: {
    getArticleInfo() {
      this.$axios
        .get('api/articles/aid/' + this.$route.params.aid)
        .then(response => {
          // console.info(response.data.data)
          this.article = response.data.data
          this.article.paragraph = this.article.text.split('\n\n')
          this.readTime = this.article.text.length / 400
          // console.info(this.readTime * 60000)
          setTimeout(this.read, this.readTime * 60000)
        })
    },
    getArticleTags() {
      this.$axios
        .get('api/tags/aid/' + this.$route.params.aid)
        .then(response => {
          // console.info(response.data)
          if (response.data.code === 200) {
            this.tags = response.data.data
            // console.info(this.tags)
          }
        })
    },
    read() {
      if (this.readMark && this.$route.params.aid !== undefined) {
        this.readMark = !this.readMark
        this.$axios
          .post('api/articles/aid/' + this.$route.params.aid + '/read')
          .then(response => {
            console.info('read finished')
          })
      }
    }
  }
}
</script>

<style></style>
