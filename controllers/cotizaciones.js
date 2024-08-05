const axios = require('axios');
let mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { send_mail } = require("./email");
const dotenv = require('dotenv');
dotenv.config();
let text = require('../db/prices.json');

const languages = text.languages;
const prices = text.prices;

// Función para obtener el país del usuario desde ipinfo.io
const getCountryFromIp = async (req, res, next) => {
  const userIp = req.params.id;
  const token = process.env.IP_INFO_TOKEN;
  try {
    const response = await axios.get(`https://ipinfo.io/${userIp}/json?token=${token}`);
    const country = response.data.country || 'US'; // Default to 'US' if country not found
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.json({ country });
  } catch (error) {
    console.error("Error fetching country data", error);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.json({ country: 'US' }); // Default to 'US' in case of error
  }
};

// Función para obtener los textos y precios según el país
const getTextsAndPrices = (country, language) => {
  const countryPrices = prices[country] || prices['US']; // Default to 'US' prices if country not found
  const languageTexts = languages[language];
  
  if (!languageTexts) {
    throw new Error(`Language texts for '${language}' not found`);
  }

  return {
    Basic: {
      ...languageTexts.Basic,
      price: countryPrices.Basic
    },
    Standard: {
      ...languageTexts.Standard,
      price: countryPrices.Standard
    },
    Premium: {
      ...languageTexts.Premium,
      price: countryPrices.Premium
    }
  };
};

// Endpoint para obtener textos y precios
const getTextsAndPricesEndpoint = async (req, res) => {
  const userIp = req.params.id;
  const lang = req.params.lang;
  const token = process.env.IP_INFO_TOKEN;
  try {
    const response = await axios.get(`https://ipinfo.io/${userIp}/json?token=${token}`);
    const country = response.data.country || 'US'; // Default to 'US' if country not found
    const language = lang; // Get language from query parameter, default to 'en'

    const textsAndPrices = getTextsAndPrices(country, language);
    
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.json({'content':textsAndPrices, 'country':country});
  } catch (error) {
    console.error("Error fetching data", error);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 500;
    res.json({ error: "Error fetching data" });
  }
};

const getAll_cotizaciones = async (req, res, next) => {
  try {
    const result = await mongodb.getCluster().db().collection('cotizaciones').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.json(lists);
    });
  }catch(error){
    res.status(400).json({message: error});
  }
};

const getSingle_cotizaciones = async (req, res, next) => {
    try {
      const userId = new ObjectId(req.params.id);
      const result = await mongodb.getCluster().db().collection('cotizaciones').find({ _id: userId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.json(lists[0]);
      });
    }catch(error){
      res.status(400).json({message: error});
    }
};

const post_cotizaciones = async (req, res, next) => {
    // console.log(req.body);
    const timestamp = new Date().toJSON();

    if(!validateEmail(req.body.email)) res.status(500).json({ error: 'Correo inválido' });

    const data = {
        "email": req.body.email,
        "date": timestamp,
    };

    try {
        const existingRecord = await mongodb.getCluster().db().collection('cotizaciones').findOne({ email: req.body.email });

        if (existingRecord) {
            res.status(400).json({ error: 'Ya existe una cotización para este correo electrónico' });
        } else {
            const response = await mongodb.getCluster().db().collection('cotizaciones').insertOne(data);
            if (response.acknowledged) {
                // Envía el correo electrónico si la inserción en la base de datos es exitosa
                await send_mail(req, res);
            } else {
                res.status(500).json(response.error || 'Some error occurred while creating the contact.');
            }
        }
    } catch(error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
};  

const update_cotizaciones = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const timestamp = new Date().toJSON();
  const data = {
        "email": req.body.cod_tra,
        "date": timestamp,
  };
  const response = await mongodb.getCluster().db().collection('cotizaciones')
  .replaceOne({ _id: userId }, data);
  if(response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error ocurred while updating the contact.');
  }
}

const delete_cotizaciones = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getCluster().db().collection('cotizaciones').deleteOne({ _id: userId });
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
    getAll_cotizaciones,
    getSingle_cotizaciones,
    post_cotizaciones,
    update_cotizaciones,
    delete_cotizaciones,
    getCountryFromIp,
    getTextsAndPricesEndpoint
}