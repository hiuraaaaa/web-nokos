class GetBalance {
  constructor(otpGateway) {
    this.otpGateway = otpGateway;
  }

  async execute() {
    const res = await this.otpGateway.getBalance();
    const d = res.data;
    return {
      amount: d.balance,
      formatted: d.formated,
      username: d.username,
      firstName: d.first_name,
      lastName: d.last_name,
      email: d.email,
    };
  }
}

module.exports = GetBalance;
