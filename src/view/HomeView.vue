<template>
  <div class="container">
    <column-comp 
      v-for="column of columns"
      :key="column.id"
      :title="column.title"
      :id="column.id"
      @addProduct="initAddProduct(column.id)"
    />
  </div>

  <modal-window v-model="statusWindow">
    <div class="add-product-window">
      <h3 class="add-product-window__title">Добавление карточки товара</h3>
      <div class="add-product-window__form">
        <p class="add-product-window__label">Название</p>
        <input
          v-model="addingProduct.title"
          class="add-product-window__input"
          type="text"
        >
      </div>
      <div class="add-product-window__form">
        <p class="add-product-window__label">Цена</p>
        <input
          v-model="addingProduct.price"
          class="add-product-window__input"
          type="text"
        >
      </div>
      <div class="add-product-window__form">
        <p class="add-product-window__label">Категория</p>
        <input
          v-model="addingProduct.category"
          class="add-product-window__input"
          type="text"
        >
      </div>
      <div class="add-product-window__form">
        <p class="add-product-window__label">Описание</p>
        <input
          v-model="addingProduct.description"
          class="add-product-window__input"
          type="text"
        >
      </div>
      <div class="add-product-window__form">
        <p class="add-product-window__label">Сортировочные данные</p>
        <input
          v-model="addingProduct.rating.count"
          class="add-product-window__input"
          type="text"
          placeholder="Количество"
        >
        <input
          v-model="addingProduct.rating.rate"
          class="add-product-window__input"
          type="text"
          placeholder="Рейтинг"
        >
      </div>
      <div class="add-product-window__form">
        <p class="add-product-window__label">Фотография</p>
        <input
          v-model="addingProduct.image"
          class="add-product-window__input"
          type="text"
          placeholder="Ссылка на фотографию"
        >
        <img
          v-if="addingProduct.image"
          :src="addingProduct.image"
          class="add-product-window__img"
          alt="Image"
        >
      </div>

      <button
        class="add-product-window__button"
        @click="onAddProduct"
      >
        <img
          class="icon_small"
          src="@/assets/icons/icons8-плюс-24.png"
          alt="icon"
        >
      </button>
    </div>
  </modal-window>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as productsStore from '@/store/productsStore';
import ColumnComp from '@/components/ColumnComp';
import ModalWindow from '@/components/ModalWindow';
import fetch from '@/services/fetch';

const columns = [
  {
    title: 'В производстве',
    id: 0
  },
  {
    title: 'В доставке',
    id: 1
  },
  {
    title: 'На складе',
    id: 2
  }
];

const addingProduct = ref(null);
const addingColumn = ref(null);
let statusWindow = ref(false);
let lastId = 0;

onMounted(async () => {
  const products = await fetch.getProducts();
  
  productsStore.firstColumnProducts.value = products;
  lastId = products[products.length - 1].id;
})

const initAddProduct = (col) => {
  addingColumn.value = col;
  addingProduct.value = {
    id: ++lastId,
    title: '',
    price: '',
    category: '',
    description: '',
    image: '',
    rating: {
      count: '',
      rate: ''
    }
  }

  statusWindow.value = true;
};

const onAddProduct = () => {
  productsStore.addProduct(addingProduct.value, addingColumn.value);
  addingProduct.value = null;
  statusWindow.value = false;
};
</script>

<style scoped lang="scss">
.container {
  max-width: 1220px;
  height: 100%;
  margin: 0 auto;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}

.add-product-window {
  margin: auto;
  position: absolute;
  top: 100px; left: 0; right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  width: 500px;
  border-radius: 5px;
  background-color: #fff;

  &__title {
    margin-bottom: 30px;
  }

  &__form {
    width: 100%;
    margin-bottom: 30px;
  }

  &__label {
    color: #656565;
  }

  &__input {
    display: block;
    width: 100%;
    height: 2.5rem;
    padding: 5px 10px;
    background-color: #fff;
    border: none;
    border-bottom: 1px solid #2c2c2c;
    transition: 0.3s;

    &:focus {
      outline: 0;
      border: none;
      border-bottom: 1px solid #50c3f8;
    }

    &::placeholder {
      font-size: 12px;
    }
  }

  &__img {
    width: 50px;
    height: 50px;
    margin: 10px;
  }
}
</style>