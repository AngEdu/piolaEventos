const express = require('express');
const router = express.Router();

router.use('/Eventos', require('./Eventos')) //Toma los modulos de el archivo Eventos
router.get('/', (req, res) => 
{
	res.sendFile(__dirname + '/index.html');
});

module.exports = router;