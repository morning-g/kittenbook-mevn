<template>
    <v-content>
        <v-container>
            <h2>{{ username === '' ? "¡Bienvenid@!" : "¡Bienvenid@, " + username + '!' }}</h2>
            <br />
            <v-carousel dark delimiter-icon="mdi-minus" show-arrows-on-hover hide-delimiter-background cycle interval="1000">
                <v-carousel-item v-for="(color, i) in colors" :key="color">
                    <v-sheet :color="color" height="100%" tile>
                        <v-row class="fill-height" align="center" justify="center">
                            <div class="text-h2">
                                {{ words[i] }}
                            </div>
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
            </v-carousel>
            <br />
            <br />
        </v-container>
    </v-content>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            carousel: 0,
            words: 'La compasión es la base de la moralidad.'.split(' '),
            colors: ['white', 'red', 'yellow', 'green', 'orange', 'indigo', 'cyan', 'purple'],
            username: '',
        }
    },
    created() {
        this.username = localStorage.getItem('username') === null ? '' : localStorage.getItem('username');
    },
};
</script>