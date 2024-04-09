// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@vueuse/nuxt', '@formkit/auto-animate/nuxt', '@nuxtjs/robots', 'nuxt-primevue'],
  tailwindcss: {
    // Options
  },
  robots: {
    // Options
  },
  shadcn: {
    prefix: 'U',
    componentDir: './components'
  }
});
