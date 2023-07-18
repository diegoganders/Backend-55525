const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  addProduct(product) {
    const products = this.readProductsFromFile();

    // Valido que "code" sea único
    const codeExists = products.some((p) => p.code === product.code);
    if (codeExists) {
      console.log("Error: El código del producto ya existe.");
      return;
    }

    // Asignar un ID autoincrementable al producto
    const newProduct = {
      id: products.length + 1,
      ...product
    };
    //Agrego el nuevo producto y escribo el file
    products.push(newProduct);
    this.writeProductsToFile(products);

    console.log('Producto agregado exitosamente.');
  }
  getProducts() {
    return this.readProductsFromFile();
  }

    //Devuelvo el producto por ID
    getProductById(id) {
    const products = this.readProductsFromFile();
    const product = products.find((p) => p.id === id);

    if (product) {
      return product;
    } else {
      console.log('Error: Producto no encontrado.');
    }
  }
  //Actualizao el producto seleccionado por ID
  updateProduct(id, updatedFields) {
    const products = this.readProductsFromFile();
    const index = products.findIndex((p) => p.id === id);

    if (index !== -1) {
      const updatedProduct = {
        id,
        ...products[index],
        ...updatedFields
      };

      products[index] = updatedProduct;
      this.writeProductsToFile(products);

      console.log('Producto actualizado exitosamente.');
    } else {
      console.log('Error: Producto no encontrado.');
    }
  }
  //Elimino el producto seleccionado pod iD
  deleteProduct(id) {
    const products = this.readProductsFromFile();
    const index = products.findIndex((p) => p.id === id);

    if (index !== -1) {
      products.splice(index, 1);
      this.writeProductsToFile(products);

      console.log('Producto eliminado exitosamente.');
    } else {
      console.log('Error: Producto no encontrado para eliminar.');
    }
  }

  readProductsFromFile() {
    try {
      const fileData = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(fileData) || [];
    } catch (error) {
      console.log('Error al leer el archivo de productos:', error);
      return [];
    }
  }

  writeProductsToFile(products) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(products), 'utf-8');
    } catch (error) {
      console.log('Error al escribir en el archivo de productos:', error);
    }
  }
}

//Pruebas

const productManager = new ProductManager('productos.json');

console.log(productManager.getProducts())
const product1 ={
title: "producto prueba",
description:"Este es un producto prueba",
price:200,
thumbnail:"Sin imagen",
code:"abc123",
stock:25
}

//Agrego y muestro 1 producto
productManager.addProduct(product1);
console.log(productManager.getProducts());

//Busco un producto poe ID
console.log(productManager.getProductById((1)))
//Busco un producto por ID que no existe
productManager.getProductById((2))

//Actualizo un producto y lo muestro
productManager.updateProduct(1, { price: 100, stock: 50 });
console.log(productManager.getProductById(1));

//Elimino un producto por ID
productManager.deleteProduct(1);
console.log(productManager.getProducts());

//Trato de eliminar un producto que no existe
productManager.deleteProduct(2);

