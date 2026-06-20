const express = require('express');
const auth = require('../middleware/auth');

const balanceController = require('../controllers/balanceController');
const catalogController = require('../controllers/catalogController');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');
const topupController = require('../controllers/topupController');

const router = express.Router();

// ── Auth (public) ──────────────────────────────────────────────────────────────
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// ── Topup webhook (public, verified via signature) ─────────────────────────────
router.post('/webhook/tripay', topupController.tripayWebhook);

// ── Protected routes (butuh JWT) ───────────────────────────────────────────────
router.use(auth);

// User
router.get('/auth/me', authController.me);

// Topup
router.post('/topup', topupController.createTopup);
router.get('/topup/history', topupController.getTopupHistory);
router.get('/topup/channels', topupController.getPaymentChannels);

// OTP (existing)
router.get('/balance', balanceController.getBalance);
router.get('/services', catalogController.getServices);
router.get('/countries', catalogController.getCountries);
router.get('/operators', catalogController.getOperators);

router.get('/orders', orderController.listHistory);
router.post('/orders', orderController.createOrder);
router.get('/orders/:orderId', orderController.checkOrder);
router.post('/orders/:orderId/status', orderController.setOrderStatus);

module.exports = router;
