<template lang="">
  <div
    id="intro"
    class="flex flex-col items-center justify-center gap-5 py-[40px] bg-linear-to-r/decreasing from-indigo-200 to-blue-200 rounded-[10px] px-3"
  >
    <h1 class="lg:text-5xl md:text-3xl sm:text-2xl font-[700] text-black">
      Mangage People Easily
    </h1>
    <p class="text-black text-center">
      Find and manage effortlessly Tap on any name to view details ore use the
      search bar below to quickly find someone.
    </p>

    <form class="max-w-lg mx-auto" onsubmit="return false">
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Search</label
      >
      <div class="relative">
        <input
          type="search"
          v-model="searchValue"
          id="default-search"
          class="block w-full p-4 pe-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="search by user name"
          required
          name="default-search"
          list="users"
          @keydown.enter="submit()"
        />
        <datalist id="users">
          <option :value="name" v-for="(name, index) in list" :key="index" />
        </datalist>
        <div
          class="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
      </div>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps<{
  list: string[];
}>();
const emit = defineEmits(["search"]);
const searchValue = defineModel();
const submit = () => {
  console.log("🚀 ~ submit ~ searchValue.value:", searchValue.value);
  emit("search", searchValue.value);
};
</script>
<style lang=""></style>
