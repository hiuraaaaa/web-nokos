class GetPaymentChannels {
  constructor(tripayGateway) {
    this.tripayGateway = tripayGateway;
  }

  async execute() {
    return this.tripayGateway.getPaymentChannels();
  }
}

module.exports = GetPaymentChannels;
