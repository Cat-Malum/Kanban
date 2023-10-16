<template>
  <div
    class="card"
    :style="{ 'border-color': borderColor }"
  >
    <template v-if="!editingCard">
      <div class="card__top">
        <h4>{{ product.title }}</h4>
        <p>${{ product.price }}</p>
      </div>
      <div class="card__middle">
        <div class="card__middle_top">
          <p>{{ product.category }}</p>
          <p>{{ product.description }}</p>
        </div>
        <img
          v-if="product.image"
          :src="product.image"
          alt="Image"
        >
      </div>
    </template>

    <template v-else>
      <div class="card__top">
        <input
          v-model="editingProduct.title"
          type="text"
          placeholder="Название"
        >
        <input
          v-model="editingProduct.price"
          type="text"
          placeholder="Цена"
        >
      </div>
      <div class="card__middle">
        <div class="card__middle_top-init">
          <input
            v-model="editingProduct.category"
            type="text"
            placeholder="Категория"
          >
          <textarea
            v-model="editingProduct.description"
            type="text"
            placeholder="Описание"
          />
        </div>
        <div class="card__middle_bottom-init">
          <input
            v-model="editingProduct.image"
            type="text"
            placeholder="Ссылка на картинку"
          >
          <img
            v-if="editingProduct.image"
            :src="editingProduct.image"
            alt="Image"
          >
        </div>
      </div>
    </template>
   
    <div class="card__buttons">
      <button
        @click="productsStore.deleteProduct(product.id, columnId)"
        class="button button__delete-card"
      >
        <img
          class="icon_small" 
          src="@/assets/icons/icons8-удалить-24.png"
          alt="icon"
        >
      </button>
      <button
        v-if="columnId > 0"
        @click="productsStore.migrate(product.id, columnId, columnId - 1)"
        class="button button__back-column"
      >
        <img
          class="icon" 
          src="@/assets/icons/icon-back.png"
          alt="icon"
        >
      </button>
      <button
        v-if="columnId < 2"
        @click="productsStore.migrate(product.id, columnId, columnId + 1)"
        class="button button__next-column"
      >
        <img
          class="icon"
          src="@/assets/icons/icon-next.png"
          alt="icon"
        >
      </button>
      <button
        v-if="!editingCard"
        @click="onEditStart"
        class="button button__edit-card"
      >
        <img
          class="icon_small"
          src="@/assets/icons/icons8-редактировать-50.png"
          alt="icon"
        >
      </button>
      <button
        v-else
        @click="onSave"
        class="button button__edit-card"
      >
        <img
          class="icon"
          src="@/assets/icons/icons8-галочка-50.png"
          alt="icon"
        >
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue';
import * as productsStore from '@/store/productsStore';

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  columnId: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['editingCard']);

const editingProduct = ref(null);
const editingCard = ref(false);
const columnColor = {
  0: '#55bbfa',
  1: '#fae755',
  2: '#55fa63'
};

const onEditStart = () => {
  editingCard.value = true;
  editingProduct.value = { ...props.product };
  emit('editingCard', editingCard.value);
};

const onSave = () => {
  editingCard.value = false;

  const products = productsStore.getColumnProducts(props.columnId);
  const idx = products.findIndex(p => p.id === props.product.id);

  products[idx] = editingProduct.value;
  editingProduct.value = null;
  emit('editingCard', editingCard.value);
};

const borderColor = computed(() => {
  return columnColor[props.columnId];
});
</script>

<style scoped lang="scss">
.card {
  padding: 10px;
  margin-bottom: 10px;
  border-left: 5px solid;
  border-radius: 5px;
  font-size: 0.8rem;
  background-color: #fdfdfd;

  input {
    display: block;
    width: 100%;
    height: 1.5rem;
    padding: 2px 5px;
    font-size: 0.8rem;
    background-color: #fff;
    border: none;
    border-bottom: 1px solid #2c2c2c;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    transition: 0.3s;

    &:focus {
      outline: 0;
      border: none;
      border-bottom: 1px solid #50c3f8;
    }
  }

  textarea {
    width: 100%;
    height: 5rem;
    margin-top: 15px;
    padding: 2px 5px;
    font-size: 0.8rem;
    background-color: #fff;
    border: none;
    border-bottom: 1px solid #2c2c2c;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    resize: vertical;
    overflow-y: hidden;
    transition: 0.3s;

    &:focus {
      outline: 0;
      border: none;
      border-bottom: 1px solid #50c3f8;
    }
  }

  &__top {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 10px;

    p {
      margin-left: 15px;
      font-size: 0.9rem;
    }
  }

  &__middle {
    &_bottom-init {
      margin-top: 10px;
    }

    img {
      display: block;
      margin: 15px auto 0;
      width: 80px;
      height: 80px;
    }

    p {
      margin-bottom: 10px;
    }

    @media screen and (max-width: 1150px) {
      img {
        width: 60px;
        height: 60px;
      }
    }
  }

  &__buttons {
    display: flex;
    margin-top: 20px;
  }

  @media screen and (max-width: 1020px) {
    button {
      width: 40px;
    }
  }
}
</style>