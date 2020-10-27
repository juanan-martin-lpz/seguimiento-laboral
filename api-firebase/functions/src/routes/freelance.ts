import * as express from 'express';
import * as admin from 'firebase-admin';
import { Freelance, FreelanceOfferState } from '../models/freelance';

import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const db = admin.firestore();

router.get('/', (req, res) => {

    db.collection('freelance')
        .get()
        .then(snapshot => {

            const freelances = snapshot.docs.map(doc => doc.data());

            res.json({
                status: true,
                freelances: freelances
            })
        })
        .catch(() => {
            res.status(400).json({
                status: false,
                message: 'Error al recuperar los Freelances',
            });
        });


});


router.post('/', (req, res) => {

    const newFreelance: Freelance = new Freelance();

    newFreelance.nombre = req.body.nombre;

    newFreelance.createdAt = new Date();
    newFreelance.lastModified = new Date();

    newFreelance.state: = FreelanceOfferState.OPEN;

    newFreelance.descripcionOferta = req.body.descipcionOferta;
    newFreelance.lenguajes = req.body.lenguajes;
    newFreelance.frameworks = req.body.frameworks;

    newFreelance.contactoPrincipal = req.body.contactoPrincipal;
    newFreelance.notas = req.body.notas;
    newFreelance.seguimientos = req.body.seguimientos;
    newFreelance.contactosAdicionales = req.body.contactosAdicionales;

    newFreelance.id = uuidv4();

    const fl = JSON.parse(JSON.stringify(newFreelance));

    db.collection('empresa')
        .doc(newFreelance.id)
        .set(fl)
        .then(() => {
            res.status(200).json({
                status: true,
                message: 'Insercion correcta con uid: ' + newFreelance.id,
                empresa: fl
            });
        })
        .catch(() => {
            res.status(400).json({
                status: false,
                message: 'Error al insertar Freelance',
            });
        });
});

router.put('/:id', async (req, res) => {

    const id = req.params.id;

    const newFreelance: Freelance = new Freelance();

    newFreelance.nombre = req.body.nombre;

    newFreelance.createdAt = new Date();
    newFreelance.lastModified = new Date();

    newFreelance.state: = FreelanceOfferState.OPEN;

    newFreelance.descripcionOferta = req.body.descipcionOferta;
    newFreelance.lenguajes = req.body.lenguajes;
    newFreelance.frameworks = req.body.frameworks;

    newFreelance.contactoPrincipal = req.body.contactoPrincipal;
    newFreelance.notas = req.body.notas;
    newFreelance.seguimientos = req.body.seguimientos;
    newFreelance.contactosAdicionales = req.body.contactosAdicionales;

    const fl = JSON.parse(JSON.stringify(newFreelance));

    db.collection('freelance')
        .doc(id)
        .update(fl)
        .then(() => {
            res.status(200).json({
                status: true,
                message: 'Freelance actualizada correctamente',
                freelance: fl
            });
        })
        .catch(() => {
            res.status(400).json({
                status: false,
                message: 'No se encontro el Freelance para ser actualizado',
            });
        });
});

router.delete('/:id', async (req, res) => {

    const id = req.params.id;

    db.collection('freelance')
        .doc(id)
        .get()
        .then(snapshot => {
            if (snapshot.exists) {
                snapshot.ref.delete()
                    .then(() => {
                        res.status(200).json({
                            status: true,
                            message: 'Freelance eliminado correctamente',
                        });
                    });
            }
            else {
                res.status(404).json({
                    status: false,
                    message: 'No se encontro el Freelance para eliminar',
                });
            }
        })
        .catch(() => {
            res.status(400).json({
                status: false,
                message: 'No se encontro el Freelance para eliminar',
            });
        });
});


export = router;
