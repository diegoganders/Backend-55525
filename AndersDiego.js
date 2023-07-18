class ProductManager {
    constructor() {
      this.products = [];
      this.productId = 1;
    }
  
    addProduct(product) {
      // Valido todos los campos obligatorios
      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.thumbnail ||
        !product.code ||
        !product.stock
      ) {
        console.log("Error: Todos los campos son obligatorios.");
        return;
      }
  
      // Valido que "code" sea único
      const codeExists = this.products.some((p) => p.code === product.code);
      if (codeExists) {
        console.log("Error: El código del producto ya existe.");
        return;
      }
  
      // El producto tiene un id autoincremental
      product.id = this.productId;
      this.productId++;
  
      // Agrego el producto
      this.products.push(product);
      console.log("Producto agregado exitosamente.");
    }
  
    getProducts() {
      return this.products;
    }
  
    //Devuelvo el producto por ID
    getProductById(id) {
      const product = this.products.find((p) => p.id === id);
      if (product) {
        return product;
      } else {
        console.log("Error: Not found");
      }
    }
  }


  //Pruebo que funcione

const productManager = new ProductManager();
//Pruebo con el arreglo vacio
console.log(productManager.getProducts());

const product1 = {
  title: "Producto 1",
  description: "Descripción del producto 1",
  price: 10,
  thumbnail: "ruta/imagen1.jpg",
  code: "P001",
  stock: 5
};

productManager.addProduct(product1);
console.log(productManager.getProducts());

const product2 = {
  title: "Producto 2",
  description: "Descripción del producto 2",
  price: 20,
  thumbnail: "ruta/imagen2.jpg",
  code: "P002",
  stock: 10
};

productManager.addProduct(product2);
console.log(productManager.getProducts());
//intento agregar un producto con el codigo repetido
const product3 = {
  title: "Producto 3",
  description: "Descripción del producto 3",
  price: 30,
  thumbnail: "ruta/imagen3.jpg",
  code: "P001",
  stock: 8
};

productManager.addProduct(product3);
console.log(productManager.getProducts());

console.log(productManager.getProductById(2));
console.log(productManager.getProductById(4));
