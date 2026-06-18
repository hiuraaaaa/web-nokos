require('dotenv').config();

const env = {
  port: process.env.PORT || 4000,
  rumahOtpApiKey: process.env.RUMAHOTP_API_KEY || '',
  rumahOtpBaseUrl: process.env.RUMAHOTP_BASE_URL || 'https://www.rumahotp.io/api',
  dbPath: process.env.DB_PATH || './data/orders.json',
};

if (!env.rumahOtpApiKey) {
  // eslint-disable-next-line no-console
  console.warn('[config] RUMAHOTP_API_KEY belum diisi di .env, request ke RumahOTP bakal ditolak.');
}

module.exports = env;
