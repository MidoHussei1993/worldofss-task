<template>
  <div class="container mx-auto pt-2">
    <shell-Header @createUser="showCreateModal = true" />
    <Intro
      v-model="searchValue"
      @search="filterUsersList()"
      :list="
        usersList.length
          ? usersList.map(
              ({ first_name, last_name }) => first_name + ' ' + last_name
            )
          : []
      "
    />
    <div class="flex flex-col items-start justify-center gap-5 p-4">
      <h2 class="text-2xl font-[700] text-black">Mangage People Easily</h2>
      <p class="text-black">
        To vview more people, click <strong>View More</strong>
      </p>
      <button
        v-if="usersListfilterd.length"
        type="button"
        class="text-blue-600"
        @click="
          usersListfilterd = [];
          searchValue = '';
        "
      >
        reset search
      </button>
      <div
        id="users"
        class="grid grid-cols-1 gap-[18px] md:grid-cols-2 lg:grid-cols-3 w-full"
        v-if="usersList.length"
      >
        <template v-if="usersListfilterd.length">
          <User-Card
            :name="first_name + ' ' + last_name"
            :avatar="avatar"
            :email="email"
            :age="age"
            :country="country"
            v-for="(
              { id, avatar, email, first_name, last_name, age, country }, index
            ) in usersListfilterd"
            :key="id"
          />
        </template>
        <template v-else>
          <User-Card
            @edit="
              currentEditUser = {
                id,
                avatar,
                email,
                first_name,
                last_name,
                age,
                country,
              };
              showEditModal = true;
            "
            :name="first_name + ' ' + last_name"
            :avatar="avatar"
            :email="email"
            :age="age"
            :country="country"
            v-for="(
              { id, avatar, email, first_name, last_name, age, country }, index
            ) in usersList"
            :key="id"
          />
        </template>
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
    <Create-User
      :visible="showCreateModal"
      @created="usersList.push($event)"
      @closeModal="showCreateModal = false"
    />
    <Edit-User
      :visible="showEditModal"
      :first_name="currentEditUser.first_name"
      :last_name="currentEditUser.last_name"
      :email="currentEditUser.email"
      :avatar="currentEditUser.avatar"
      :id="currentEditUser.id"
      :country="generateRandomCountry()"
      @edited="editUser($event)"
      @closeModal="showEditModal = false"
    />
  </div>
</template>
<script setup lang="ts">
import type { IUser, IPagination } from "./types";

const countries = ["Egypt", "USA", "UK", "Canada", "Saudi Arabia"];
const showCreateModal = ref<boolean>(false);
const showEditModal = ref<boolean>(false);
const currentEditUser = ref<IUser>({} as IUser);
const searchValue = ref<string>("");
const busyLoadingUsers = ref<boolean>(false);
const usersList = ref<IUser[]>([]);
const usersListfilterd = ref<IUser[]>([]);
const pagination = ref<IPagination>({ page: 0 } as IPagination);
const { successMsg } = $toastService();

// function to filter users list
const filterUsersList = () => {
  if (!searchValue.value) return;
  const filteredUsers = usersList.value.filter(({ first_name, last_name }) =>
    (first_name + " " + last_name)
      .toLowerCase()
      .includes(searchValue.value.toLowerCase())
  );
  usersListfilterd.value = filteredUsers;
};
const generateRandomAge = () => Math.floor(Math.random() * 100);
const generateRandomCountry = () =>
  countries[Math.floor(Math.random() * countries.length)];
const getUsersList = async () => {
  if (pagination.value.page >= pagination.value.total_pages) return;
  try {
    busyLoadingUsers.value = true;
    const { data: response }: any = await useFetch(
      `https://reqres.in/api/users?page=${pagination.value.page + 1}`
    );
    console.log("🚀 ~ getUsersList ~ response:", response);
    const { data, ...paginationData } = response.value!;
    data.length &&
      usersList.value.push(
        ...data.map((user: IUser) => {
          user.country = generateRandomCountry();
          user.age = generateRandomAge();
          return user;
        })
      );
    pagination.value = paginationData;
  } catch (error) {
    console.error(error);
  } finally {
    busyLoadingUsers.value = false;
  }
};
const editUser = (user: IUser) => {
  console.log("🚀 ~ editUser ~ user:", user);
  const updatedUserIndex = usersList.value.findIndex(
    ({ id }) => id === user.id
  );
  usersList.value[updatedUserIndex] = {
    ...usersList.value[updatedUserIndex],
    ...user,
  };
  currentEditUser.value = {} as IUser;
  showEditModal.value = false;
  successMsg("User updated successfully");
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
