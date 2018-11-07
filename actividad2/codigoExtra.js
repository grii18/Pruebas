/*
//realizando cambios

const artCientifico = require('./objetos/articuloCientifico').articuloCientifico;
var autores = ['hola', 'vale'];
var articuloNuevo =  new artCientifico('La vida', autores, 20, 2, 3);
console.log(articuloNuevo);
articuloNuevo.darBaja();
console.log(articuloNuevo);
articuloNuevo.darAlta();
console.log(articuloNuevo);
autores[2] = 'ramon';
var autores2 = ['la vida', 'es', 'dificil'];
articuloNuevo.cambiarAutores(autores2);
console.log(articuloNuevo);
*/
/*
var objetos = ['h', 'g', 'd'];
var array = new Array (objetos);

esto lo que hace es que te crea una copia del array que le estas pasando para que asi 
cuando estes creando el objeto al modificar el array principal, no modificará el 
almacenado en el objeto

*/

/*let newcar = new clase(titulo, marca, modelo, color, km);
listadocoches.push(newcar); para crear un array con la información de newcar;
console.log(listadocoches);

-----------------------------------

-nueva estructura del bucle for
for (let coche of listadocoches){
    if (coche.titulo === titulo){
        console.log(coche);
        break;
    }
}

-----------------------------------

if(opcion === borrar){
    //dar un coche de baja
    let titulo = rl.question('titulo del que quieres borrar: ');
    for (let i=0; i<listacoches.length; i++){
        let coche = listacoches[i];
        if(coche.titulo === titulo){
            listacoches.splice(i);  ----> para eliminar el coche del array, buscar mas a fondo este metodo!!!
            encontrado = true;
            break;
        }
    }
}


typeof devuelve que tipo de variable es, se usa con los tipos de datos sencillos
  instanceof devuelve si el tipo de dato es === a lo que quieres comprobar
*/