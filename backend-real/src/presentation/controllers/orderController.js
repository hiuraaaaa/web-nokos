const usecases = require('../container');

async function createOrder(req, res) {
  try {
    const { number_id, provider_id, operator_id } = req.body;
    if (!number_id || !provider_id || !operator_id) {
      return res.status(400).json({ success: false, message: 'number_id, provider_id, operator_id wajib diisi' });
    }
    const order = await usecases.createOrder.execute({
      userId: req.user.id,
      numberId: number_id,
      providerId: provider_id,
      operatorId: operator_id,
    });
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
}

async function checkOrder(req, res) {
  try {
    const order = await usecases.checkOrderStatus.execute(req.params.orderId, req.user.id);
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
}

async function setOrderStatus(req, res) {
  try {
    const { status } = req.body;
    if (!['cancel', 'done', 'resend'].includes(status)) {
      return res.status(400).json({ success: false, message: 'status tidak valid' });
    }
    const order = await usecases.setOrderStatus.execute(req.params.orderId, status, req.user.id);
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
}

async function listHistory(req, res) {
  try {
    // Hanya return order milik user yang login
    const orders = await usecases.listOrderHistory.execute(req.user.id);
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
}

module.exports = { createOrder, checkOrder, setOrderStatus, listHistory };
