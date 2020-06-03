import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Firebase Admin

const serviceAccount = require("./firebase-key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://seguimientolaboral-cf3fd.firebaseio.com"
});

// Express goes here!!!

import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from "body-parser";

import * as freelanceRouter from './routes/freelance';
import * as empresaRouter from './routes/empresa';
import * as contactoFreelanceRouter from './routes/contactoFreelance';
import * as contactoEmpresaRouter from './routes/contactoEmpresa';

const app = express();
const main = express();

// En app configuramos nuestro middleware, de manera normal
// la ruta sera http://localhost:5000/seguimientolaboral-cf3fd/us-central/api/v1/empresa
app.use('/freelance', freelanceRouter);
app.use('/freelance/contactos', contactoFreelanceRouter);


app.use('/empresa', empresaRouter);
app.use('/empresa/contactos', contactoFreelanceRouter);

// En main configuramos el endpoint principal de Firebase
// como si fuera nuestra app express.

// Esta sentencia es la clave
main.use('/v1', app);

// tslint:disable-next-line: deprecation
main.use(bodyParser.json());
// tslint:disable-next-line: deprecation
main.use(bodyParser.urlencoded({ extended: false }));

main.use(cors({origin: true}));


export const api = functions.https.onRequest(main);
