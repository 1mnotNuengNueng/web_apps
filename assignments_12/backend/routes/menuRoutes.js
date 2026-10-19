const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const { requireRole } = require('../auth');

router.get('/', menuController.getAllMenus);
router.get('/:id', menuController.getMenuById);
router.post('/', requireRole('admin'), menuController.createMenu);
router.put('/:id', requireRole('admin'), menuController.updateMenu);
router.delete('/:id', requireRole('admin'), menuController.deleteMenu);
router.put('/:id/rating', requireRole('user'), menuController.rateMenu);

module.exports = router;
