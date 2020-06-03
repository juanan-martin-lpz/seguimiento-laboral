import Contacto from './contacto';
import SeguimientoFreelance from './seguimientoFreelance';
import Nota from './nota';
import Lenguaje from './lenguaje';
import Framework from './framework';

export enum FreelanceOfferState {
        OPEN,
        CLOSED,
        NEGOTIATING,
        REJECTED,
        ACCEPTED
}

export default class Freelance {
    
    
    id!: string;
     
    createdAt: Date = new Date();

    lastModified: Date = new Date();

    state: FreelanceOfferState = FreelanceOfferState.OPEN;

    nombre!: string; // {type: String, required: true},
            // {type: String, required: true},

    descripcionOferta!: string;
    lenguajes: Lenguaje[] = [];
    frameworks: Framework[] = [];
    contactoPrincipal!: Contacto;

    notas: Nota[] = []; //{type: Schema.Types.ObjectId , ref: Nota, required: false},
               //{type: Schema.Types.ObjectId , ref: Nota, required: false},
    seguimientos: SeguimientoFreelance[] = []; // {type: Schema.Types.ObjectId , ref: 'SeguimientoEmpresa', required: false},
        // {type: Schema.Types.ObjectId , ref: 'SeguimientoEmpresa', required: false},
    contactosAdicionales: Contacto[] = []; //{type: Schema.Types.ObjectId , ref: 'Contacto', required: false}
        //{type: Schema.Types.ObjectId , ref: 'Contacto', required: false}
}