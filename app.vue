<template>
  <div class="container mx-auto pt-2">
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
            class="px-3 py-2 text-white bg-blue-600 font-[500] rounded-[5px] cursor-pointer"
          >
            Add Person
          </button>
        </div>
      </nav>
    </header>
    <div
      class="flex flex-col items-center justify-center gap-5 py-[40px] bg-linear-to-r/decreasing from-indigo-200 to-blue-200 rounded-[10px]"
    >
      <h1 class="lg:text-5xl md:text-3xl sm:text-2xl font-[700] text-black">
        Mangage People Easily
      </h1>
      <p class="text-black">
        Find and manage effortlessly Tap on any name to view details ore use the
        search bar below to quickly find someone.
      </p>

      <form class="max-w-md mx-auto">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >Search</label
        >
        <div class="relative">
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 pe-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            required
            name="default-search"
            list="users"
          />
          <datalist id="users">
            <option value="John Doe" />
            <option value="Jane Doe" />
            <option value="Alice" />
            <option value="Bob" />
            <option value="Charlie" />
            <option value="David" />
            <option value="Eve" />
            <option value="Frank" />
            <option value="Grace" />
            <option value="Hank" />
            <option value="Ivy" />
            <option value="Jack" />
            <option value="Kane" />
            <option value="Lily" />
            <option value="Mike" />
            <option value="Nancy" />
            <option value="Oscar" />
            <option value="Peter" />
            <option value="Quinn" />
            <option value="Rose" />
            <option value="Sam" />
            <option value="Tom" />
            <option value="Uma" />
            <option value="Vicky" />
            <option value="Wendy" />
            <option value="Xavier" />
            <option value="Yvonne" />
            <option value="Zack" />
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
    <div class="flex flex-col items-start justify-center gap-5 p-4">
      <h2 class="text-2xl font-[700] text-black">Mangage People Easily</h2>
      <p class="text-black">
        To vview more people, click <strong>View More</strong>
      </p>
      <div
        class="grid grid-cols-1 gap-[18px] md:grid-cols-2 lg:grid-cols-3 w-full"
        v-if="usersList.length"
      >
        <User-Card
          :name="first_name + last_name"
          :avatar="avatar"
          :email="email"
          :age="22"
          country="Egypt"
          v-memo="['first_name', 'last_name', 'avatar', 'email']"
          v-for="(
            { name, id, avatar, email, first_name, last_name }, index
          ) in usersList"
          :key="id"
        />
      </div>
    </div>
    <div
      class="flex justify-center"
      v-if="pagination && pagination.page < pagination.total_pages"
    >
      <button
        type="button"
        class="px-3 py-2 text-blue-600 bg-blue-100 hover:text-blue-200 hover:bg-blue-600 font-[500] rounded-[5px] cursor-pointer mt-3"
        @click="getUsersList"
      >
        Load More
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
export interface IUser {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}
interface IPagination {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

const search = ref("");
const users = ref([]);
const busyLoadingUsers = ref<boolean>(false);
const usersList = ref<IUser[]>([]);
const pagination = ref<IPagination>({} as IPagination);
// const { data, pending, error, refresh } = useFetch(
//   "https://reqres.in/api/users?page=1"
// );

// const filteredUsers = computed(() => {
//   return users.value.filter((user) =>
//     user.name.toLowerCase().includes(search.value.toLowerCase())
//   );
// });
const getUsersList = async () => {
  if (pagination.value.page >= pagination.value.total_pages) return;
  try {
    busyLoadingUsers.value = true;
    const { data: response }: { data: { data: IUser } } = await useFetch(
      `https://reqres.in/api/users?page=${pagination.value.page + 1}`
    );
    console.log("🚀 ~ getUsersList ~ response:", response);
    const { data, ...paginationData } = response.value;
    console.log("🚀 ~ getUsersList ~ data:", data);
    data.length && usersList.value.push(...data);
    pagination.value = paginationData;
    console.log("🚀 ~ getUsersList ~ pagination.value:", pagination.value);
    console.log("🚀 ~ getUsersList ~ usersList.value:", usersList.value);
  } catch (error) {
    console.error(error);
  } finally {
    busyLoadingUsers.value = false;
  }
};
onMounted(() => {
  getUsersList();
});
</script>
<style lang="scss">
html,
body {
  background-color: white;
}
</style>
