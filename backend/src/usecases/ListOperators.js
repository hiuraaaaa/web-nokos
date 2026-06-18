class ListOperators {
  constructor(otpGateway) {
    this.otpGateway = otpGateway;
  }

  async execute(country, providerId) {
    const res = await this.otpGateway.getOperators(country, providerId);
    return res.data.map((o) => ({ id: o.id, name: o.name, image: o.image }));
  }
}

module.exports = ListOperators;
