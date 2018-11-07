//realizando cambios




const rl = require('readline-sync');
const patentesCientificas = require('./objetos/patentes').PatentesCientificas;
const artRevista = require('./objetos/tiposArticulos/revista').ArticuloDeRevista;
const artConferencia = require('./objetos/tiposArticulos/conferencia').ArticuloDeConferencia;

// Variables globales

var listaArticulos = [];
var listaPatentes = [];
var busquedaAnyoPublicacion = 0;
var tipoDeArticulo = "";
var busquedaAutor = "";

/* Funciones */

/**
 * @param {Array} elemento 
 */
function comprobarAutores(elemento){
    return busquedaAutor == elemento;
}

/**
 * @param {Object} elemento 
 */
function busquedaPorAutores(elemento){
    return busquedaAutor == elemento.autores.filter(comprobarAutores);
}

/**
 * @param {Object} elemento 
 */
function busquedaGeneral(elemento){
    
    if (busquedaAutor.length > 0 && busquedaAnyoPublicacion > 0) {
        let verificandoAutores = elemento.autores.filter(comprobarAutores);

        if(verificandoAutores.length > 0 && elemento.publicacion == busquedaAnyoPublicacion && elemento.tipoArticulo === tipoDeArticulo ){
            return elemento;
        }

    } else if (busquedaAutor.length > 0){
        let verificandoAutores = elemento.autores.filter(comprobarAutores);


        if(verificandoAutores.length > 0 && elemento.tipoArticulo === tipoDeArticulo){
            return elemento;
        }
    } else if (busquedaAnyoPublicacion > 0) {
        if(elemento.publicacion == busquedaAnyoPublicacion && elemento.tipoArticulo === tipoDeArticulo){
            return elemento;
        }
    }else {
        if(elemento.tipoArticulo === tipoDeArticulo){
            return elemento;
        }
    }
 
}

/**
 * @param {Number} cambiar 
 * @param {Object} articulo 
 * @param {Array} autores 
 */
function modificacionGeneralArtCientifico(cambiar, articulo, autores) {
    if (cambiar === 1) {
        let tituloNuevo = rl.question('Artículo encontrado, título actual: ' + articulo.titulo + '\nEscriba el nuevo título: ');
        
        articulo.titulo= tituloNuevo;
        
        console.log('\nEl título del artículo fue modificado con éxito a "' + articulo.titulo + '" ');
        
    } else if(cambiar === 2){
        let numautores = rl.questionInt('Artículo encontrado, escriba cuantos autores va a tener el artículo: ');
        console.log('Autores actuales: ' + articulo.autores + '\n');

        for (let i = 0; i < numautores ; i++) {
            autores[i] = rl.question('Escriba el nombre del autor ' + (i+1) + ': ');
        }
        
        articulo.autores= autores;

        console.log('\nLos autores del artículo "' + articulo.titulo + '" fueron modificados con éxito');

    }else if (cambiar === 3) {
        let numpags = rl.questionInt('Artículo encontrado, número de páginas actual: ' + articulo.numpags + '\nEscriba el nuevo número de páginas: ');
        
        articulo.numpags= numpags;
        
        console.log('\nEl número de páginas del artículo fue modificado con éxito a: ' + articulo.numpags);

    }else if (cambiar === 4){
        let nuevoAnyo = rl.questionInt('Artículo encontrado, año de publicación actual: ' + articulo.publicacion + '\nEscriba el nuevo año de publicación: ');
        
        articulo.publicacion= nuevoAnyo;
        
        console.log('\nEl año de publicación del artículo fue modificado con éxito a: ' + articulo.publicacion);

    }else if (cambiar === 5){
        let nuevaMensiones = rl.questionInt('Artículo encontrado, menciones actual: ' + articulo.menciones + '\nEscriba el nuevo número de menciones: ');
        
        articulo.menciones= nuevaMensiones;
        
        console.log('\nEl número de menciones del artículo fue modificado con éxito a: ' + articulo.menciones);

    }
}


// Inicio del código

console.log("*************************************************************************");
console.log("** Bienvenido al sistema de publicación de descubrimientos científicos **");
console.log("*************************************************************************");

let flag = false;
let id = 0;
let idPatente = 0;

