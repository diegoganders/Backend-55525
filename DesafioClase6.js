
const express = require('express');
const Contenedor = require('./DesafioClase4');

const app = express();
const port = 8080;

const contenedor = new Contenedor('productos.txt');

// Aca devuelvo todos los productos disponibles
app.get('/productos', async (req, res) => {
  try {
    const productos = await contenedor.getAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Acá devuelvo un producto random
app.get('/productoRandom', async (req, res) => {
  try {
    const productos = await contenedor.getAll();
    const randomIndex = Math.floor(Math.random() * productos.length);
    res.json(productos[randomIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto aleatorio' });
  }
});

// inicio el server
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});