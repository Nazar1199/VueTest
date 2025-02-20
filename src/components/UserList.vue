<template>
  <div>
    <n-space vertical>
      <n-space horizontal style="align-items: center;">
        <h1>Учетные записи</h1>
        <n-button @click="addUser()"
                  type="error"
                  ghost
                  style="font-size: 24px;">
          <n-icon>
            <MdAdd />
          </n-icon>
        </n-button>
      </n-space>
      <n-alert title="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;" type="info" />
      <UserItem v-for="(user, index) in users" :key="user.id" :user="user" :first="index === 0"/>
    </n-space>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, computed } from 'vue';
  import { useUsersStore } from '../stores/userStore.ts'
  import { UserItem } from './components/UserItem.vue';
  import { MdAdd } from '@vicons/ionicons4';
  import { UserType } from '../classes/UserType.ts';
  import { User } from '../classes/User.ts';
  import { NSpace } from 'naive-ui'

  export default defineComponent({
    components: {
      MdAdd
    },
    setup() {
      const usersStore = useUsersStore();
      usersStore.loadFromLocalStorage();
      const users = computed(() => usersStore.getAllUsers);

      // Добавить пользователя
      const addUser = () => {
        const newUser = new User();
        usersStore.addUser(newUser);
      };

      return {
        addUser,
        users,
      };
    },
  });
</script>

<style scoped>
  h1 {
    color: black;
  }
</style>
