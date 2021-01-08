<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card outlined elevation="18">
            <v-parallax
              height="200"
              src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
            >
              <v-app-bar flat color="rgba(0, 0, 0, 0)" class="mt-6">
                <v-btn color="white" icon @click.stop="$router.go(-1)">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>

                <v-toolbar-title class="title white--text pl-0">
                  Edit Article
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
              <v-card-title class="white--text mt-12">
                <v-text-field
                  label="标题"
                  dark
                  class="ml-3 font-weight-medium text-h5"
                  v-model="title"
                ></v-text-field>
              </v-card-title>
            </v-parallax>
            <v-card-subtitle>
              <tag-chip
                v-for="tag in tags"
                v-bind:key="tag.tagId"
                :color="tag.tagColor"
                :selected.sync="tag.selected"
                :icon="tag.tagIcon"
                :text="tag.tagName"
                :articleAmount="tag.articleAmount"
              >
              </tag-chip>
            </v-card-subtitle>
            <v-divider></v-divider>
            <v-card-text>
              <!-- <v-textarea
                outlined
                name="input-7-4"
                label="在此输入正文..."
                class="ms-5 me-2"
                height="300px"
                no-resize
                hide-details
                v-model="text"
              ></v-textarea> -->
              <mavon-editor
                id="mavonEditor"
                :style="[{ 'backgroundColor': $vuetify.theme.dark ? '#1e1e1e' : '#ffffff', color: $vuetify.theme.dark ? '#ffffff' : '#24292e'}]"
                placeholder="在此输入正文..."
                v-model="text"
                :editorBackground="$vuetify.theme.dark ? '#1e1e1e' : '#ffffff'"
                :previewBackground="$vuetify.theme.dark ? '#1e1e1e' : '#ffffff'"
                :toolbarsBackground="
                  $vuetify.theme.dark ? '#1e1e1e' : '#ffffff'
                "
              ></mavon-editor>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" depressed @click="submit" class="ms-7">
                提交
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <message-bar
      :show.sync="messageBar"
      timeout="2000"
      :text="messageBarText"
    ></message-bar>
  </div>
</template>

<script>
import MessageBar from '@/components/MessageBar.vue'
import TagChip from '@/components/TagChip.vue'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'EditArticlePage',
  components: {
    'tag-chip': TagChip,
    'mavon-editor': mavonEditor,
    'message-bar': MessageBar
  },
  watch: {
    '$vuetify.theme.dark': (dark) => {
      document.querySelector('textarea').style.color = dark ? '#ffffff' : '#24292e'
    }
  },
  data() {
    return {
      article: {},
      title: '',
      tags: [],
      text: '',
      messageBar: false,
      messageBarText: ''
    }
  },
  computed: {},
  mounted() {
    this.getArticleInfo()
    document.querySelector('textarea').style.color = this.$vuetify.theme.dark ? '#ffffff' : '#24292e'
  },
  methods: {
    submit() {
      this.$axios
        .put('api/articles/', {
          aid: this.$route.params.aid,
          title: this.title,
          text: this.text
        })
        .then(response => {
          console.info(response.data.data.aid)
          this.$axios
            .put(
              'api/articles/aid/' + this.$route.params.aid + '/add/tags',
              this.selectedTags()
            )
            .then(response => {
              console.info(response)
              if (response.data.code === 200) {
                this.showMessageBar('修改成功', 2000)
              }
            })
        })
        .catch(error => {
          if (error) {
            this.showMessageBar('连接失败', 2000)
          }
        })
      // console.info('submit')
      // console.info(this.selectedTags())
      // console.info(this.text)
    },
    getArticleInfo() {
      this.$axios
        .get('api/articles/aid/' + this.$route.params.aid)
        .then(response => {
          // console.info(response.data.data)
          if (response.status === 200) {
            this.article = response.data.data
            this.title = this.article.title
            this.text = this.article.text
            this.$axios.get('api/tags/').then(response => {
              if (response.status === 200) {
                const tags = response.data.data
                tags.forEach(tag => {
                  tag.selected = false
                })
                console.info(tags)
                this.$axios
                  .get('api/tags/aid/' + this.$route.params.aid)
                  .then(response => {
                    // console.info(response.data)
                    if (response.data.code === 200) {
                      response.data.data.forEach(articleTag => {
                        tags.forEach(tag => {
                          if (articleTag.tagId === tag.tagId) {
                            tag.selected = true
                          }
                        })
                      })
                    }
                    this.tags = tags
                  })
              }
            })
          }
        })
    },
    selectedTags() {
      const selectedTags = []
      this.tags.forEach(tag => {
        if (tag.selected === true) {
          selectedTags.push(tag.tagId)
        }
      })
      return selectedTags
    },
    showMessageBar(message, timeout) {
      this.messageBarText = message
      this.messageBar = true
      setTimeout(() => {
        this.messageBar = false
      }, timeout)
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
</style>
