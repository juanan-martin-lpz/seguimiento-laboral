import * as express from 'express';
import * as admin from 'firebase-admin';


// import Freelance from '../models/freelance';
// import Nota from '../models/nota';



import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const db = admin.firestore();


router.get('/:freelance', async (req, res) => {

    const fl  = req.params.freelance;

    const notas = await db.collection('freelance').doc(fl).collection('notas').get();


    if (notas) {
        return res.status(200).json({
            status: true,
            message: 'Notas Freelance Recuperados correctamente',
            notas: notas.docs.map(doc => doc.data())
        });
    }
    else {
        return res.status(400).json({
            status: false,
            message: 'Error al recuperar las Notas del Freelance',
        });
    }
});


router.post('/:freelance', async (req, res) => {

    const nota = req.body;
    const fl = req.params.freelance;

    const notas = await db.collection('freelance').doc(fl).collection('notas');
       
    nota.id = uuidv4();

    await notas.doc(nota.id).set(nota).then( resp => {
        return res.status(200).json({
            status: true,
            message: 'Nota del Freelance guardado correctamente',
            nota: nota
        });    
    })
    .catch( err => {

        return res.status(400).json({
            status: false,
            message: 'Error al guardar la Nota del Freelance',
            errors: err
        });
    });
});


router.put('/:freelance/:id', async (req, res) => {
    
    const nota = req.body;

    const id = req.params.id;
    const fl = req.params.freelance;

    const notas = await db.collection('freelance').doc(fl).collection('notas').doc(id);
       
    await notas.set(nota).then( resp => {
        return res.status(200).json({
            status: true,
            message: 'Notas del Freelance actualizadas correctamente',
            notas: notas
        });    
    })
    .catch( err => {

        return res.status(400).json({
            status: false,
            message: 'Error al guardar la Nota del Freelance',
            errors: err
        });
    });

});


router.delete('/:freelance/:id', async (req, res) => {
    
    
    const id = req.params.id;
    const fl = req.params.freelance;

    await db.collection('freelance').doc(fl).collection('notas').doc(id).delete().then( resp => {
        return res.status(200).json({
            status: true,
            message: 'Nota del Freelance eliminado correctamente',
        });    
    })
    .catch( err => {

        return res.status(400).json({
            status: false,
            message: 'Error al eliminar la Nota del Freelance',
            errors: err
        });
    });
});


export = router;