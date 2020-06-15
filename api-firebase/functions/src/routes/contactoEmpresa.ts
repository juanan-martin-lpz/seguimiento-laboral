import * as express from 'express';
import * as admin from 'firebase-admin';



import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const db = admin.firestore();


router.get('/:empresa', async (req, res) => {

    const fl  = req.params.empresa;

    const contactos = await db.collection('empresa').doc(fl).collection('contactos').get();


    if (contactos) {
        return res.status(200).json({
            status: true,
            message: 'Contactos Empresa Recuperados correctamente',
            contactos: contactos.docs.map(doc => doc.data())
        });
    }
    else {
        return res.status(400).json({
            status: false,
            message: 'Error al recuperar los contactos Freelance',
        });
    }
});


router.post('/:empresa', async (req, res) => {

    const contacto = req.body;
    const fl = req.params.empresa;

    const contactos = await db.collection('empresa').doc(fl).collection('contactos');
       
    contacto.id = uuidv4();

    await contactos.doc(contacto.id).set(contacto).then( resp => {
        return res.status(200).json({
            status: true,
            message: 'Contacto de la Empresa  guardado correctamente',
            contacto: contacto
        });    
    })
    .catch( err => {

        return res.status(400).json({
            status: false,
            message: 'Error al guardar del contacto de la Empresa',
            errors: err
        });
    });
});


router.put('/:empresa', async (req, res) => {
    
    const contacto = req.body;

    const fl = req.params.empresa;

    const cont = await db.collection('empresa').doc(fl).collection('contactos').doc(contacto.id);
       
    await cont.set(contacto).then( resp => {
        return res.status(200).json({
            status: true,
            message: 'Contacto de la Empresa actualizado correctamente',
            contacto: contacto
        });    
    })
    .catch( err => {

        return res.status(400).json({
            status: false,
            message: 'Error al guardar del contacto de la Empresa',
            errors: err
        });
    });

});


router.delete('/:empresa', async (req, res) => {
    
    const contacto = req.body;

    const fl = req.params.empresa;

    await db.collection('empresa').doc(fl).collection('contactos').doc(contacto.id).delete().then( resp => {
        return res.status(200).json({
            status: true,
            message: 'Contacto de la Empresa eliminado correctamente',
        });    
    })
    .catch( err => {

        return res.status(400).json({
            status: false,
            message: 'Error al eliminar el contacto de la Empresa',
            errors: err
        });
    });
});


export = router;