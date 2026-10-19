const express = require('express');
const router = express.Router();
const typeController = require('../controllers/typeController');
const { requireRole } = require('../auth');

router.get('/', typeController.getAllTypes);
router.get('/:id', typeController.getTypeById);
router.post('/', requireRole('admin'), typeController.createType);
router.put('/:id', requireRole('admin'), typeController.updateType);
router.delete('/:id', requireRole('admin'), typeController.deleteType);

module.exports = router;
