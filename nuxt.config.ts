// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import Aura from "@primeuix/themes/aura";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: false,
  app: {
    head: {
      title: "Task",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Task",
        },
      ],
      link: [
        { rel: "icon", href: "/favicon.ico" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap",
        },
      ],
      noscript: [{ textContent: "JavaScript is required" }],
    },
  },
  css: ["~/assets/scss/main.scss", "~/assets/scss/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["@primevue/nuxt-module"],
  build: { transpile: ["primevue"] },
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
    components: {
      exclude: ["form", "formField", "inputText", "button"],
    },
  },
});
