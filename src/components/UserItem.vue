<template>
  <n-form inline :model="computedUser" :rules="rules" ref="formRef" style="align-items: flex-end">
    <n-form-item path="marksString">
      <n-space vertical>
        <n-p v-if="first">Метки</n-p>
          <n-input @blur="handleBlur(computedUser)" maxlength="50" v-model:value="computedMarksString" placeholder="Введите метки" />
      </n-space>
    </n-form-item>

    <n-form-item path="_userType">
      <n-space vertical>
        <n-p v-if="first">Тип записи</n-p>
        <n-select @blur="handleBlur(computedUser)" v-model:value="computedUserType" :options="userTypeOptions" placeholder="Выберите тип" style="width: 200px;" />
      </n-space>
    </n-form-item>

    <n-form-item v-if="computedUserType === UserType.LDAP &&  !first" path="_login">
      <n-space vertical>
        <n-p v-if="first">Логин</n-p>
        <n-input @blur="handleBlur(computedUser)" v-model:value="computedLogin" placeholder="Введите логин" style="width: 404px;" />
      </n-space>
    </n-form-item>

    <n-form-item v-if="computedUserType !== UserType.LDAP || first" path="_login">
      <n-space vertical>
        <n-p v-if="first">Логин</n-p>
        <n-input @blur="handleBlur(computedUser)" v-model:value="computedLogin" placeholder="Введите логин" />
      </n-space>
    </n-form-item>

    <n-form-item v-if="computedUserType !== UserType.LDAP || first" path="_password">
      <n-space vertical>
        <n-p v-if="first">Пароль</n-p>
        <n-input :disabled="computedUserType === UserType.LDAP" @blur="handleBlur(computedUser)" v-model:value="computedPassword" type="password" show-password-on="mousedown" placeholder="Введите пароль" />
      </n-space>
    </n-form-item>

    <n-form-item>
      <n-space vertical>
        <n-p v-if="first"></n-p>
        <n-button type="error" text style="font-size: 24px" circle @click="handleRemoveUser(computedUser)">
          <n-icon><MdTrash /></n-icon>
        </n-button>
      </n-space>
    </n-form-item>
  </n-form>
</template>

<script lang="ts">
  import { MdTrash } from '@vicons/ionicons4';
  import { UserType } from '../classes/UserType'; 
  import { User } from '../classes/User';
  import { useUsersStore } from '../stores/userStore.ts'
  import { defineComponent, ref, watch, PropType, computed } from 'vue';
  import { NForm, NFormItem, NInput, NSelect, NButton, NIcon } from 'naive-ui';
  import type { FormInst, FormRules } from 'naive-ui';

  export default defineComponent({
    components: {
      MdTrash,
      NIcon,
      NForm,
      NFormItem,
      NInput,
      NSelect,
      NButton,
    },
    props: {
      user: {
        type: Object as PropType<User>,
        required: true,
      },
      first: {
        type: Boolean as PropType<Boolean>,
        required: true,
      },
    },
    setup(props) {
      const formRef = ref<FormInst | null>(null);
      const usersStore = useUsersStore();

      const user = ref<User>(props.user);
      const first = ref<User>(props.first);

      const userType = ref<UserType>();

      // Опции для ComboBox (типы пользователей)
      const userTypeOptions = [
        { label: UserType.LDAP.toString(), value: UserType.LDAP },
        { label: UserType.Local.toString(), value: UserType.Local },
      ];

      // Правила валидации
      const rules: FormRules = {
        _login:  [
          { required: true, message: '', trigger: 'blur' },
          { max: 100, message: '', trigger: 'blur' }
        ],
        _userType: [{ required: true, message: '', trigger: 'blur' }],
        marksString: [
          { required: false, message: '', trigger: 'blur' },
          { max: 50, message: '', trigger: 'blur' }],
        _password: [
          { required: true, message: '', trigger: 'blur' },
          { max: 100, message: '', trigger: 'blur' }
        ],
      };


    const computedUser = computed({
      get: () => props.user,
      set: (newUser) => {
        usersStore.updateUser(newUser); 
      }
    });

    const computedMarksString = computed({
      get: () => computedUser.value._marks?.join(";"),
      set: (newMarksString) => {
        computedUser.value._marks = newMarksString?.split(";");
      }
    });

    const computedUserType = computed({
      get: () => computedUser.value._userType,
      set: (newUserType) => {
        computedUser.value._userType = newUserType;
        if (computedUser.value._userType === UserType.LDAP){
          computedUser.value._password = null;
        }
      }
    });

    const computedLogin = computed({
      get: () => computedUser.value._login,
      set: (newLogin) => {
        computedUser.value._login = newLogin;
      }
    });

    const computedPassword = computed({
      get: () => computedUser.value._password,
      set: (newPassword) => {
        computedUser.value._password = newPassword;
      }
    });

      const handleBlur = async (user: User) => {
      await usersStore.saveToLocalStorage();
    };

    const handleRemoveUser = (user: User) => {
        if (user && user._id) {
            removeUser(user._id);
        } else {
            console.warn("User or user.id is undefined. Cannot remove user.");
        }
    };

    const updateUser = async (user: User) => {
        try {
            await usersStore.updateUser(user);
        } catch (error) {
            console.error("Error removing user:", error);
        }
    };

    const removeUser = async (id: number) => {
        try {
            await usersStore.removeUser(id);
        } catch (error) {
            console.error("Error removing user:", error);
        }
    };

      return {
        computedUser,
        computedMarksString,
        computedUserType,
        computedLogin,
        computedPassword,
        handleRemoveUser,
        removeUser,
        formRef,
        user,
        removeUser,
        userTypeOptions,
        UserType,
        first,
        rules,
        handleBlur,
        handleRemoveUser,
      };
    },
  });
</script>
<style>

  .n-form-item.n-form-item--medium-size.n-form-item--top-labelled {
    display: flex;
    margin-bottom: 10px;
  }
</style>
