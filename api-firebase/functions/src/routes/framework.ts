import * as express from 'express';
import * as admin from 'firebase-admin';

import { v4 as uuidv4 } from 'uuid';

import Framework from '../models/framework';

const router = express.Router();

const db = admin.firestore();


router.get('/', async (req, res) => {

    db.collection('framework')
        .get()
        .then(snapshot => {

            const frameworks = snapshot.docs.map(doc => doc.data());

            res.json({
                status: true,
                frameworks: frameworks
            })
        })
        .catch(() => {
            res.status(400).json({
                status: false,
                message: 'Error al recuperar los Frameworks',
            });
        });
});

router.post('/', async (req, res) => {

    const newFramework: Framework = new Framework();

    newFramework.nombre = req.body.nombre;


    newFramework.id = uuidv4();

    const fr = JSON.parse(JSON.stringify(newFramework));

    db.collection('framework')
        .doc(newFramework.id)
        .set(fr)
        .then(() => {
            res.status(200).json({
                status: true,
                message: 'Insercion correcta con uid: ' + newFramework.id,
                framework: fr
            });
        })
        .catch(() => {
            res.status(400).json({
                status: false,
                message: 'Error al insertar Framework',
            });
        });
});

router.put('/:id', async (req, res) => {

    const id = req.params.id;

    const newFramework: Framework = new Framework();

    newFramework.nombre = req.body.nombre;

    const fr = JSON.parse(JSON.stringify(newFramework));


    db.collection('framework')
        .doc(id)
        .update(fr)
        .then(() => {
            res.status(200).json({
                status: true,
                message: 'Framework actualizado correctamente',
                framework: fr
            });
        })
        .catch(() => {
            res.status(400).json({
                status: false,
                message: 'No se encontro el Framework para ser actualizado',
            });
        });
});

router.delete('/:id', async (req, res) => {

    const id = req.params.id;

    db.collection('framework')
        .doc(id)
        .get()
        .then(snapshot => {
            if (snapshot.exists) {
                snapshot.ref.delete()
                    .then(() => {
                        res.status(200).json({
                            status: true,
                            message: 'Framework eliminado correctamente',
                        });
                    });
            }
            else {
                res.status(404).json({
                    status: false,
                    message: 'No se encontro el Frameowrk para eliminar',
                });
            }
        })
        .catch(() => {
            res.status(400).json({
                status: false,
                message: 'No se encontro el Framework para eliminar',
            });
        });
});


export = router;
