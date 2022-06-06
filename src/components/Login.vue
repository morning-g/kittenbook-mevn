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
                dismissible show>{{ error.message }}</v-alert>
            </div>
          </div>
          <v-form @submit="onSubmit">
            <v-text-field rounded dark id="username" v-model="username" v-model.trim="login.username"
              label="Nombre de usuario" type="username" required autofocus :error-messages="errors.email">
            </v-text-field>
            <v-text-field rounded dark id="password" v-model="password" v-model.trim="login.password" label="Contraseña"
              type="password" required :error-messages="errors.password"></v-text-field>
            <v-btn color="deep-purple" rounded dark type="submit" variant="primary">Ingresar</v-btn>
            <v-btn color="deep-purple" rounded dark type="button" variant="success" @click.stop="register()">Registrarse
            </v-btn>
          </v-form>
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
      errors: []
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      axios.post(`http://localhost:3000/api/auth/login/`, this.login)
        .then(response => {
          localStorage.setItem('jwtToken', response.data.token)
          // logged(login.username)
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
    // logged(username) {
    //   this.$emit('logged', username)
    // }
  }
}
</script>
