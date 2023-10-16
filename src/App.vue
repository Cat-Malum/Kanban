<template>
  <main>
    <home-view />
  </main>
</template>

<script setup>
import HomeView from '@/view/HomeView.vue';
</script>

<style>
@import url('@/assets/styles/buttons.scss');
@import url('@/assets/styles/icons.scss');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 16px;
}

main {
  position: relative;
  padding-bottom: 40px;
  background-color: #d7d7d7;
}
</style>
