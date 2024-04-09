// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@formkit/auto-animate/nuxt',
    'nuxt-icon',
    '@nuxtjs/supabase',
  ],
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  }
});
