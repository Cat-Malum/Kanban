<template>
  <transition name="slide-fade">
    <div 
      v-if="modelValue"
      class="shadow-outside"
      @click="closeClickOnOutside"
    >
      <slot />
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  }
});

const emit = defineEmits(['update:modelValue']);

const close = () => {
  emit('update:modelValue', false);
};

const closeClickOnOutside = (event) => {
  if (event.target.classList.contains('shadow-outside')) {
    close();
  }
};
</script>

<style scoped lang="scss">
.shadow-outside {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.5);
  z-index: 5;
}

.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>