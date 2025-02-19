<template>
  <n-config-provider>
    <n-layout>
      <n-layout-header>
        <n-space justify = "space-between" align = "center">
          <n-h1> Моя страница </n-h1>
          <n-dropdown :options = "dropdownOptions" @select="handleDropdownSelect">
            <n-button> Меню </n-button>
          </n-dropdown>
        </n-space>
      </n-layout-header>
      <n-layout-content>
        <n-card title="Привет, мир!" style="margin: 20px;">
          <p>Это пример страницы с использованием Naive UI.</p>
          <n-button type="primary" @click="handleButtonClick"> Нажми меня </n-button>
        </n-card>
      </n-layout-content>
    </n-layout>
  </n-config-provider>
</template>

<script>
  import { defineComponent } from 'vue';
  import { NConfigProvider, NLayout, NLayoutHeader, NLayoutContent, NSpace, NH1, NButton, NDropdown, NCard } from 'naive-ui';

  export default defineComponent({
    components: {
      NConfigProvider,
      NLayout,
      NLayoutHeader,
      NLayoutContent,
      NSpace,
      NH1,
      NButton,
      NDropdown,
      NCard
    },
    setup() {
      const dropdownOptions = [
        { label: 'Опция 1', key: 'option1' },
        { label: 'Опция 2', key: 'option2' },
        { label: 'Опция 3', key: 'option3' }
      ];

      const handleDropdownSelect = (key) => {
        console.log('Выбрана опция:', key);
      };

      const handleButtonClick = () => {
        console.log('Кнопка нажата!');
      };

      return {
        dropdownOptions,
        handleDropdownSelect,
        handleButtonClick
      };
    }
  });
</script>
