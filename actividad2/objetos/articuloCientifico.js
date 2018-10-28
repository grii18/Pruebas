class ArticuloCientifico {
  
  /**
   * @param {Number} id
   * @param {String} titulo 
   * @param {Array} autores 
   * @param {Number} numpags 
   * @param {Number} publicacion 
   * @param {Number} menciones 
   */
  constructor(id, titulo, autores, numpags, publicacion, menciones){
    this.id = id;
    this.titulo = titulo;
    this.autores = autores;
    this.numpags = numpags;
    this.publicacion = publicacion;
    this.menciones = menciones;
    this.estado = true;
  };

}

exports.ArticuloCientifico = ArticuloCientifico;
