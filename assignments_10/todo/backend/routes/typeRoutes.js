const express = require('express');
const router = express.Router();
const typeController = require('../controllers/typeController');

router.get('/', typeController.getAllTypes);
router.get('/:id', typeController.getTypeById);
router.post('/', typeController.createType);

module.exports = router;
