<template>
    <v-content>
        <v-container>
            <h2>¡Bienvenid@!</h2>
            <br />
            <v-carousel delimiter-icon="mdi-minus">
                <v-carousel-item v-for="color in colors" :key="color">
                    <v-sheet :color="color" height="100%" tile>
                        <v-row class="fill-height" align="center" justify="center">
                            <div class="text-h2">
                                {{ color }}
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
    data: () => ({
        colors: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', '#7f00ff'],
    }),
};
</script>