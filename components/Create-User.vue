<template>
  <Dialog
    :closable="false"
    :visible="visible"
    modal
    class="text-black lg:w-[50%] md:w-[70%] sm:w-[90%]"
  >
    <h3 class="text-xl font-[700] text-center text-black">Create Person</h3>
    <p class="text-center text-black">Basic Info</p>
    <form @submit.prevent="submitForm">
      <div class="flex flex-col gap-5">
        <div>
          <label class="text-black mb-4 text-[14px]">Name</label>
          <input
            v-model="form.name"
            type="text"
            class="border border-gray-300 p-2 rounded-md w-full"
            placeholder="Enter name"
          />
          <span class="text-red-600" v-if="v$.name.$error">field requird</span>
        </div>
        <div>
          <label class="text-black mb-4 text-[14px]">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="border border-gray-300 p-2 rounded-md w-full"
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
            {{ v$.country.required.$message || "select Country" }}
          </span>
        </div>

        <div>
          <label class="text-black mb-4 text-[14px]">Avatar</label>
          <input
            type="file"
            @change="handleFileUpload"
            accept="image/jpeg,image/png"
            class="border border-gray-300 p-2 rounded-md w-full text-black"
          />
          <span class="text-red-600" v-if="v$.avatar.$error">
            {{
              v$.avatar.required.$message ||
              v$.avatar.validType.$message ||
              v$.avatar.validSize.$message
            }}
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

const { visible = false } = defineProps<{
  visible?: boolean;
}>();
const emit = defineEmits(["closeModal", "created"]);
const { successMsg } = $toastService();
const form = reactive({
  name: "",
  email: "",
  dob: "",
  avatar: "",
  country: "",
});

const countries = ["Egypt", "USA", "UK", "Canada", "Saudi Arabia"];
const allowedTypes = ["image/jpeg", "image/png"];
const maxFileSize = 2 * 1024 * 1024;

const fileRules = {
  required,
  validType: (file: File) =>
    !file || allowedTypes.includes(file.type) || "Invalid file type!",
  validSize: (file: File) =>
    !file || file.size <= maxFileSize || "File is too large (max 2MB)!",
};

const rules = computed(() => ({
  name: { required },
  email: {
    required,
    email,
  },
  dob: {
    required,
  },
  country: { required },
  avatar: {
    required: fileRules.required,
    validType: fileRules.validType,
    validSize: fileRules.validSize,
  },
}));

// Use Vuelidate
const v$ = useVuelidate(rules, form);
const handleFileUpload = (e) => {
  const file = e.target.files[0];
  form.avatar = file;
};

// Submit function
const submitForm = async () => {
  v$.value.$validate();
  try {
    v$.value.$touch();
    if (!v$.value.$invalid) {
      const { name } = form;
      const res = await $fetch("https://reqres.in/api/users", {
        method: "POST",
        body: { name, job: "developer" },
        immediate: false, // Prevents auto-execution
      });
      emit("closeModal");
      emit("created", {
        ...form,
        first_name: form.name.split(" ")[0],
        last_name: form.name.split(" ")[1],
        avatar: URL.createObjectURL(new Blob([form.avatar])),
      });
      successMsg("User created successfully");
    }
  } catch (error) {
    console.error(error);
  }
};
const reset = () => {
  form.name = "";
  form.email = "";
  form.dob = "";
  form.avatar = "";
  form.country = "";
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
