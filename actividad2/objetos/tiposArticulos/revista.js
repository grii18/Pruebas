const ArticuloCientifico = require('../articuloCientifico').ArticuloCientifico;

class ArticuloDeRevista extends ArticuloCientifico{

    /**
     * 
     * @param {Number} id
     * @param {String} titulo 
     * @param {Array} autores 
     * @param {Number} numpags 
     * @param {Number} publicacion 
     * @param {Number} menciones 
     * @param {String} nombreRevista 
     * @param {String} editorial 
     * @param {Number} factorDeImpacto 
     */
    constructor(id, titulo, autores, numpags, publicacion, menciones, nombreRevista, editorial, factorDeImpacto){
        super(id, titulo, autores, numpags, publicacion, menciones);
        this.nombreRevista = nombreRevista;
        this.editorial = editorial;
        this.factorDeImpacto = factorDeImpacto;
        this.tipoArticulo = "tipoRevista";
    }

}

exports.ArticuloDeRevista = ArticuloDeRevista;