const express = require('express');
const router = express.Router();

const ContrEv = require('../controlador/OpEventos.js'); //Extrae los módulos del archivo OpEventos.js

//Esos modulos son usados para cada enlace al que se entra
router.get('/', ContrEv.ListaEventos);
router.get('/:id', ContrEv.ListaEventosID);
router.post('/', ContrEv.CrearEvento);
router.put('/:id', ContrEv.ActualizarEvento);
router.delete('/:id', ContrEv.EliminarEvento);

module.exports = router;