<template>
  <header class="sticky top-0 z-10 rounded-[10px] bg-gray-200 mb-2">
    <nav class="flex items-center justify-between p-4 px-5">
      <div>
        <a href="#" class="text-2xl font-[700] text-black">Assignment</a>
      </div>
      <div class="flex items-center gap-5">
        <a href="#" class="px-3 py-2 text-black font-[500]">Home</a>
        <a href="#" class="px-3 py-2 text-black font-[500]">Person List</a>
        <button
          type="button"
          @click="emit('createUser', 'visible')"
          class="px-3 py-2 text-white bg-blue-600 font-[500] rounded-[5px] cursor-pointer"
        >
          Add Person
        </button>
      </div>
    </nav>
  </header>
</template>
<script lang="ts" setup>
import { defineEmits } from "vue";
const emit = defineEmits(["createUser"]);
</script>
