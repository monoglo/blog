import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        background: colors.indigo.lighten5 // Not automatically applied
      },
      dark: {
        background: '#0D0221' // If not using lighten/darken, use base to return hex
      }
    }
  }
})
