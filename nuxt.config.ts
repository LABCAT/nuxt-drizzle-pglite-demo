// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    remoteDatabaseUrl: '',
  },

  imports: {
    dirs: ['utils', 'models'],
  },

  vite: {
    optimizeDeps: {
      exclude: ['@electric-sql/pglite'],
    },
  },
})