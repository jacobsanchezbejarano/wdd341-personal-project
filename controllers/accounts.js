let mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getCluster().db().collection('plan').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.json(lists);
  });
};

const getSingle = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getCluster().db().collection('plan').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.json(lists[0]);
    });
};

const post_account = async (req, res, next) => {
  console.log(req.body);
  const data = req.body;

    const response = await mongodb.getCluster().db().collection('plan').insertOne(data);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
}

// const update_account = async (req, res, next) => {
//   const userId = new ObjectId(req.params.id);
//   const data = req.body;

//   const response = await mongodb.getCluster().db().collection('plan')
//   .replaceOne({ _id: userId }, data);
  
//   if(response.modifiedCount > 0) {
//     res.status(204).send();
//   } else {
//     res.status(500).json(response.error || 'Some error ocurred while updating the contact.');
//   }

// }

// const delete_account = async (req, res, next) => {
//   const userId = new ObjectId(req.params.id);

//   const response = await mongodb.getCluster().db().collection('plan').deleteOne({ _id: userId });
//   if (response.deletedCount > 0) {
//     res.status(200).send();
//   } else {
//     res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
//   }
// }

module.exports = {
    getAll,
    getSingle,
    post_account,
    //update_account,
    //delete_account
}