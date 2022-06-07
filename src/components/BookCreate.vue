<template>
    <v-content>
        <v-container>
            <v-row justify="center" align="center">
                <v-col cols="12" sm="4">
                    <br />
                    <h2>Agregar un nuevo libro</h2>
                    <br />
                    <v-form @submit="onSubmit" v-model="isFormValid">
                        <v-text-field prepend-icon="mdi-book" rounded dark clearable label="Nombre del libro" required
                            outlined v-model.trim="book.title" :rules="titleRules"></v-text-field>
                        <v-text-field prepend-icon="mdi-adjust" rounded dark clearable :counter="13" label="ISBN"
                            required outlined v-model.trim="book.isbn" :rules="isbnRules"></v-text-field>
                        <v-text-field prepend-icon="mdi-contacts" rounded dark clearable label="Autor" required outlined
                            v-model.trim="book.author" :rules="authorRules">
                        </v-text-field>
                        <v-textarea prepend-icon="mdi-star" rounded dark required clearable outlined name="input-5-4"
                            label="Descripción" height="90" v-model.trim="book.description" :rules="descriptionRules">
                        </v-textarea>
                        <v-text-field prepend-icon="mdi-copyright" rounded dark clearable label="Editorial" required
                            outlined v-model.trim="book.publisher" :rules="publisherRules">
                        </v-text-field>

                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :nudge-right="40"
                            transition="scale-transition" :return-value.sync="book.published_date" offset-y
                            min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field prepend-icon="mdi-calendar" rounded clearable dark required
                                    v-model="book.published_date" label="Fecha de publicación" v-bind="attrs" v-on="on"
                                    outlined :rules="published_dateRules">
                                </v-text-field>
                            </template>
                            <v-date-picker no-title scrollable dark v-model="book.published_date" @input="menu2 = false"
                                year-icon="mdi-calendar-blank" prev-icon="mdi-skip-previous" next-icon="mdi-skip-next"
                                color="deep-purple" elevation="15" show-current>
                                <v-spacer></v-spacer>
                                <v-btn dark text color="primary" @click="menu = false">
                                    Cancelar
                                </v-btn>
                                <v-btn dark text color="primary" @click="$refs.menu.save(book.published_date)">
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-menu>

                        <v-text-field prepend-icon="mdi-equalizer" rounded clearable dark label="Número en inventario"
                            required outlined v-model.trim="book.count" :rules="countRules" type="number">
                        </v-text-field>
                        <v-text-field prepend-icon="mdi-email" rounded clearable dark label="URL de Portada" required
                            outlined v-model.trim="book.image_url" :rules="image_urlRules">
                        </v-text-field>

                        <v-rating color="deep-purple" dark v-model.trim="rating"></v-rating>
                        <br />
                        <v-divider dark></v-divider>
                        <br />
                        <v-btn :disabled="!isFormValid" rounded color="deep-purple" block dark class="mr-4"
                            type="submit" variant="primary">
                            Crear
                        </v-btn>
                        <br />
                        <br />
                        <br />
                        <br />
                    </v-form>
                    <v-row justify="space-around">
                        <v-col cols="auto">
                            <v-dialog dark transition="dialog-top-transition" max-width="600" v-model="dialogCrear">
                                <template v-slot:default="dialog">
                                    <v-card>
                                        <v-toolbar color="deep-purple" dark>Aviso</v-toolbar>
                                        <v-card-text>
                                            <div class="text-h6 pa-12">Libro creado con éxito.</div>
                                        </v-card-text>
                                        <v-card-actions class="justify-end">
                                            <v-btn text @click="dialogCrear = false">Cerrar</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-dialog>
                        </v-col>
                    </v-row>
                    <v-row justify="space-around">
                        <v-col cols="auto">
                            <v-dialog dark transition="dialog-top-transition" max-width="600" v-model="dialogError">
                                <template v-slot:default="dialog">
                                    <v-card>
                                        <v-toolbar color="deep-purple" dark>Aviso</v-toolbar>
                                        <v-card-text>
                                            <div class="text-h6 pa-12">Ocurrió un error imprevisto.</div>
                                        </v-card-text>
                                        <v-card-actions class="justify-end">
                                            <v-btn text @click="dialogError = false">Cerrar</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-dialog>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-content>
</template>

<script>
import axios from 'axios'

export default {
    name: 'BookCreate',
    data() {
        return {
            book: {
                published_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            },
            isFormValid: false,
            rating: 0,
            menu: false,
            modal: false,
            menu2: false,
            isLogged: false,
            dialogCrear: false,
            dialogError: false,
            titleRules: [v => !!v || "Este campo es obligatorio."],
            isbnRules: [v => !!v || "Este campo es obligatorio.",
            v => (v && v.length == 13) || 'El ISBN consiste exactamente de 13 caracteres.',],
            authorRules: [v => !!v || "Este campo es obligatorio."],
            descriptionRules: [v => !!v || "Este campo es obligatorio."],
            publisherRules: [v => !!v || "Este campo es obligatorio."],
            published_dateRules: [v => !!v || "Este campo es obligatorio."],
            countRules: [v => !!v || "Este campo es obligatorio."],
            image_urlRules: [v => !!v || "Este campo es obligatorio.",
            v => new RegExp('(https?:\\/\\/.*\\.(?:png|jpg))').test(v) || "La URL debe ser una imagen válida."],
            starsRules: [v => !!v || "Este campo es obligatorio."],
        }
    },
    mounted() {
        this.isLogged = localStorage.getItem('authenticated')
        if (!this.isLogged) {
            this.$router.push('/login')
        }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault()
            this.book.count = Number(this.book.count)
            this.book.stars = Number(this.rating)
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
            axios.post(`http://kittenbook.software:3000/book/`, this.book)
                .then(response => {
                    this.dialogCrear = true
                })
                .catch(e => {
                    this.dialogError = true
                    this.errors.push(e)
                })
        },
    },
};
</script>