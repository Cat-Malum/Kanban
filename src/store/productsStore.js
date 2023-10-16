import { ref } from "vue";

export const firstColumnProducts = ref([]);
export const secondColumnProducts = ref([]);
export const thirdColumnProducts = ref([]);

export function getColumnProducts(columnId) {
  const columnProducts = {
    0: firstColumnProducts,
    1: secondColumnProducts,
    2: thirdColumnProducts
  };

  return columnProducts[columnId].value;
}

export function deleteProduct(id, col) {
  const products = getColumnProducts(col);
  const idx = products.findIndex(p => p.id === id);

  products.splice(idx, 1);
}

export function addProduct(product, col) {
  const products = getColumnProducts(col);

  products.push(product);
}

export function migrate(id, colFrom, colTo) {
  const productsFrom = getColumnProducts(colFrom);
  const productsTo = getColumnProducts(colTo);
  const idx = productsFrom.findIndex(p => p.id === id);
  const [product] = productsFrom.splice(idx, 1);

  productsTo.push(product);
}