import Nota from './nota';

export default class Contacto {

    id!: string;
  
    createdAt: Date = new Date();
    lastModified: Date = new Date();
  
    nombre!: string; //{type: String, required: true},
    //{type: String, required: true},
    email!: string; //{type: String, required: false},
     //{type: String, required: false},
    telefono!: string; //{type: String, required: false},
  //{type: String, required: false},
    linkedin!: string; //{type: String, required: false},
 //{type: String, required: false},
    twitter!: string; //{type: String, required: false},
   //{type: String, required: false},
    facebook!: string; //{type: String, required: false},
  //{type: String, required: false},
    web!: string; //{type: String, required: false},   
       //{type: String, required: false},   
    notas!: Nota[]; //{type: Schema.Types.ObjectId , ref: Nota, required: false}
     //{type: Schema.Types.ObjectId , ref: Nota, required: false}
    
}

