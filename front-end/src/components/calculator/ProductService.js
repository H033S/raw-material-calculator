class ProductService {
  async getAllProducts() {
    try {
      console.log("ProductService:getAllProducts:: Making request");

      const response = await fetch(`http://localhost:8080/products`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log("ProductService:getAllProducts:: Response received");

      if (response.ok) {
        const json = await response.json();
        console.log(json);
        return json;
      }
    } catch (error) {
      console.error(`ProductService:getAllProducts:: Error happened ${error}`);
      throw error;
    }
  }
}

export default ProductService;
