<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card outlined elevation="18">
            <v-responsive :aspect-ratio="16 / 6">
              <v-parallax style="height: 100%;" :src="backgroundImageUrl">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-app-bar
                      flat
                      color="rgba(0, 0, 0, 0)"
                      @click.stop="openNewTab(backgroundImageUrl)"
                      class="mt-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-btn color="white" icon @click.stop="$router.go(-1)">
                        <v-icon>mdi-arrow-left</v-icon>
                      </v-btn>

                      <v-toolbar-title class="title white--text pl-0">
                        Article
                      </v-toolbar-title>
                      <v-spacer></v-spacer>

                      <v-menu left bottom :close-on-content-click="false">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn icon v-bind="attrs" v-on="on" color="white">
                            <v-icon>mdi-dots-vertical</v-icon>
                          </v-btn>
                        </template>

                        <v-text-field
                          label="背景图链接"
                          dark
                          class="ml-3 font-weight-medium text-h5"
                          v-model="backgroundImageUrl"
                        ></v-text-field>
                        <v-text-field
                          label="背景图版权"
                          dark
                          class="ml-3 font-weight-medium text-h5"
                          v-model="backgroundImageCopyright"
                        ></v-text-field>
                      </v-menu>
                    </v-app-bar>
                  </template>
                  <span> {{ backgroundImageCopyright }} </span>
                </v-tooltip>
                <v-card-title style="cursor: auto;">
                  <v-text-field
                    label="标题"
                    dark
                    class="ml-3 font-weight-medium text-h5"
                    v-model="title"
                  ></v-text-field>
                </v-card-title>
              </v-parallax>
            </v-responsive>

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
                ref="md"
                id="mavonEditor"
                :style="[
                  {
                    backgroundColor: $vuetify.theme.dark
                      ? '#1e1e1e'
                      : '#ffffff',
                    color: $vuetify.theme.dark ? '#ffffff' : '#24292e'
                  }
                ]"
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
              <v-btn
                color="primary"
                :disabled="!$store.state.isLogin"
                depressed
                @click="submit"
                class="ms-7"
              >
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
  name: 'CreateArticlePage',
  components: {
    'tag-chip': TagChip,
    'mavon-editor': mavonEditor,
    'message-bar': MessageBar
  },
  watch: {
    '$vuetify.theme.dark': dark => {
      document.querySelector('textarea').style.color = dark
        ? '#ffffff'
        : '#24292e'
    }
  },
  data() {
    return {
      title: '',
      tags: [],
      text: '',
      messageBar: false,
      messageBarText: '',
      backgroundImageUrl: '',
      backgroundImageCopyright: ''
    }
  },
  computed: {},
  mounted() {
    this.getAllTags()
    this.getBingImageOfTheDay()
    document.querySelector('textarea').style.color = this.$vuetify.theme.dark
      ? '#ffffff'
      : '#24292e'
  },
  methods: {
    getBingImageOfTheDay() {
      this.$axios.get('https://api.no0a.cn/api/bing/0').then(response => {
        this.backgroundImageUrl = response.data.bing.url
        this.backgroundImageCopyright = response.data.bing.copyright
      })
    },
    submit() {
      this.$axios
        .post('api/articles/', {
          authorId: this.$store.state.loginUser.uid,
          title: this.title,
          text: this.text,
          backgroundImageUrl:
            this.backgroundImageUrl === '' ? null : this.backgroundImageUrl,
          backgroundImageCopyright:
            this.backgroundImageCopyright === ''
              ? null
              : this.backgroundImageCopyright
        })
        .then(response => {
          // console.info(response.data.data.aid)
          this.$axios
            .put(
              'api/articles/aid/' + response.data.data.aid + '/add/tags',
              this.selectedTags()
            )
            .then(response => {
              // console.info(response)
              if (response.data.code === 200) {
                this.showMessageBar('创建成功', 2000)
              }
            })
        })
      // console.info('submit')
      // console.info(this.selectedTags())
      // console.info(this.text)
    },
    // $imgAdd(pos, $file) {
    //   // 第一步.将图片上传到服务器.
    //   var formdata = new FormData()
    //   formdata.append('source', $file)
    //   formdata.append('type', 'file')
    //   formdata.append('timestamp', Date.now())
    //   formdata.append('nsfw', 0)
    //   this.$axios.defaults.withCredentials = true
    //   this.$axios({
    //     url: 'img/json',
    //     method: 'post',
    //     data: formdata,
    //     headers: {
    //     },
    //     credentials: 'same-origin',
    //     withCredentials: true
    //   })
    //     .then(url => {
    //       // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
    //       /**
    //        * $vm 指为mavonEditor实例，可以通过如下两种方式获取
    //        * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
    //        * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
    //        */
    //       console.info(url)
    //       this.$refs.md.$img2Url(pos, url)
    //     })
    //     .catch(error => {
    //       console.info(error)
    //     })
    // },
    getAllTags() {
      this.$axios.get('api/tags/').then(response => {
        if (response.status === 200) {
          this.tags = response.data.data
          this.tags.forEach(tag => {
            tag.selected = false
          })
          // console.info(this.tags)
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
.v-parallax__image {
  width: 100%;
  bottom: 313px;
}
</style>
