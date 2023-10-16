const MOCK = 'https://fakestoreapi.com/products';

export default {
  async getProducts() {
    try {
      const response = await fetch(MOCK);
      const data = response.json();

      return data;
    } catch(e) {
      console.log(e);
    }
  }
}