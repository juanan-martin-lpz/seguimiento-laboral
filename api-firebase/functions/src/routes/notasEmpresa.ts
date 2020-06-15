import * as express from 'express';
import * as admin from 'firebase-admin';


//import Empresa from '../models/empresa';
//import Nota from '../models/nota';



import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const db = admin.firestore();


router.get('/:empresa', async (req, res) => {

    const fl  = req.params.empresa;

    const notas = await db.collection('empresa').doc(fl).collection('notas').get();


    if (notas) {
        return res.status(200).json({
            status: true,
            message: 'Notas Empresa Recuperados correctamente',
            notas: notas.docs.map(doc => doc.data())
        });
    }
    else {
        return res.status(400).json({
            status: false,
            message: 'Error al recuperar las Notas del Empresa',
        });
    }
});


router.post('/:empresa', async (req, res) => {

    const nota = req.body;
    const fl = req.params.empresa;

    const notas = await db.collection('empresa').doc(fl).collection('notas');
       
    nota.id = uuidv4();

    await notas.doc(nota.id).set(nota).then( resp => {
        return res.status(200).json({
            status: true,
            message: 'Nota de la Empresa guardada correctamente',
            nota: nota
        });    
    })
    .catch( err => {

        return res.status(400).json({
            status: false,
            message: 'Error al guardar la Nota de la Empresa',
            errors: err
        });
    });
});


router.put('/:empresa/:id', async (req, res) => {
    
    const nota = req.body;

    const id = req.params.id;
    const fl = req.params.empresa;

    const notas = await db.collection('empresa').doc(fl).collection('notas').doc(id);
       
    await notas.set(nota).then( resp => {
        return res.status(200).json({
            status: true,
            message: 'Notas de la Empresa actualizadas correctamente',
            notas: notas
        });    
    })
    .catch( err => {

        return res.status(400).json({
            status: false,
            message: 'Error al guardar la Nota de la Empresa',
            errors: err
        });
    });

});


router.delete('/:empresa/:id', async (req, res) => {
    
    
    const id = req.params.id;
    const fl = req.params.empresa;

    await db.collection('empresa').doc(fl).collection('notas').doc(id).delete().then( resp => {
        return res.status(200).json({
            status: true,
            message: 'Nota de la Empresa eliminado correctamente',
        });    
    })
    .catch( err => {

        return res.status(400).json({
            status: false,
            message: 'Error al eliminar la Nota de la Empresa',
            errors: err
        });
    });
});


export = router;