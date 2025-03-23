<template>
  <Dialog
    :closable="false"
    :visible="visible"
    modal
    class="text-black lg:w-[50%] md:w-[70%] sm:w-[90%]"
  >
    <h3 class="text-xl font-[700] text-center text-black">Edit Person</h3>
    <p class="text-center text-black">Basic Info</p>
    <form @submit.prevent="submitForm">
      <div class="flex flex-col gap-5">
        <div>
          <label class="text-black mb-4 text-[14px]">Name</label>
          <input
            v-model="form.first_name"
            type="text"
            class="border border-gray-300 p-2 rounded-md w-full text-black"
            placeholder="Enter name"
          />
          <span class="text-red-600" v-if="v$.first_name.$error"
            >field requird</span
          >
        </div>
        <div>
          <label class="text-black mb-4 text-[14px]">Name</label>
          <input
            v-model="form.last_name"
            type="text"
            class="border border-gray-300 p-2 rounded-md w-full text-black"
            placeholder="Enter name"
          />
          <span class="text-red-600" v-if="v$.last_name.$error"
            >field requird</span
          >
        </div>
        <div>
          <label class="text-black mb-4 text-[14px]">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="border border-gray-300 p-2 rounded-md w-full text-black"
            placeholder="Enter email"
          />
          <span v-if="v$.email.$error" class="text-red-600">
            {{ v$.email.required.$message || "Email is invalid" }}
          </span>
        </div>
        <div>
          <label class="text-black mb-4 text-[14px]">DOB</label>
          <input
            v-model="form.dob"
            type="date"
            class="border border-gray-300 p-2 rounded-md w-full text-black"
            placeholder="Enter DOB"
          />
          <span v-if="v$.dob.$error" class="text-red-600">
            {{ v$.dob.required.$message || "DOB is invalid" }}
          </span>
        </div>
        <div>
          <label class="text-black pb-4 text-[14px]">Country</label>
          <select
            name="country"
            v-model="form.country"
            id="country"
            placeholder="Select country"
            class="border border-gray-300 p-2 rounded-md w-full text-black"
          >
            <option value="" disabled>Select Country</option>
            <option
              v-for="country in countries"
              :key="country"
              :value="country"
              class="text-black"
            >
              {{ country }}
            </option>
          </select>
          <span v-if="v$.country.$error" class="text-red-600">
            {{ v$.country.required.$message || "select country" }}
          </span>
        </div>
      </div>

      <div class="flex justify-between mt-5">
        <button
          class="px-3 py-2 text-gray-600 bg-gray-100 hover:text-gray-200 hover:bg-gray-600 font-[500] rounded-[5px] cursor-pointer"
          type="button"
          @click="reset()"
        >
          home
        </button>
        <button
          class="px-3 py-2 text-green-600 bg-green-100 hover:text-green-200 hover:bg-green-600 font-[500] rounded-[5px] cursor-pointer"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  </Dialog>
</template>

<script lang="ts" setup>
import { required, email, minLength } from "@vuelidate/validators";
import { reactive, computed, defineProps, defineEmits } from "vue";
import { useVuelidate } from "@vuelidate/core";
import Dialog from "primevue/dialog";

const props = defineProps<{
  visible?: boolean;
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  id: number;
}>();
const form = reactive({
  first_name: "",
  last_name: "",
  email: "",
  dob: "",
  country: "",
});
watch(
  () => props.visible,
  (val) => {
    if (val) {
      form.first_name = props.first_name;
      form.last_name = props.last_name;
      form.email = props.email;
      form.country = props.country;
      form.dob = new Date().toISOString().split("T")[0];
    }
  }
);
const emit = defineEmits(["closeModal", "edited"]);
const countries = ["Egypt", "USA", "UK", "Canada", "Saudi Arabia"];
const rules = computed(() => ({
  first_name: { required },
  last_name: { required },
  email: {
    required,
    email,
  },
  dob: {
    required,
  },
  country: { required },
}));

// Use Vuelidate
const v$ = useVuelidate(rules, form);

// Submit function
const submitForm = async () => {
  v$.value.$validate();
  try {
    v$.value.$touch();
    if (!v$.value.$invalid) {
      const { first_name, last_name } = form;
      const res = await $fetch(`https://reqres.in/api/users/${props.id}`, {
        method: "PUT",
        body: { name: first_name + " " + last_name, job: "developer" },
        immediate: false, // Prevents auto-execution
      });
      emit("edited", { id: props.id, ...form });
    }
  } catch (error) {
    console.error(error);
  }
};
const reset = () => {
  form.first_name = props.first_name;
  form.last_name = props.last_name;
  form.email = props.email;
  form.dob = "";
  form.country = props.country;
  emit("closeModal", false);
};
</script>

<style>
.user-card {
  box-shadow: 0px 4px 0px #dfdede;
}
.p-dialog {
  background: white;
}
.p-dialog-title {
  color: black;
}
input {
  color-scheme: dark;
}
input::placeholder {
  color: #ccc;
}
</style>
