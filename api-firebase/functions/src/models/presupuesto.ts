import Lenguaje from "./lenguaje";
import Framework from "./framework";
import Nota from "./nota";

export enum PresupuestoState {
    OPEN,                    // ABIERTA, EN ESTUDIO
    SENT,                    // ENVIADA
    AWAITING,                // ESPERANDO NOTICIAS
    REJECTED,                // RECHAZADO POR LA EMPRESA
    ACCEPTED                 // ACEPTADO
}

export enum TipoPresupuesto {
    LUMPSUM,                // SUMA TOTAL
    HOURLY                  // POR HORAS
}

export default class Presupuesto {
    
    
    id!: string;
     
    createdAt: Date = new Date();

    lastModified: Date = new Date();

    state: PresupuestoState = PresupuestoState.OPEN;

    descripcion!: string;

    lenguajes: Lenguaje[] = [];
    frameworks: Framework[] = [];

    tipoPresupuesto: TipoPresupuesto = TipoPresupuesto.LUMPSUM;

    // Importes
    importeTotal: number = 0;   
    importeHora: number = 0;
    totalHoras: number = 0;

    // Estimaciones
    horasEstimadas: number = 0;
    diasEstimados: number = 0;

    // Fechas
    fechaInicio!: Date;
    fechaPrevista!: Date;
    fechaLimite!: Date;

    notas: Nota[] = []; //{type: Schema.Types.ObjectId , ref: Nota, required: false},
               //{type: Schema.Types.ObjectId , ref: Nota, required: false},
}