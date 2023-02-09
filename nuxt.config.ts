// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    buildModules: [
        '@nuxtjs/style-resources'
    ],
    styleResources: {
        scss: [
            '@/assets/scss/app.scss',
            '@/assets/scss/mixins.scss',
        ],
        hoistUseStatements:  true,
    },
})
