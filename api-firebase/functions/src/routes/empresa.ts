import * as express from 'express';
import * as admin from 'firebase-admin';
import Empresa from '../models/empresa';

import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const db = admin.firestore();

router.get('/', async (req, res, next) => {

    db.collection('empresa')
        .get()
        .then(snapshot => {

            const empresas = snapshot.docs.map(doc => doc.data());

            res.json({
                status: true,
                empresas: empresas
            })
        })
        .catch(() => {
            res.status(400).json({
                status: false,
                message: 'Error al recuperar las Empresas',
            });
        });
});


router.post('/', (req, res) => {

    const newEmpresa: Empresa = new Empresa();

    newEmpresa.nombre = req.body.nombre;

    newEmpresa.createdAt = new Date();
    newEmpresa.lastModified = new Date();

    newEmpresa.contactoPrincipal = req.body.contactoPrincipal;
    newEmpresa.notas = req.body.notas;
    newEmpresa.ofertas = req.body.ofertas;
    newEmpresa.seguimientos = req.body.seguimientos;
    newEmpresa.contactosAdicionales = req.body.contactosAdicionales;

    newEmpresa.id = uuidv4();

    const em = JSON.parse(JSON.stringify(newEmpresa));

    db.collection('empresa')
        .doc(newEmpresa.id)
        .set(em)
        .then(() => {
            res.status(200).json({
                status: true,
                message: 'Insercion correcta con uid: ' + newEmpresa.id,
                empresa: em
            });
        })
        .catch(() => {
            res.status(400).json({
                status: false,
                message: 'Error al insertar Empresa',
            });
        });
});

router.put('/:id', (req, res) => {


    const id = req.params.id;

    const newEmpresa: Empresa = new Empresa();

    newEmpresa.nombre = req.body.nombre;

    newEmpresa.lastModified = new Date();

    newEmpresa.contactoPrincipal = req.body.contactoPrincipal;
    newEmpresa.notas = req.body.notas;
    newEmpresa.ofertas = req.body.ofertas;
    newEmpresa.seguimientos = req.body.seguimientos;
    newEmpresa.contactosAdicionales = req.body.contactosAdicionales;

    const em = JSON.parse(JSON.stringify(newEmpresa));


    db.collection('empresa')
        .doc(id)
        .update(em)
        .then(() => {
            res.status(200).json({
                status: true,
                message: 'Empresa actualizada correctamente',
                empresa: em
            });
        })
        .catch(() => {
            res.status(400).json({
                status: false,
                message: 'No se encontro la Empresa para ser actualizado',
            });
        });
});

router.delete('/:id', async (req, res) => {

    const id = req.params.id;

    db.collection('empresa')
        .doc(id)
        .get()
        .then(snapshot => {
            if (snapshot.exists) {
                snapshot.ref.delete()
                    .then(() => {
                        res.status(200).json({
                            status: true,
                            message: 'Empresa eliminada correctamente',
                        });
                    });
            }
            else {
                res.status(404).json({
                    status: false,
                    message: 'No se encontro la Empresa para eliminar',
                });
            }
        })
        .catch(() => {
            res.status(400).json({
                status: false,
                message: 'No se encontro la Empresa para eliminar',
            });
        });
});


export = router;
