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
                  Create Article
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
              >
              </tag-chip>
            </v-card-subtitle>
            <v-divider></v-divider>
            <v-card-text>
              <v-textarea
                outlined
                name="input-7-4"
                label="在此输入正文..."
                class="ms-5 me-2"
                height="300px"
                no-resize
                hide-details
                v-model="text"
              ></v-textarea>
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
  </div>
</template>

<script>
import TagChip from '@/components/TagChip.vue'
export default {
  components: {
    'tag-chip': TagChip
  },
  data() {
    return {
      title: '',
      tags: [],
      text: ''
    }
  },
  computed: {},
  mounted() {
    this.getAllTags()
  },
  methods: {
    submit() {
      this.$axios
        .post('api/articles/', {
          authorId: 1,
          title: this.title,
          text: this.text
        })
        .then(response => {
          console.info(response.data.data.aid)
          this.$axios
            .put(
              'api/articles/aid/' + response.data.data.aid + '/add/tags',
              this.selectedTags()
            )
            .then(response => {
              console.info(response)
            })
        })
      // console.info('submit')
      // console.info(this.selectedTags())
      // console.info(this.text)
    },
    getAllTags() {
      this.$axios.get('api/tags/').then(response => {
        if (response.status === 200) {
          this.tags = response.data.data
          this.tags.forEach(tag => {
            tag.selected = false
          })
          console.info(this.tags)
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
    }
  }
}
</script>

<style></style>
