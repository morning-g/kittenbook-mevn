<template>
  <v-content>
    <v-container>
      <h2>Inventario de Libros</h2>
      <br />
      <v-tabs v-model="tab" background-color="deep-purple accent-4" centered dark icons-and-text>
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-1">
          Tabla
          <v-icon>mdi-table</v-icon>
        </v-tab>

        <v-tab href="#tab-2">
          Cartas
          <v-icon>mdi-card</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items dark v-model="tab">

        <v-tab-item :key="1" :value="'tab-' + 1">
          <v-card dark flat elevation="5">
            <v-card-title>
              Libros en Stock
              <v-spacer></v-spacer>
              <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details>
              </v-text-field>
            </v-card-title>
            <v-data-table dark striped hover :search="search" :items="books" :headers="headers" :items-per-page="10"
              class="elevation-1">
              <template slot="actions" scope="row">
                <v-btn size="sm" @click.stop="details(row.item)">Details</v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>
        <v-tab-item :key="2" :value="'tab-' + 2">
          <br />



          <v-row no-gutters>
            <v-col cols="8" sm="1" md="4" v-for="book in books.slice(page == 1 ? 0 : page * page + page, page * 6)"
              :key="book._id">
              <v-container>
                <!-- cols="8" sm="1" md="4" -->
                <v-card dark ripple max-width="344" elevation="5" class="card-container">
                  <v-img :src="book.image_url" height="200px"></v-img>

                  <v-card-title>
                    {{ book.title }}
                  </v-card-title>

                  <v-card-subtitle align="left">
                    {{ book.author }}
                  </v-card-subtitle>

                  <v-card-subtitle align="center">
                    <h2>{{ book.count }}</h2>
                  </v-card-subtitle>

                  <v-rating color="deep-purple" readonly dark :value="book.stars"></v-rating>

                  <v-card-actions>
                    <v-btn rounded color="deep-purple lighten-2" width="85%"
                      @click="dialogoVenta(book._id, book.count)">
                      Venta
                    </v-btn>

                    <v-spacer></v-spacer>

                    <v-btn icon @click="show = !show">
                      <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                    </v-btn>
                  </v-card-actions>

                  <v-expand-transition>
                    <div v-show="show">
                      <v-divider></v-divider>

                      <v-card-text>
                        {{ book.description }}
                      </v-card-text>
                    </div>
                  </v-expand-transition>
                  <br />
                </v-card>
              </v-container>
            </v-col>
          </v-row>



          <br />
          <v-pagination v-model="page" :length="Math.ceil(books.length / 6)" circle></v-pagination>
          <br />
        </v-tab-item>
      </v-tabs-items>

      <v-row justify="space-around">
        <v-col cols="auto">
          <v-dialog dark transition="dialog-top-transition" max-width="600" v-model="dialogActualizar">
            <template v-slot:default="dialog">
              <v-card>
                <v-toolbar color="deep-purple" dark>Aviso</v-toolbar>
                <v-card-text>
                  <div class="text-h6 pa-12">Inventario actualizado con éxito.</div>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn text @click="dialogActualizar = false">Cerrar</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-col>
      </v-row>

      <v-row justify="space-around">
        <v-col cols="auto">
          <v-dialog dark transition="dialog-top-transition" max-width="600" v-model="dialogEliminar">
            <template v-slot:default="dialog">
              <v-card>
                <v-toolbar color="deep-purple" dark>Aviso</v-toolbar>
                <v-card-text>
                  <div class="text-h6 pa-12">Libro eliminado con éxito.</div>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn text @click="() => { dialogEliminar = false; dialogVenta = false }">Cerrar</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-col>
      </v-row>

      <v-dialog dark v-model="dialogVenta" max-width="500px">
        <v-container fill-height fluid>
          <v-row align="center" justify="center">
            <v-col>
              <v-card>
                <v-card-title>
                  Venta de libro
                </v-card-title>
                <v-row justify="center" align="center">
                  <v-col cols="12" sm="4">
                    <v-switch v-model="switch1" color="deep-purple" label="Tipo de venta"></v-switch>

                  </v-col>
                </v-row>

                <v-card-subtitle v-if="switch1">
                  Venta individual
                </v-card-subtitle>
                <v-card-subtitle v-if="!switch1">
                  Venta al por mayor
                </v-card-subtitle>

                <v-card-text>
                  <v-form v-model="isFormValid">
                    <v-text-field type="number" v-if="!switch1" label="Número de unidades" filled dense
                      v-model="diff_libro" :rules="ventasRules">
                    </v-text-field>
                    <v-btn :disabled="!isFormValid" rounded color="deep-purple" dark @click="venta()">
                      Venta realizada
                    </v-btn>
                    <v-btn rounded color="error" dark @click="eliminar()">
                      Eliminar del inventario
                    </v-btn>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="deep-purple" text @click="dialogVenta = false">
                    Cerrar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-dialog>

      <div v-if="errors && errors.length">
        <div v-for="error of errors">
          <v-alert v-model="alert" border="left" close-text="Close Alert" color="deep-purple accent-4" dark dismissible
            show>{{ error.message }}.</v-alert>
        </div>
      </div>
    </v-container>
  </v-content>
</template>

<script>

import axios from 'axios'
axios.defaults.withCredentials = true;

export default {
  name: 'BookList',
  data() {
    return {
      tab: null,
      page: 1,
      id_libro: 0,
      cnt_libro: 0,
      diff_libro: "1",
      isFormValid: false,
      ventas: 0,
      switch1: true,
      dialogVenta: false,
      dialogActualizar: false,
      dialogEliminar: false,
      search: '',
      isLogged: false,
      ventasRules: [v => !!v || "Este campo es obligatorio."],
      headers: [
        { text: 'Título', value: 'title' },
        { text: 'ISBN', value: 'isbn' },
        { text: 'Autor', value: 'author' },
        { text: 'Descripción', value: 'description' },
        { text: 'Editorial', value: 'publisher' },
        { text: 'Fecha de publicación', value: 'published_date' },
        { text: 'Unidades en inventario', value: 'count' },
        { text: 'Rating', value: 'stars' },
      ],
      books: [],
      show: false,
      errors: []
    }
  },
  created() {
    this.getAll()
    this.books.forEach(element => {
      shows[element._id] = false
    });
  },
  mounted() {
    this.isLogged = localStorage.getItem('authenticated')
    if (!this.isLogged) {
      this.$router.push('/login')
    }
  },
  methods: {
    getAll() {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
      axios.get(`http://kittenbook.software:3000/book`)
        .then(response => {
          this.books = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    details(book) {
      this.$router.push({
        name: 'ShowBook',
        params: { id: book._id }
      })
    },
    dialogoVenta(id, cnt) {
      this.dialogVenta = true
      this.id_libro = id
      this.cnt_libro = cnt
    },
    venta() {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
      axios.put(`http://kittenbook.software:3000/book/${this.id_libro}`, { count: this.cnt_libro - Number(this.diff_libro) })
        .then(response => {
          this.dialogActualizar = true
          this.cnt_libro = this.cnt_libro - Number(this.diff_libro)
          this.getAll()
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    eliminar() {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
      axios.delete(`http://kittenbook.software:3000/book/${this.id_libro}`)
        .then(response => {
          this.dialogEliminar = true
          this.getAll()
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
  }
}
</script>
