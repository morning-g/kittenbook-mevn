<template>
  <v-content>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="4">
          <h2>Ingresar</h2>
          <br />
          <div v-if="errors && errors.length">
            <div v-for="error of errors">
              <v-alert v-model="alert" border="left" close-text="Close Alert" color="deep-purple accent-4" dark
                dismissible show>{{ error.message }}.</v-alert>
            </div>
          </div>
          <v-form @submit="onSubmit" v-model="isFormValid">
            <v-text-field rounded dark v-model.trim="login.username" label="Nombre de usuario" type="username" required
              autofocus :error-messages="errors.email" :rules="usernameRules">
            </v-text-field>
            <v-text-field rounded dark v-model.trim="login.password" label="Contraseña" type="password" required
              :error-messages="errors.password" :rules="passwordRules"></v-text-field>
            <v-btn color="deep-purple" rounded dark type="submit" variant="primary" :disabled="!isFormValid">Ingresar</v-btn>
            <v-btn color="deep-purple" rounded dark type="button" variant="success" @click.stop="register()">Registrarse
            </v-btn>
          </v-form>
          <br />
          <br />
          <br />
          <br />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      login: {},
      errors: [],
      isFormValid: false,
      usernameRules: [
        v => !!v || 'Este campo es obligatorio.',
        v => (v && v.length <= 15) || 'El nombre de usuario debe tener menos de 15 caracteres.'
      ],
      passwordRules: [
        v => !!v || 'Este campo es obligatorio.',
      ],
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      axios.post(`http://localhost:3000/api/auth/login/`, this.login)
        .then(response => {
          localStorage.setItem('jwtToken', response.data.token)
          this.$emit('loggedUser', login.username)
          this.$router.push({
            name: 'BookList'
          })
        })
        .catch(e => {
          console.log(e)
          this.errors.push(e)
        })
    },
    register() {
      this.$router.push({
        name: 'Register'
      })
    },
  }
}
</script>
