class Usuario {
    constructor(nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
      }
    
      addMascota(nombreMascota) {
        this.mascotas.push(nombreMascota);
      }
    
      countMascotas() {
        return this.mascotas.length;
      }
    
      addBook(nombre, autor) {
        const nuevoLibro = {
          nombre: nombre,
          autor: autor
        };
        this.libros.push(nuevoLibro);
      }
    
      getBookNames() {
        return this.libros.map(libro => libro.nombre);
      }
}

const usuario = new Usuario("Diego", "Anders");
usuario.addMascota("Gato");
usuario.addMascota("Pez");
usuario.addBook("El poder del ahora", "Eckhart Tolle");
usuario.addBook("El Señor de los Anillos", "J.R.R. Tolkien");

console.log(usuario.getFullName());
console.log(usuario.countMascotas());
console.log(usuario.getBookNames());