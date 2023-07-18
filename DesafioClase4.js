const fs = require('fs').promises;

class Contenedor {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async save(objeto) {
    try {
      const objetos = await this.getAll();
      const id = objetos.length > 0 ? objetos[objetos.length - 1].id + 1 : 1;
      objeto.id = id;
      objetos.push(objeto);
      await this.writeFile(objetos);
      return id;
    } catch (error) {
      console.log('Error al guardar el objeto:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const objetos = await this.getAll();
      return objetos.find((objeto) => objeto.id === id) || null;
    } catch (error) {
      console.log('Error al obtener el objeto por ID:', error);
      throw error;
    }
  }

  async getAll() {
    try {
      const fileContent = await this.readFile();
      return JSON.parse(fileContent) || [];
    } catch (error) {
      console.log('Error al obtener todos los objetos:', error);
      throw error;
    }
  }

  async deleteById(id) {
    try {
      const objetos = await this.getAll();
      const index = objetos.findIndex((objeto) => objeto.id === id);
      if (index !== -1) {
        objetos.splice(index, 1);
        await this.writeFile(objetos);
      }
    } catch (error) {
      console.log('Error al eliminar el objeto por ID:', error);
      throw error;
    }
  }

  async deleteAll() {
    try {
      await this.writeFile([]);
    } catch (error) {
      console.log('Error al eliminar todos los objetos:', error);
      throw error;
    }
  }

  async readFile() {
    try {
      return await fs.readFile(this.filePath, 'utf-8');
    } catch (error) {
      console.log('Error al leer el archivo:', error);
      throw error;
    }
  }

  async writeFile(objetos) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(objetos, null, 2), 'utf-8');
    } catch (error) {
      console.log('Error al escribir en el archivo:', error);
      throw error;
    }
  }
}

// Prueba del módulo
(async () => {
  const contenedor = new Contenedor('productos.txt');

  // Guardar dos objetos
  const objeto1 = {
    title: 'Producto 1',
    price: 10,
    thumbnail: 'url1'
  };

  const objeto2 = {
    title: 'Producto 2',
    price: 20,
    thumbnail: 'url2'
  };

  const id1 = await contenedor.save(objeto1);
  console.log(`Se ha guardado el objeto con ID: ${id1}`);

  const id2 = await contenedor.save(objeto2);
  console.log(`Se ha guardado el objeto con ID: ${id2}`);

  // Obtener objeto por ID
  const objetoObtenido = await contenedor.getById(id1);
  console.log('Objeto obtenido:', objetoObtenido);

  // Obtener todos los objetos
  const todosLosObjetos = await contenedor.getAll();
  console.log('Todos los objetos:', todosLosObjetos);

  // Eliminar objeto por ID
  await contenedor.deleteById(id1);
  console.log(`Se ha eliminado el objeto con ID: ${id1}`);

    // Obtener todos los objetos despues de eliminar 1
    const todosLosObjetos2 = await contenedor.getAll();
    console.log('Todos los objetos:', todosLosObjetos2);

  // Eliminar todos los objetos
  await contenedor.deleteAll();
  console.log('Se han eliminado todos los objetos');
})();