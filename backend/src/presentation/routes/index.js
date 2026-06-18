const express = require('express');
const balanceController = require('../controllers/balanceController');
const catalogController = require('../controllers/catalogController');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.get('/balance', balanceController.getBalance);

router.get('/services', catalogController.getServices);
router.get('/countries', catalogController.getCountries);
router.get('/operators', catalogController.getOperators);

router.get('/orders', orderController.listHistory);
router.post('/orders', orderController.createOrder);
router.get('/orders/:orderId', orderController.checkOrder);
router.post('/orders/:orderId/status', orderController.setOrderStatus);

module.exports = router;
