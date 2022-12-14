const mongodb = require('../bd/conexion.js');

//Consigue todos los eventos y los muestra en formato JSON
const ListaEventos = async (req, res, next) => 
{
    const Respuesta = await mongodb.getDb().db().collection('Evento').find(); //Almacena el resultado de la consulta en Respuesta
    Respuesta.toArray().then((eventos) => 
    {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(eventos); //Pone el resultado en pantalla en formato json
    });
};

//Consigue el evento corresponidente al ID que se ingresa
const ListaEventosID = async (req, res, next) => 
{
    const EventoID = parseInt(req.params.id);
    const Respuesta = await mongodb.getDb().db().collection('Evento').find({ ID: EventoID });//Consulta ahora buscando con ID

    Respuesta.toArray().then((eventos) => 
    {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(eventos[0]);
    });
};

//Agrega un evento con los datos del body
const CrearEvento = async (req, res, next) => 
{
    //JSON de los datos
    const Datos = 
    {
        ID:req.body.ID,
        Nombre:req.body.Nombre,
        Descripción:req.body.Descripción,
        Lugar:req.body.Lugar
    };

    const Respuesta = await mongodb.getDb().db().collection('Evento').insertOne(Datos); //Inserción de lo que hay en la variable Datos
    if (Respuesta.acknowledged)
        res.status(201).json(Respuesta);
    else
        res.status(500).json(Respuesta.error || 'Hubo un error al crear el evento.');
};

//Actualiza un evento según su ID
const ActualizarEvento = async (req, res, next) => 
{
    const EventoID = parseInt(req.params.id);

    const Datos = 
    {
        ID:req.body.ID,
        Nombre:req.body.Nombre,
        Descripción:req.body.Descripción,
        Lugar:req.body.Lugar
    };

    const Respuesta = await mongodb.getDb().db().collection('Evento').replaceOne({ ID: EventoID }, Datos);
    
    if (Respuesta.modifiedCount > 0)
        res.status(200).json(Respuesta);
    else
        res.status(500).json(Respuesta.error || 'Hubo un error al actualizar el evento.');
};

//Elimina un evento según su ID
const EliminarEvento = async (req, res, next) => {
    const EventoID = parseInt(req.params.id);
    const Respuesta = await mongodb.getDb().db().collection('Evento').deleteOne({ ID: EventoID }, true); //Busca el elemento según el ID y confirma el borrado

    if (Respuesta.deletedCount > 0) 
        res.status(200).json(Respuesta);
    else 
        res.status(500).json(Respuesta.error || 'Hubo un error al eliminar el evento.');
};

//Procesos que otros elementos podrán usar
module.exports = {ListaEventos, ListaEventosID, CrearEvento, ActualizarEvento, EliminarEvento };