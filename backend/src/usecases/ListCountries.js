class ListCountries {
  constructor(otpGateway) {
    this.otpGateway = otpGateway;
  }

  async execute(serviceId) {
    const res = await this.otpGateway.getCountries(serviceId);
    return res.data.map((c) => ({
      numberId: c.number_id,
      name: c.name,
      image: c.img,
      prefix: c.prefix,
      isoCode: c.iso_code,
      stockTotal: c.stock_total,
      pricelist: (c.pricelist || []).map((p) => ({
        providerId: p.provider_id,
        serverId: p.server_id,
        stock: p.stock,
        price: p.price,
        priceFormatted: p.price_format,
        available: p.available,
      })),
    }));
  }
}

module.exports = ListCountries;
