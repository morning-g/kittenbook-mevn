<template>
  <v-content>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="4">
          <h2>Registro</h2>
          <br />
          <div v-if="errors && errors.length">
            <div v-for="error of errors">
              <v-alert v-model="alert" border="left" close-text="Close Alert" color="deep-purple accent-4" dark
                dismissible show>{{ "Ocurrió un error. Inténtelo de nuevo." }}</v-alert>
            </div>
          </div>
          <v-form @submit="onSubmit" v-model="isFormValid">
            <v-text-field rounded dark id="username" label="Nombre de usuario" type="username" required autofocus
              :error-messages="errors.email" v-model.trim="register.username" :rules="usernameRules"></v-text-field>
            <v-text-field rounded dark id="password" label="Contraseña" type="password" required
              :error-messages="errors.password" v-model.trim="register.password" :rules="passwordRules"></v-text-field>
            <v-btn rounded dark color="deep-purple" type="submit" variant="primary" :disabled="!isFormValid">Registrarse
            </v-btn>
            <v-btn rounded dark color="deep-purple" type="button" variant="success" @click="$router.go(-1)">Cancelar
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
axios.defaults.withCredentials = true;
const headers = {
  "Content-Type": "application/json",
};

export default {
  name: 'Register',
  data() {
    return {
      register: {},
      errors: [],
      isFormValid: false,
      usernameRules: [
        v => !!v || 'Este campo es obligatorio.',
        v => (v && v.length <= 15) || 'El nombre de usuario debe tener menos de 15 caracteres.'
      ],
      passwordRules: [
        v => !!v || 'Este campo es obligatorio.',
        v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número, un caracter especial, y debe constar de almenos 6 caracteres.',
      ],
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      axios.post(`http://kittenbook.software:3000/api/auth/register/`, this.register, { headers })
        .then(response => {
          alert("Registro exitoso. Por favor ingrese a su cuenta.")
          this.$router.push({
            name: 'Login'
          })
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
  }
}
</script>
