import * as express from 'express';
import * as admin from 'firebase-admin';

import { v4 as uuidv4 } from 'uuid';
import framework from '../models/framework';
import Framework from '../models/framework';

const router = express.Router();

const db = admin.firestore();


router.get('/', async (req, res) => {
    const framework = db.collection('framework');
    const docsSnapshot = await framework.get();

    const frameworks = docsSnapshot.docs.map(doc => doc.data()); 
    res.json( frameworks );    

});

router.post('/', async (req, res) => {
    const fl: Framework = req.body;

    const framework = db.collection('framework');
  
    fl.id = uuidv4();

    await framework.doc(fl.id).set(fl).then( r => {
        res.status(200).json({
            status: true,
            message: 'Insercion correcta con uid :' + fl.id,
            framework: fl
        });
    })
    .catch( e => {
        res.status(400).json({
            status: false,
            message: 'Error al insertar framework',
            errors: e
        });
    })

});

router.put('/', async (req, res) => {

    const fl: framework = req.body;
    const framework = await db.collection('framework').doc(fl.id);

    if (framework) {
        framework.set(fl).then( r => {
            console.log(r);

            res.status(200).json({
                status: true,
                message: 'framework actualizado correctamente',
                framework: fl
            });
        })
        .catch ( e => {
            res.status(400).json({
                status: false,
                message: 'Error al actualizar framework',
                errors: e
            });
        });
    }
    else {
        res.status(400).json({
            status: false,
            message: 'No se encontro el framework para ser actualizado',
        });
    }        
});   

router.delete('/', async (req, res) => {

    const fl: framework = req.body;
    const framework = await db.collection('framework').doc(fl.id);

    if (framework) {
        framework.delete().then( r => {
            res.status(200).json({
                status: true,
                message: 'framework eliminado correctamente',
                empresa: fl
            });
        })
        .catch( e => {
            res.status(400).json({
                status: false,
                message: 'Error al eliminar el framework',
                errors: e
            });
        });    
    }
    else {
        res.status(400).json({
            status: false,
            message: 'No se encontro el framework para eliminar',
        });
    }

    return res;
});


export = router;