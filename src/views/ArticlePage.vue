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
                <v-btn color="white" icon @click.stop="$router.go(-1)">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>

                <v-toolbar-title class="title white--text pl-0">
                  Article
                </v-toolbar-title>
                <v-spacer></v-spacer>

                <v-menu left transition="scroll-y-transition">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" color="white">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-card class="mx-auto" max-width="400" tile>
                    <v-list>
                      <v-list-item
                        dese
                        :disabled="!$store.state.isLogin"
                        @click.stop="
                          $router.push({
                            path: '/article/' + article.aid + '/edit'
                          })
                        "
                      >
                        <v-list-item-icon
                          ><v-icon
                            >mdi-file-document-edit</v-icon
                          ></v-list-item-icon
                        >
                        <v-list-item-content>修改</v-list-item-content>
                      </v-list-item>
                      <v-list-item
                        dese
                        :disabled="!$store.state.isLogin"
                        @click="() => {}"
                      >
                        <v-list-item-icon
                          ><v-icon>mdi-eye-off</v-icon></v-list-item-icon
                        >
                        <v-list-item-content>隐藏</v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-menu>
              </v-app-bar>
              <v-card-title>
                <p class="ml-3 font-weight-medium text-h4 white--text">
                  <v-skeleton-loader
                    class="ml-3"
                    width="200px"
                    type="heading"
                    v-if="articleLoading"
                  ></v-skeleton-loader>
                  {{ article.title }}
                </p>
              </v-card-title>
            </v-parallax>
            <v-card-subtitle>
              上次编辑于 {{ moment.utc(article.lastEditTime).fromNow() }} |
              创建于{{ moment.utc(article.createTime).local().format('lll') }}
            </v-card-subtitle>
            <v-divider></v-divider>
            <v-card-text v-if="articleLoading">
              <template>
                <v-skeleton-loader
                  type="paragraph"
                  class="mb-4"
                  v-for="i in (0, 4)"
                  v-bind:key="i"
                ></v-skeleton-loader>
              </template>
            </v-card-text>
            <!-- <p
                v-for="paragraph in article.paragraph"
                v-bind:key="paragraph"
                class="text-body-1"
                style="white-space: pre-line"
              >
                {{ paragraph }}
              </p> -->
            <mavon-editor
              v-else
              id="mavonEditor"
              :style="[{ color: $vuetify.theme.dark ? '#ffffff' : '#24292e' }]"
              :boxShadow="false"
              placeholder="在此输入正文..."
              v-model="article.text"
              :toolbarsFlag="Boolean(false)"
              :subfield="Boolean(false)"
              defaultOpen="preview"
              :previewBackground="$vuetify.theme.dark ? '#1e1e1e' : '#ffffff'"
              :toolbarsBackground="$vuetify.theme.dark ? '#1e1e1e' : '#ffffff'"
            ></mavon-editor>
            <template v-if="!noTags">
              <v-divider></v-divider>
              <v-card-subtitle>
                <template v-if="tagsLoading">
                  <v-skeleton-loader
                    v-for="i in (0, 5)"
                    v-bind:key="i"
                    class="ma-2 d-inline-block"
                    type="button"
                  ></v-skeleton-loader>
                </template>
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
            </template>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import * as moment from 'moment'
moment.locale('zh-cn')

export default {
  components: {
    'mavon-editor': mavonEditor
  },
  data() {
    return {
      article: {
        title: null,
        text: null,
        paragraph: []
      },
      tags: [],
      readMark: true,
      readTime: 60000,
      articleLoading: true,
      tagsLoading: true,
      noTags: false
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
          this.articleLoading = false
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
            this.tagsLoading = false
          } else {
            this.tagsLoading = false
            this.noTags = true
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

<style>
#mavonEditor {
  width: 100%;
  height: 100%;
  border: none;
  z-index: 0;
}
p {
  font-size: 1rem !important;
  font-weight: 400;
  line-height: 1.5rem;
  letter-spacing: 0.03125em !important;
  font-family: 'Roboto', sans-serif !important;
}
</style>
