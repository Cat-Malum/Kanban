<template>
  <div class="column">
    <div class="column__title">
      <h3 class="title">{{ title }}</h3>
      <div class="column__buttons">
        <button
          v-if="id === 0"
          class="button"
          @click="$emit('addProduct')"
        >
          <img
            class="icon_small"
            src="@/assets/icons/icons8-плюс-24.png"
            alt="icon"
          >
        </button>
        <button
          class="button"
          @click="sortProducts()"
        >
          <img
            v-if="statusSort"
            class="icon"
            src="@/assets/icons/icon-sort-91.png"
            alt="icon"
          >
          <img
            v-else
            class="icon"
            src="@/assets/icons/icon-sort-19.png"
            alt="icon"
          >
        </button>
      </div>
    </div>
    <draggable
      class="column__inner"
      :list="products"
      group="orders"
      item-key="id"
    >
      <template #item="{ element }">
        <card-comp
          :product="element"
          :columnId="id"
          @editingCard="onEditCard"
        />
      </template>
    </draggable>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';
import draggable from 'vuedraggable';
import * as productsStore from '@/store/productsStore';
import CardComp from './CardComp';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true
  }
});

defineEmits(['addProduct']);

const products = computed(() => {
  return productsStore.getColumnProducts(props.id);
});

const statusSort = ref(false);

const sortProducts = () => {
  statusSort.value = !statusSort.value;

  const cmp = statusSort.value
    ? (a, b) => b.rating.rate - a.rating.rate
    : (a, b) => a.rating.rate - b.rating.rate;

  productsStore.getColumnProducts(props.id).sort(cmp);
};

const editingCard = ref(false);

const onEditCard = (emit) => {
  editingCard.value = emit;
};
</script>

<style scoped lang="scss">
.column {
  min-width: 250px;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 5px;
  background-color: #ebebeb;

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 0 20px;
    text-align: center;
    line-height: 10px;
    background-color: #fdfdfd;
    border-radius: 5px;
    box-shadow: 0 5px 2px #2c2c2c50;

    @media screen and (max-width: 910px) {
      padding: 0 10px;
      font-size: 0.8rem;
    }
  }

  &__inner {
    height: 100%;
    padding: 15px;
  }

  &__buttons {
    display: flex;
    justify-content: end;
  }

  button {
    margin-left: 15px;
    height: 25px;
  }

  @media screen and (max-width: 905px) {
    .column__inner {
      padding: 10px 5px;
    }

    button {
      width: 20px;
      height: 20px;
    }
  }
}
</style>