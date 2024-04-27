let mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { send_mail_newsletter } = require("./email");

const getAll_newsletter = async (req, res, next) => {
  try {
    const result = await mongodb.getCluster().db().collection('newsletter').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.json(lists);
    });
  }catch(error){
    res.status(400).json({message: error});
  }
};

const getSingle_newsletter = async (req, res, next) => {
    try {
      const userId = new ObjectId(req.params.id);
      const result = await mongodb.getCluster().db().collection('newsletter').find({ _id: userId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.json(lists[0]);
      });
    }catch(error){
      res.status(400).json({message: error});
    }
};

const post_newsletter = async (req, res, next) => {
    // console.log(req.body);
    const timestamp = new Date().toJSON();

    if(!validateEmail(req.body.email)) res.status(500).json({ error: 'Correo inválido' });
    
    const data = {
        "email": req.body.email,
        "date": timestamp,
    };

    try {
        const existingRecord = await mongodb.getCluster().db().collection('newsletter').findOne({ email: req.body.email });

        if (existingRecord) {
            res.status(400).json({ error: 'Ya existe una suscripcion para este correo electrónico' });
        } else {
            const response = await mongodb.getCluster().db().collection('newsletter').insertOne(data);
            if (response.acknowledged) {
                // Envía el correo electrónico si la inserción en la base de datos es exitosa
                await send_mail_newsletter(req, res);
            } else {
                res.status(500).json(response.error || 'Some error occurred while creating the contact.');
            }
        }
    } catch(error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
};  

const update_newsletter = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const timestamp = new Date().toJSON();
  const data = {
        "email": req.body.cod_tra,
        "date": timestamp,
  };
  const response = await mongodb.getCluster().db().collection('newsletter')
  .replaceOne({ _id: userId }, data);
  if(response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error ocurred while updating the contact.');
  }
}

const delete_newsletter = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getCluster().db().collection('newsletter').deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
}

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

module.exports = {
    getAll_newsletter,
    getSingle_newsletter,
    post_newsletter,
    update_newsletter,
    delete_newsletter
}