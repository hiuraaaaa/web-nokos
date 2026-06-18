const usecases = require('../container');

async function getBalance(req, res) {
  try {
    const balance = await usecases.getBalance.execute();
    res.json({ success: true, data: balance });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
}

module.exports = { getBalance };
