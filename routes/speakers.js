const express = require('express');
const router = express.Router();

const speakersController = require('../controllers/speakers');

router.get('/', speakersController.getAll);

router.get('/:id', speakersController.getSingle);

router.post('/', speakersController.createSpeaker);

router.put('/:id', speakersController.updateSpeaker);

router.delete('/:id', speakersController.deleteSpeaker);

module.exports = router;