while (!flag) {
    let opcion = 0;

    console.log("Escriba:\n(1) Si desea dar de alta un nuevo artículo científico\n(2) Si desea dar de alta una patente científica \n(3) Si desea dar de baja un artículo científico\n(4) Si desea modificar un artículo científico o una patente científica\n(5) Si desea ver todos los artículos científicos y patentes científicas que hay dados de alta\n(6) Si desea buscar artículos científicos o patentes científicas\n(7) Si desea calcular el número de producciones científicas producidas por un autor\n(8) Si desea calcular el factor de impacto de un autor\n(0) Si desea salir\n");
    opcion = rl.questionInt();

    if (opcion === 0) {
        flag = true;
        console.log('Adios! gracias por usar el sistema de publicación de descubrimientos científicos');
    }else if(opcion === 1){ // Creación de un artículo científico
        let autores = [];
        

        id = id + 1;
        let titulo = rl.question('Escriba el título del artículo científico: ');
        let numautores = rl.questionInt('Cuantos autores tiene éste artículo científico?: ');
        for (let i = 0; i < numautores ; i++) {
            autores[i] = rl.question('Escriba el nombre del autor ' + (i+1) + ': ');
        }
        
        let pagsArticulo = rl.questionInt('De cuantas páginas consta este artículo científico?: ');
        let publicadoEl = rl.questionInt('Cuando fue publicado este artículo científico?: ');
        let menciones = rl.questionInt('Cuantas menciones tiene este artículo científico?: ');
        console.log('Qué tipo de artículo científico es?\nEscribe:\n(1) De Tipo Revista\n(2) De Tipo Conferencia');
        tipoArticuloCientifico = rl.questionInt();

        if (tipoArticuloCientifico === 1) {

            let nombreDeRevista = rl.question('Cual es el nombre de la revista?: ');
            let editorial = rl.question('Cual es la editorial?: ');
            let factorImpacto = rl.questionInt('Cual es el factor de impacto de esta revista?: ');

            let articuloRevista =  new artRevista(id, titulo, autores, pagsArticulo, publicadoEl, menciones, nombreDeRevista, editorial, factorImpacto);
            listaArticulos.push(articuloRevista);
        } else if(tipoArticuloCientifico === 2) {

            let nombreConferencia = rl.question('Cual es el nombre de la conferencia?: ');
            let lugarCelebracion = rl.question('Cual es el lugar donde se celebra la conferencia?: ');

            var articuloConferencia =  new artConferencia(id, titulo, autores, pagsArticulo, publicadoEl, menciones, nombreConferencia, lugarCelebracion);
            listaArticulos.push(articuloConferencia);
        }
        

        console.log(listaArticulos);

    }else if (opcion === 2) { // Creación de una patente científica
        let autores = [];

        idPatente = idPatente + 1;

        let numautores = rl.questionInt('Cuantos autores tiene ésta patente científica?: ');
        for (let i = 0; i < numautores ; i++) {
            autores[i] = rl.question('Escriba el nombre del autor ' + (i+1) + ': ');
        }
        let publicadoEl = rl.questionInt('Cuando fue publicado esta patente científica?: ');
        let venceEl = rl.questionInt('Cuando se vence esta patente científica?: ');
        
        let patentes =  new patentesCientificas(idPatente, autores, publicadoEl, venceEl);
        listaPatentes.push(patentes);


    }else if (opcion === 3) { // Eliminar un artículo científico
        let encontrado = false;
        let ids = rl.questionInt('Escribe el "ID" del artículo científico que quieres borrar: ');

        for (let i=0; i<listaArticulos.length; i++){
            let articulo = listaArticulos[i];
            
            if(articulo.id === ids){
                listaArticulos.splice(i,1);
                encontrado = true;
                console.log("\nEl artículo fue eliminado con éxito\n");
                break;
            }

            
        }
         

        if (encontrado == false) {
            console.log("\nNo se ha podido encontrar el artículo científico especificado, vuelva a intentarlo con otro ID.\n");
        }

    }else if (opcion === 4) { // Modificar un artículo científico o una patente científica
        let flag = false;

        while (!flag) {
 
            console.log('\nDesea modificar un artículo científico o una patente científica?\nEscriba\n(1) Para modificar un artículo científico\n(2) Para modificar una patente científica');
            let eleccion = rl.questionInt();

            if (eleccion === 1) {
                let autores = [];

                let encontrado = false;
                let ids = rl.questionInt('\nEscriba el "ID" del artículo científico que desea modificar: ');

                for (let i=0; i<listaArticulos.length; i++){
                    let articulo = listaArticulos[i];
                    
                    if(articulo.id === ids){
                        encontrado = true;

                        if (articulo.tipoArticulo == "tipoRevista") {
                            let cambiar = rl.questionInt('\nEscriba:\n(1) Si desea modificar el título del artículo científico\n(2) Si desea modificar los autores\n(3) Si desea modificar el número de páginas\n(4) Si desea modificar el año de publicación\n(5) Si desea modificar las menciones\n(6) Si desea modificar el nombre de la revista\n(7) Si desea modificar la editorial\n(8) Si desea modificar el factor de impacto\n');

                            if (cambiar > 0 && cambiar < 6) {
                                modificacionGeneralArtCientifico(cambiar, articulo, autores);
                            }else if (cambiar === 6) {
                                let nuevoNombreRevista = rl.question('Artículo encontrado, nombre actual de la revista: ' + articulo.nombreConferencia + '\nEscriba el nuevo nombre de la revista: ');
                                
                                articulo.nombreConferencia= nuevoNombreRevista;
                                
                                console.log('\nEl nombre de la revista del artículo fue modificado con éxito a: ' + articulo.nombreConferencia);
                                break;
                            }else if (cambiar === 7){
                                let nuevaEditorial = rl.question('Artículo encontrado, editorial actual de la revista: ' + articulo.lugarCelebracion + '\nEscriba la nueva editorial de la revista: ');
                                
                                articulo.lugarCelebracion= nuevaEditorial;
                                
                                console.log('\nLa editorial de la revista del artículo fue modificado con éxito a: ' + articulo.lugarCelebracion);
                                break;
                            }else if (cambiar === 8){
                                let nuevoFactorImpacto = rl.questionInt('Artículo encontrado, factor de impacto actual de la revista: ' + articulo.factorDeImpacto + '\nEscriba la nuevo factor de impacto de la revista: ');
                                
                                articulo.factorDeImpacto= nuevoFactorImpacto;
                                
                                console.log('\nEl factor de impacto de la revista del artículo fue modificado con éxito a: ' + articulo.factorDeImpacto);
                                break;
                            }else {
                                console.log('El número introducido no es válido\n');
                            }


                        }else if(articulo.tipoArticulo == "tipoConferencia"){
                            let cambiar = rl.questionInt('\nEscriba:\n(1) Si desea modificar el título del artículo científico\n(2) Si desea modificar los autores\n(3) Si desea modificar el número de páginas\n(4) Si desea modificar el año de publicación\n(5) Si desea modificar las menciones\n(6) Si desea modificar el nombre de la conferencia\n(7) Si desea modificar el lugar de celebracionl de la conferencia\n');

                            if (cambiar > 0 && cambiar < 6) {
                                modificacionGeneralArtCientifico(cambiar, articulo, autores);
                            }else if (cambiar === 6) {
                                let nuevoNombreConferencia = rl.question('Artículo encontrado, nombre actual de la conferencia: ' + articulo.nombreConferencia + '\nEscriba el nuevo nombre de la conferencia: ');
                                
                                articulo.nombreConferencia= nuevoNombreConferencia;
                                
                                console.log('\nEl nombre de la conferencia del artículo fue modificado con éxito a: ' + articulo.nombreConferencia);
                                break;
                            }else if (cambiar === 7){
                                let nuevaLugar = rl.question('Artículo encontrado, lugar celebración actual de la conferencia: ' + articulo.lugarCelebracion + '\nEscriba el nuevo lugar de celebración de la conferencia: ');
                                
                                articulo.lugarCelebracion= nuevaLugar;
                                
                                console.log('\nEl lugar de celebración de la conferencia del artículo fue modificado con éxito a: ' + articulo.lugarCelebracion);
                                break;
                            }else {
                                console.log('El número introducido no es válido\n');
                            }
                        }

                    }
                }
                
                if (encontrado == false) {
                    console.log("\n No se ha podido encontrar el artículo científico especificado, vuelva a intentarlo con otro ID.\n");
                }
                

            } else if(eleccion === 2) {
                let encontrado = false;
                let ids = rl.questionInt('\nEscriba el "ID" de la patente científica que desea modificar: ');

                for (let i=0; i<listaPatentes.length; i++){
                    let autores = [];
                    let articulo = listaPatentes[i];
                    
                    if(articulo.id === ids){
                        encontrado = true;

                        let cambiar = rl.questionInt('\nEscriba:\n(1) Si desea modificar los autores de la patente \n(2) Si desea modificar el año de publicación de la patente\n(3) Si desea modificar el año de vencimiento de la patente\n');

                        if(cambiar === 1){
                            let numautores = rl.questionInt('Artículo encontrado, escriba cuantos autores va a tener el artículo: ');
                            console.log('Autores actuales: ' + articulo.autores + '\n');
                    
                            for (let i = 0; i < numautores ; i++) {
                                autores[i] = rl.question('Escriba el nombre del autor ' + (i+1) + ': ');
                            }
                            
                            articulo.autores= autores;
                    
                            console.log('\nLos autores de la patente fueron modificados con éxito a: ' + articulo.autores);
                    
                        }else if (cambiar === 2){
                            let nuevoAnyo = rl.questionInt('Artículo encontrado, año de publicación actual: ' + articulo.publicacion + '\nEscriba el nuevo año de publicación: ');
                            
                            articulo.publicacion= nuevoAnyo;
                            
                            console.log('\nEl año de publicación de la patente fue modificado con éxito a: ' + articulo.publicacion);
                    
                        }else if (cambiar === 3){
                            let nuevoAnyoVencimiento = rl.questionInt('Artículo encontrado, año de vencimiento actual: ' + articulo.vencePatente + '\nEscriba el nuevo año de vencimiento de la patente: ');
                            
                            articulo.vencePatente= nuevoAnyoVencimiento;
                            
                            console.log('\nEl año de vencimiento de la patente fue modificado con éxito a: ' + articulo.vencePatente);
                    
                        }

                    }
                }

                if (encontrado == false) {
                    console.log("\n No se ha podido encontrar la patente científica especificada, vuelva a intentarlo con otro ID.\n");
                }
            }

            console.log('Quiere modificar otro archivo? Escriba (1) si desea salir y si desea continuar modificando otro archivo escriba cualquier otra tecla: ');
            let eleccionSalir = rl.question();
            if(eleccionSalir == 1){
                flag = true;
            }
            
        }
        



    }else if (opcion === 5) { // Mustra todos los artículos científicos y patentes científicas

        console.log(listaArticulos);
        console.log("-----------------------------Patentes Científicas----------------------------");
        console.log(listaPatentes);

    }else if (opcion === 6) { // Busqueda de artículos científicos o patentes científicas
        let flag = false;

        while (!flag) {
            
            
            console.log('\nDesea buscar artículos científicos o patentes científicas?\n(1) Para buscar artículos científicos\n(2) Para buscar patentes científicas');
            let eleccionDeBusqueda = rl.questionInt();
            

            if (eleccionDeBusqueda === 1) {
                console.log('Se puede realizar la busqueda  mediante varios parámetros, si no conoce alguno de estos déjelo vacio o en 0 si es numérico');
                busquedaAutor = rl.question('Introduce nombre del autor: ');
                busquedaAnyoPublicacion = rl.questionInt('Introduce el año de publicación del artículo: ');
                let num = rl.questionInt('Escribe:\n(1) Si el artículo es de revista\n(2) Si el artículo es de conferencia\n');
                
                
                if (num === 1) {
                    tipoDeArticulo = "tipoRevista";
                    let buscando = listaArticulos.filter(busquedaGeneral);
                    console.log(buscando);
                } else if(num === 2) {
                    tipoDeArticulo = "tipoConferencia";
                    let buscando = listaArticulos.filter(busquedaGeneral);
                    console.log(buscando);
                } else if(num === 0) {
                    console.log(listaArticulos);
                } else{
                    console.log('El numero introducido no es válido\n');
                }


            }else if(eleccionDeBusqueda === 2) {
                console.log('Se puede realizar la busqueda  mediante varios parámetros, si no conoce alguno de estos déjelo vacio o en 0 si es numérico');
                var busquedaAutor = rl.question('Introduce nombre del autor de la patente: ');
                busquedaAnyoPublicacion = rl.questionInt('Introduce el año de publicación de la patente: ');
                tipoDeArticulo = "Patente";

                let buscando = listaPatentes.filter(busquedaGeneral);
                console.log(buscando);
            }else {
                console.log('\nEl numero introducido no es válido\n');
            }

            
            
            console.log('Quiere continuar buscando? Escriba (1) si desea salir y si desea continuar buscando escriba cualquier otra tecla: ');
            let eleccionSalir = rl.question();
            if(eleccionSalir == 1){
                flag = true;
            }
        }


    }else if (opcion === 7) { // Calculando el total de producciones científicas de un autor
        /**
         * Entendiendo que las "producciones científicas producidas por el autor" son el total de articulos científicos que ha producido 
         */

        busquedaAutor = rl.question('Introduce nombre del autor: ');
        let buscando = listaArticulos.filter(busquedaPorAutores);
        if (buscando.length > 0) {
            console.log('El total de producciones científicas producidas por el autor "' + busquedaAutor + '" en los últimos años es de: ' + buscando.length + '\n');
        } else {
            console.log("Error! el autor introducido no es válido, intente de nuevo con otro autor diferente.\n");
        }
    }else if(opcion === 8){ // Calculando el factor de impacto de un autor
         /**
         * Entendiendo que el "factor de impacto acumulado por el autor en los últimos años" es el resultado de la división entre las producciones científicas
         * producidas por el autor y el total de articulos existentes
         */

        busquedaAutor = rl.question('Introduce nombre del autor: ');
        let buscando = listaArticulos.filter(busquedaPorAutores);
        
        if (buscando.length > 0) {
            console.log('El factor de impacto del autor "' + busquedaAutor + '" es de: ' + (buscando.length / listaArticulos.length) + '\n');

        } else {
            console.log("Error! el autor introducido no es válido, intente de nuevo con otro autor diferente.\n");
        }

    }else {
        console.log('El numero introducido no es válido\n');
    }
}