const usecases = require('../container');

async function getServices(req, res) {
  try {
    const services = await usecases.listServices.execute();
    res.json({ success: true, data: services });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
}

async function getCountries(req, res) {
  try {
    const { service_id } = req.query;
    if (!service_id) {
      return res.status(400).json({ success: false, message: 'service_id wajib diisi' });
    }
    const countries = await usecases.listCountries.execute(service_id);
    res.json({ success: true, data: countries });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
}

async function getOperators(req, res) {
  try {
    const { country, provider_id } = req.query;
    if (!country || !provider_id) {
      return res.status(400).json({ success: false, message: 'country dan provider_id wajib diisi' });
    }
    const operators = await usecases.listOperators.execute(country, provider_id);
    res.json({ success: true, data: operators });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
}

module.exports = { getServices, getCountries, getOperators };
