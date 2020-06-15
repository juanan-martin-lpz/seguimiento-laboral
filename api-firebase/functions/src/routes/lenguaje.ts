import * as express from 'express';
import * as admin from 'firebase-admin';

import { v4 as uuidv4 } from 'uuid';
import Lenguaje from '../models/lenguaje';

const router = express.Router();

const db = admin.firestore();


router.get('/', async (req, res) => {
    const lenguaje = db.collection('lenguaje');
    const docsSnapshot = await lenguaje.get();

    const lenguajes = docsSnapshot.docs.map(doc => doc.data()); 
    res.json( lenguajes );    

});

router.post('/', async (req, res) => {
    const fl: Lenguaje = req.body;

    const lenguaje = db.collection('lenguaje');
  
    fl.id = uuidv4();

    await lenguaje.doc(fl.id).set(fl).then( r => {
        res.status(200).json({
            status: true,
            message: 'Insercion correcta con uid :' + fl.id,
            lenguaje: fl
        });
    })
    .catch( e => {
        res.status(400).json({
            status: false,
            message: 'Error al insertar Lenguaje',
            errors: e
        });
    })

});

router.put('/', async (req, res) => {

    const fl: Lenguaje = req.body;
    const lenguaje = await db.collection('lenguaje').doc(fl.id);

    if (lenguaje) {
        lenguaje.set(fl).then( r => {
            console.log(r);

            res.status(200).json({
                status: true,
                message: 'Lenguaje actualizado correctamente',
                lenguaje: fl
            });
        })
        .catch ( e => {
            res.status(400).json({
                status: false,
                message: 'Error al actualizar Lenguaje',
                errors: e
            });
        });
    }
    else {
        res.status(400).json({
            status: false,
            message: 'No se encontro el Lenguaje para ser actualizado',
        });
    }        
});   

router.delete('/', async (req, res) => {

    const fl: Lenguaje = req.body;
    const lenguaje = await db.collection('lenguaje').doc(fl.id);

    if (lenguaje) {
        lenguaje.delete().then( r => {
            res.status(200).json({
                status: true,
                message: 'Lenguaje eliminado correctamente',
                empresa: fl
            });
        })
        .catch( e => {
            res.status(400).json({
                status: false,
                message: 'Error al eliminar el Lenguaje',
                errors: e
            });
        });    
    }
    else {
        res.status(400).json({
            status: false,
            message: 'No se encontro el Lenguaje para eliminar',
        });
    }

    return res;
});


export = router;