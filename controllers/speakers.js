const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('speakers').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('speakers').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createSpeaker = async (req, res) => {
  const speaker = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    askedBy: req.body.askedBy,
    lastSpoken: req.body.lastSpoken,
    topic: req.body.topic
  };
  const response = await mongodb.getDb().db().collection('speakers').insertOne(speaker);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the speaker.');
  }
};

const updateSpeaker = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    askedBy: req.body.askedBy,
    lastSpoken: req.body.lastSpoken,
    topic: req.body.topic
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('speakers')
    .replaceOne({ _id: userId }, speakers);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the speaker.');
  }
};

const deleteSpeaker = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('speakers').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'you messed aa-ron.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createSpeaker,
  updateSpeaker,
  deleteSpeaker
};