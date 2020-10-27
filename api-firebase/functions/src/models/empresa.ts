import Nota from './nota';
import Contacto from './contacto';
import SeguimientoEmpresa from './seguimientoEmpresa';
import OfertasEmpresa from './ofertasempresa';



export default class Empresa {

    id!: string;

    nombre!: string;

    createdAt: Date = new Date();
    lastModified: Date = new Date();

    linkendin!: String;
    twitter!: String;
    facebook!: String;
    web!: String;


    contactoPrincipal!: Contacto;

    notas: Nota[] = []; //{type: Schema.Types.ObjectId , ref: Nota, required: false},
    //{type: Schema.Types.ObjectId , ref: Nota, required: false},
    ofertas: OfertasEmpresa[] = []; // {type: Schema.Types.ObjectId , ref: 'SeguimientoEmpresa', required: false},
    // {type: Schema.Types.ObjectId , ref: 'SeguimientoEmpresa', required: false},

    seguimientos: SeguimientoEmpresa[] = []; // {type: Schema.Types.ObjectId , ref: 'SeguimientoEmpresa', required: false},

    contactosAdicionales: Contacto[] = []; //{type: Schema.Types.ObjectId , ref: 'Contacto', required: false}
    //{type: Schema.Types.ObjectId , ref: 'Contacto', required: false}
}
