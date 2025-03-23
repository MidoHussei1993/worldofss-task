<template>
  <div
    class="flex items-center justify-start gap-4 p-4 border-b border-gray-400 rounded-[10px] w-full px-4 user-card"
  >
    <img
      :src="avatar ? avatar : 'https://reqres.in/img/faces/1-image.jpg'"
      alt="user Image"
      width="150"
      height="150"
      class="rounded-full border border-4 border-blue-300"
    />
    <div class="flex flex-col items-start justify-center gap-2">
      <h3 class="text-lg font-[700] text-black">{{ name }}</h3>
      <small class="text-gray-500">{{ email }}</small>
      <p class="text-black">
        <span class="font-semibold">Age:</span> {{ age }}
      </p>
      <span
        class="inline-block px-3 py-1 text-xs font-semibold text-black bg-gray-200 rounded-[7px] mt-1"
      >
        {{ country }}
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
import Dialog from "primevue/dialog";
const props = defineProps<{
  name: string;
  email: string;
  age: number;
  country: string;
  avatar: string;
}>();
</script>
<style>
.user-card {
  box-shadow: 0px 4px 0px #dfdede;
}
</style>
