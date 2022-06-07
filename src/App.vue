<template>
  <div id="app">
    <v-app dark :style="{background: $vuetify.theme.dark.background}">
      <v-app-bar app color="deep-purple" dark>
        <v-app-bar-nav-icon @click="drawer = !drawer"> </v-app-bar-nav-icon>
        <v-toolbar-title>Kittenbook</v-toolbar-title>
      </v-app-bar>
      <v-navigation-drawer app v-model="drawer" dark :src="require('./assets/backg.jpg')" temporary>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              <v-img :src="require('./assets/logo.png')" />
            </v-list-item-title>
            <v-list-item-subtitle>
              Menú principal
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list nav dense>
          <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
            <v-list-item @click="() => this.$router.push({ name: 'Welcome' })">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Inicio</v-list-item-title>
            </v-list-item>
            <v-list-item @click="() => this.$router.push({ name: 'BookList' })">
              <v-list-item-icon>
                <v-icon>mdi-apps</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Inventario</v-list-item-title>
            </v-list-item>
            <v-list-item @click="() => this.$router.push({ name: 'BookCreate' })">
              <v-list-item-icon>
                <v-icon>mdi-book</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Agregar Libro</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn rounded block @click="logout()" v-if="logged">
              Cerrar sesión
            </v-btn>
          </div>
          <div class="pa-2">
            <v-btn rounded block @click="$router.push({
              name: 'Login'
            })" v-if="!logged">
              Iniciar sesión
            </v-btn>
          </div>
          <div class="pa-2">
            <v-btn rounded block @click="$router.push({
              name: 'Register'
            })" v-if="!logged">
              Registrarse
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <v-parallax dark height="100%"
        src="https://movementmindfulnessandme.com/wp-content/uploads/2020/12/gradient-background-02.jpg">
        <router-view />
      </v-parallax>
      <v-footer color="deep-purple" dark>
        <v-row justify="center" class="my-4 text-center">
          <v-col cols="12">La compasión es la base de la moralidad.</v-col>
          <v-col cols="12">
            <v-btn href="https://www.github.com/morning-g/kittenbook-mevn/" target="_blank" text dark>
              <v-icon>mdi-github</v-icon>
            </v-btn>
            <v-btn href="https://www.jcarlos19.com/" target="_blank" text dark>
              <v-icon>mdi-link</v-icon>
            </v-btn>
            <v-btn href="http://www.itlalaguna.edu.mx/" target="_blank" text dark>
              <v-icon>mdi-school</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" class="align-center">&copy; 2022 Kittenbook</v-col>
        </v-row>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    logged: false,
  }),
  updated() {
    this.logged = localStorage.getItem('authenticated') === null ? false : true;
  },
  methods: {
    logout() {
      localStorage.removeItem('jwtToken')
      localStorage.removeItem('authenticated')
      localStorage.removeItem('username')
      this.$router.push({
        name: 'Login'
      })
    },
  },
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #673ab7;
}
</style>
