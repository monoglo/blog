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
                    <v-list-item
                      dese
                      :disabled="!$store.state.isLogin"
                      @click.stop="createTagForm = true"
                    >
                      <v-list-item-icon
                        ><v-icon>mdi-tag-plus</v-icon></v-list-item-icon
                      >
                      <v-list-item-content>添加标签</v-list-item-content>
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
              <template v-if="loading">
                <v-skeleton-loader
                  v-for="i in (0, 7)"
                  v-bind:key="i"
                  class="ma-2 d-inline-block"
                  type="button"
                ></v-skeleton-loader>
              </template>
              <v-btn
                v-for="tag in tags"
                v-bind:key="tag.tagId"
                class="ma-2 white--text"
                :color="tag.tagColor"
                @click.stop="$router.push({ path: '/tag/' + tag.tagId })"
              >
                <v-icon left> {{ tag.tagIcon }} </v-icon>
                {{ tag.tagName }}
                <v-avatar right size="24" :class="lightenColor(tag.tagColor)">
                  {{ tag.articleAmount }}
                </v-avatar>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog persistent v-model="createTagForm" max-width="500">
      <v-card>
        <v-toolbar color="indigo" dark flat>
          <v-toolbar-title>添加标签</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-card-text class="pa-5">
          <v-form>
            <v-text-field
              label="标签名"
              prepend-icon="mdi-tag-text"
              v-model="tagInfo.tagName"
            />
            <v-text-field
              label="标签图标"
              prepend-icon="mdi-emoticon"
              v-model="tagInfo.tagIcon"
            />
            <v-text-field
              label="标签颜色"
              prepend-icon="mdi-invert-colors"
              v-model="tagInfo.tagColor"
            />
          </v-form>
          预览
          <v-chip
            class="ma-2"
            :color="tagInfo.tagColor"
            label
            text-color="white"
          >
            <v-icon left> {{ tagInfo.tagIcon }} </v-icon>
            {{ tagInfo.tagName }}
          </v-chip>
          <v-chip
            class="ma-2"
            :color="darkenColor(tagInfo.tagColor)"
            label
            text-color="white"
          >
            <v-icon left> {{ tagInfo.tagIcon }} </v-icon>
            {{ tagInfo.tagName }}
          </v-chip>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="createTagForm = false">
            关闭
          </v-btn>
          <v-btn
            color="indigo white--text"
            v-on:click="createTag()"
            :loading="createLoading"
            >创建</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <message-bar
      :show.sync="messageBar"
      timeout="2000"
      :text="messageBarText"
    ></message-bar>
  </div>
</template>

<script>
import MessageBar from '@/components/MessageBar.vue'
export default {
  name: 'TagList',
  components: {
    'message-bar': MessageBar
  },
  data: () => ({
    tags: [],
    loading: true,
    createTagForm: false,
    createLoading: false,
    tagInfo: {
      tagName: '',
      tagIcon: '',
      tagColor: ''
    },
    messageBar: false,
    messageBarText: ''
  }),
  mounted() {
    this.getTags()
  },
  methods: {
    getTags() {
      this.$axios.get('api/tags/').then(response => {
        // console.info(response.data)
        if (response.data.code === 200) {
          this.tags = response.data.data
          // console.info(this.tags)
          this.loading = false
        }
      })
    },
    createTag() {
      this.createLoading = true
      this.$axios.post('api/tags/', this.tagInfo).then(response => {
        // console.info(response.data)
        if (response.data.code === 200) {
          this.createLoading = false
          this.showMessageBar('标签添加成功', 2000)
          this.createTagForm = false
          // console.info(response.data)
        }
      })
    },
    showMessageBar(message, timeout) {
      this.messageBarText = message
      this.messageBar = true
      setTimeout(() => { this.messageBar = false }, timeout)
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
.v-skeleton-loader__button
  width: 100px
</style>
