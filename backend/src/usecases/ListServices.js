class ListServices {
  constructor(otpGateway) {
    this.otpGateway = otpGateway;
  }

  async execute() {
    const res = await this.otpGateway.getServices();
    return res.data.map((s) => ({
      code: s.service_code,
      name: s.service_name,
      image: s.service_img,
    }));
  }
}

module.exports = ListServices;
