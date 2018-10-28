class PatentesCientificas {
    /**
     * 
     * @param {Number} id 
     * @param {Array} autores 
     * @param {Number} publicacion 
     * @param {Number} vencePatente 
     */
    constructor(id, autores, publicacion, vencePatente){
        this.id = id;
        this.autores = autores;
        this.publicacion = publicacion;
        this.vencePatente = vencePatente;
        this.tipoArticulo = "Patente";
    }

    cambiarAutoresPatente(nuevosAutoresPatente){
        this.autoresPatentes = nuevosAutoresPatente;
    }

    cambiarAnyoPublicacion(nuevoAnyoPublicacion){
        this.anyoPublicacion = nuevoAnyoPublicacion;
    }

    cambiarVencePatente(nuevoVencePatente){
        this.vencePatente = nuevoVencePatente;
    }
}

exports.PatentesCientificas = PatentesCientificas;