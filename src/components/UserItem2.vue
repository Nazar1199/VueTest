<template>
  <n-form inline :model="user" :rules="rules" ref="formRef">
    <!-- Поле для логина -->
    <n-form-item label="Логин" path="login">
      <n-input v-model:value="user.login" placeholder="Введите логин" />
    </n-form-item>

    <!-- Поле для типа пользователя -->
    <n-form-item label="Тип записи" path="userType">
      <n-select v-model:value="user.userType"
                :options="userTypeOptions"
                placeholder="Выберите тип" />
    </n-form-item>

    <!-- Поле для меток -->
    <n-form-item label="Метки" path="marksString">
      <n-input v-model:value="marksString" placeholder="Введите метки" />
    </n-form-item>

    <!-- Поле для пароля -->
    <n-form-item label="Пароль" path="password">
      <n-input v-model:value="user.password"
               type="password"
               placeholder="Введите пароль" />
    </n-form-item>

    <!-- Кнопка отправки формы -->
    <n-form-item>
      <n-button type="primary" @click="handleSubmit">Сохранить</n-button>
    </n-form-item>
  </n-form>
</template>

<script lang="ts">
  import { UserType } from '../classes/UserType';
  import { User } from '../classes/User';
  import { defineComponent, ref, watch } from 'vue';
  import { NForm, NFormItem, NInput, NSelect, NButton } from 'naive-ui';
  import type { FormInst, FormRules } from 'naive-ui';

  export default defineComponent({
    components: {
      NForm,
      NFormItem,
      NInput,
      NSelect,
      NButton,
    },
    setup() {
      const formRef = ref<FormInst | null>(null);

      // Создаем объект пользователя
      const user = ref<User>(new User());

      // Преобразуем marks в строку для отображения
      const marksString = ref(user.marksString);

      // Преобразуем строку обратно в массив при изменении
      watch(marksString, (newValue) => {
        user.marksString = newValue;
      });

      // Опции для ComboBox (типы пользователей)
      const userTypeOptions = [
        { label: 'LDAP', value: UserType.LDAP },
        { label: 'Локальная', value: UserType.Local },
      ];

      // Правила валидации
      const rules: FormRules = {
        login: { required: true, message: 'Введите логин', trigger: 'blur' },
        userType: { required: true, message: 'Выберите тип', trigger: 'change' },
        password: { required: true, message: 'Введите пароль', trigger: 'blur' },
      };

      // Обработчик отправки формы
      const handleSubmit = () => {
        formRef.value?.validate((errors) => {
          if (!errors) {
            console.log('Данные пользователя:', user.value);
            // Здесь можно отправить данные на сервер
          } else {
            console.log('Ошибки валидации:', errors);
          }
        });
      };

      return {
        formRef,
        user,
        marksString,
        userTypeOptions,
        rules,
        handleSubmit,
      };
    },
  });
</script>

<style scoped>
  /* Стили компонента */
</style>
