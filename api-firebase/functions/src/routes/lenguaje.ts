import * as express from 'express';
import * as admin from 'firebase-admin';

import { v4 as uuidv4 } from 'uuid';
import Lenguaje from '../models/lenguaje';

const router = express.Router();

const db = admin.firestore();

router.get('/', async (req, res) => {

    db.collection('lenguaje')
        .get()
        .then(snapshot => {

            const lenguajes = snapshot.docs.map(doc => doc.data());

            res.json({
                status: true,
                lenguajes: lenguajes
            })
        })
        .catch(() => {
            res.status(400).json({
                status: false,
                message: 'Error al recuperar los Lenguajes',
            });
        });
});

router.post('/', async (req, res) => {

    const newLenguaje: Lenguaje = new Lenguaje();

    newLenguaje.nombre = req.body.nombre;


    newLenguaje.id = uuidv4();

    const ln = JSON.parse(JSON.stringify(newLenguaje));

    db.collection('lenguaje')
        .doc(newLenguaje.id)
        .set(ln)
        .then(() => {
            res.status(200).json({
                status: true,
                message: 'Insercion correcta con uid: ' + newLenguaje.id,
                lenguaje: ln
            });
        })
        .catch(() => {
            res.status(400).json({
                status: false,
                message: 'Error al insertar Lenguaje',
            });
        });
});

router.put('/:id', async (req, res) => {

    const id = req.params.id;

    const newLenguaje: Lenguaje = new Lenguaje();

    newLenguaje.nombre = req.body.nombre;

    const ln = JSON.parse(JSON.stringify(newLenguaje));


    db.collection('lenguaje')
        .doc(id)
        .update(ln)
        .then(() => {
            res.status(200).json({
                status: true,
                message: 'Lenguaje actualizado correctamente',
                framework: fr
            });
        })
        .catch(() => {
            res.status(400).json({
                status: false,
                message: 'No se encontro el Lenguaje para ser actualizado',
            });
        });
});

router.delete('/:id', async (req, res) => {

    const id = req.params.id;

    db.collection('lenguaje')
        .doc(id)
        .get()
        .then(snapshot => {
            if (snapshot.exists) {
                snapshot.ref.delete()
                    .then(() => {
                        res.status(200).json({
                            status: true,
                            message: 'Lenguaje eliminado correctamente',
                        });
                    });
            }
            else {
                res.status(404).json({
                    status: false,
                    message: 'No se encontro el Lenguaje para eliminar',
                });
            }
        })
        .catch(() => {
            res.status(400).json({
                status: false,
                message: 'No se encontro el Lenguaje para eliminar',
            });
        });
});



export = router;
