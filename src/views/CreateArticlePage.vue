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
              <v-card-title class="white--text mt-12">
                <v-text-field
                  label="标题"
                  dark
                  class="ml-3 font-weight-medium text-h5"
                ></v-text-field>
              </v-card-title>
            </v-parallax>
            <v-card-subtitle>
              <v-chip class="ma-2" close @click:close="chip1 = false">
                <v-icon left> mdi-label </v-icon>
                Closable
              </v-chip>

              <v-chip
                class="ma-2"
                close
                color="red"
                text-color="white"
                @click:close="chip2 = false"
              >
                Remove
              </v-chip>

              <v-chip
                class="ma-2"
                close
                color="green"
                outlined
                @click:close="chip3 = false"
              >
                Success
              </v-chip>

              <v-chip
                class="ma-2"
                close
                color="orange"
                label
                outlined
                @click:close="chip4 = false"
              >
                Complete
              </v-chip>
              <tag-chip
                color="orange darken-3"
                :selected.sync="labelSelected"
                icon="mdi-language-java"
                text="Java"
              >
              </tag-chip>
              <tag-chip
                color="yellow darken-1"
                :selected.sync="labelSelected"
                icon="mdi-language-javascript"
                text="javascript"
              >
              </tag-chip>
              <tag-chip
                color="cyan accent-3"
                :selected.sync="labelSelected"
                icon="mdi-language-go"
                text="go"
              >
              </tag-chip>
              <v-menu bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-tag-plus</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <template v-for="item in categories">
                    <v-list-item
                      v-if="!selected.includes(item)"
                      :key="item.text"
                      :disabled="loading"
                      @click="selected.push(item)"
                    >
                      <v-list-item-avatar>
                        <v-icon :disabled="loading" v-text="item.icon"></v-icon>
                      </v-list-item-avatar>
                      <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item>
                  </template>
                </v-list>
              </v-menu>
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
      items: [
        {
          text: 'Nature',
          icon: 'mdi-nature'
        },
        {
          text: 'Nightlife',
          icon: 'mdi-glass-wine'
        },
        {
          text: 'November',
          icon: 'mdi-calendar-range'
        },
        {
          text: 'Portland',
          icon: 'mdi-map-marker'
        },
        {
          text: 'Biking',
          icon: 'mdi-bike'
        }
      ],
      loading: false,
      search: '',
      selected: [],
      labelSelected: false
    }
  },
  computed: {
    allSelected() {
      return this.selected.length === this.items.length
    },
    categories() {
      const search = this.search.toLowerCase()

      if (!search) return this.items

      return this.items.filter(item => {
        const text = item.text.toLowerCase()

        return text.indexOf(search) > -1
      })
    },
    selections() {
      const selections = []

      for (const selection of this.selected) {
        selections.push(selection)
      }

      return selections
    }
  },
  methods: {
    submit() {
      console.info('submit')
    }
  }
}
</script>

<style></style>
