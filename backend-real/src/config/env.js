require('dotenv').config();

const env = {
  port: process.env.PORT || 4000,

  // RumahOTP
  rumahOtpApiKey: process.env.RUMAHOTP_API_KEY || '',
  rumahOtpBaseUrl: process.env.RUMAHOTP_BASE_URL || 'https://www.rumahotp.io/api',

  // SQLite
  dbPath: process.env.DB_PATH || './data/nokos.db',

  // JWT
  jwtSecret: process.env.JWT_SECRET || 'ganti-ini-di-production',

  // Tripay
  tripayApiKey: process.env.TRIPAY_API_KEY || '',
  tripayPrivateKey: process.env.TRIPAY_PRIVATE_KEY || '',
  tripayMerchantCode: process.env.TRIPAY_MERCHANT_CODE || '',
  tripayBaseUrl: process.env.TRIPAY_BASE_URL || 'https://tripay.co.id/api-sandbox',
  tripayReturnUrl: process.env.TRIPAY_RETURN_URL || 'http://localhost:5173/topup/callback',
};

if (!env.rumahOtpApiKey) {
  console.warn('[config] RUMAHOTP_API_KEY belum diisi');
}
if (!env.tripayApiKey) {
  console.warn('[config] TRIPAY_API_KEY belum diisi');
}

module.exports = env;
