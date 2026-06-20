const usecases = require('../container');

async function createTopup(req, res) {
  try {
    const { amount, payment_method } = req.body;
    if (!amount || !payment_method) {
      return res.status(400).json({ success: false, message: 'amount dan payment_method wajib diisi' });
    }
    const topup = await usecases.createTopup.execute({
      userId: req.user.id,
      amount: Number(amount),
      paymentMethod: payment_method,
    });
    res.status(201).json({ success: true, data: topup });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
}

async function getTopupHistory(req, res) {
  try {
    const topups = await usecases.getTopupHistory.execute(req.user.id);
    res.json({ success: true, data: topups });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
}

/**
 * Webhook dari Tripay — TIDAK pakai auth middleware,
 * verifikasi dilakukan via signature di usecase.
 */
async function tripayWebhook(req, res) {
  try {
    const signature = req.headers['x-callback-signature'];
    const result = await usecases.handleTripayWebhook.execute({
      payload: req.body,
      signature,
    });
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
}

async function getPaymentChannels(req, res) {
  try {
    const channels = await usecases.getPaymentChannels.execute();
    res.json({ success: true, data: channels });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
}

module.exports = { createTopup, getTopupHistory, tripayWebhook, getPaymentChannels };
