const RumahOtpGateway = require('../infrastructure/http/RumahOtpGateway');
const JsonOrderRepository = require('../infrastructure/persistence/JsonOrderRepository');

const GetBalance = require('../usecases/GetBalance');
const ListServices = require('../usecases/ListServices');
const ListCountries = require('../usecases/ListCountries');
const ListOperators = require('../usecases/ListOperators');
const CreateOrder = require('../usecases/CreateOrder');
const CheckOrderStatus = require('../usecases/CheckOrderStatus');
const SetOrderStatus = require('../usecases/SetOrderStatus');
const ListOrderHistory = require('../usecases/ListOrderHistory');

// Kalau provider OTP suatu saat ganti, atau riwayat pindah dari JSON ke SQLite,
// cukup ganti dua baris di bawah ini. Usecase & controller gak perlu disentuh.
const otpGateway = new RumahOtpGateway();
const orderRepository = new JsonOrderRepository();

module.exports = {
  getBalance: new GetBalance(otpGateway),
  listServices: new ListServices(otpGateway),
  listCountries: new ListCountries(otpGateway),
  listOperators: new ListOperators(otpGateway),
  createOrder: new CreateOrder(otpGateway, orderRepository),
  checkOrderStatus: new CheckOrderStatus(otpGateway, orderRepository),
  setOrderStatus: new SetOrderStatus(otpGateway, orderRepository),
  listOrderHistory: new ListOrderHistory(orderRepository),
};
