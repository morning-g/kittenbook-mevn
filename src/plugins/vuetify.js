// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

const opts = {
    theme: {
        themes: {
            dark: {
                primary: '#e20074',
                secondary: '#6c757d',
                accent: '#3ea2fb',
                error: '#dc3545',
                petrol: '#17a499',
                background: '#673ab7',
            }
        },
        options: {
            customProperties: true
        },
    },
}

export default new Vuetify(opts)
