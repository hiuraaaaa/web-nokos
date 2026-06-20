const RumahOtpGateway = require('../infrastructure/http/RumahOtpGateway');
const TripayGateway = require('../infrastructure/http/TripayGateway');
const SqliteOrderRepository = require('../infrastructure/persistence/SqliteOrderRepository');
const SqliteUserRepository = require('../infrastructure/persistence/SqliteUserRepository');
const SqliteTopupRepository = require('../infrastructure/persistence/SqliteTopupRepository');

const GetBalance = require('../usecases/GetBalance');
const ListServices = require('../usecases/ListServices');
const ListCountries = require('../usecases/ListCountries');
const ListOperators = require('../usecases/ListOperators');
const CreateOrder = require('../usecases/CreateOrder');
const CheckOrderStatus = require('../usecases/CheckOrderStatus');
const SetOrderStatus = require('../usecases/SetOrderStatus');
const ListOrderHistory = require('../usecases/ListOrderHistory');

const RegisterUser = require('../usecases/RegisterUser');
const LoginUser = require('../usecases/LoginUser');
const GetUserById = require('../usecases/GetUserById');
const CreateTopup = require('../usecases/CreateTopup');
const GetTopupHistory = require('../usecases/GetTopupHistory');
const HandleTripayWebhook = require('../usecases/HandleTripayWebhook');
const GetPaymentChannels = require('../usecases/GetPaymentChannels');

// Infrastructure
const otpGateway = new RumahOtpGateway();
const tripayGateway = new TripayGateway();
const orderRepository = new SqliteOrderRepository();
const userRepository = new SqliteUserRepository();
const topupRepository = new SqliteTopupRepository();

module.exports = {
  // Balance — sekarang dari DB user, bukan RumahOTP
  getBalance: new GetBalance(userRepository),

  // Catalog — tetap dari RumahOTP
  listServices: new ListServices(otpGateway),
  listCountries: new ListCountries(otpGateway),
  listOperators: new ListOperators(otpGateway),

  // Order — sekarang ada saldo check + bind ke user
  createOrder: new CreateOrder(otpGateway, orderRepository, userRepository),
  checkOrderStatus: new CheckOrderStatus(otpGateway, orderRepository),
  setOrderStatus: new SetOrderStatus(otpGateway, orderRepository),
  listOrderHistory: new ListOrderHistory(orderRepository),

  // Auth
  registerUser: new RegisterUser(userRepository),
  loginUser: new LoginUser(userRepository),
  getUserById: new GetUserById(userRepository),

  // Topup
  createTopup: new CreateTopup(topupRepository, tripayGateway, userRepository),
  getTopupHistory: new GetTopupHistory(topupRepository),
  handleTripayWebhook: new HandleTripayWebhook(topupRepository, userRepository, tripayGateway),
  getPaymentChannels: new GetPaymentChannels(tripayGateway),
};
