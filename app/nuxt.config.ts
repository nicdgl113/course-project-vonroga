// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt', '@formkit/auto-animate/nuxt', '@nuxtjs/google-fonts'],
  tailwindcss: {
    // Options
  },
});
