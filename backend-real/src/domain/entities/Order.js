/**
 * Entity Order - representasi pesanan nomor OTP.
 * Selalu dibuat lewat factory ini supaya bentuknya konsisten di semua layer,
 * walau sumber datanya beda-beda (create vs check vs riwayat).
 */
function createOrder({
  orderId,
  phoneNumber,
  service,
  country,
  operator = null,
  price = null,
  priceFormatted = null,
  status = 'pending', // pending | received | completed | canceled | expiring | expired
  otpCode = null,
  otpMessage = null,
  createdAt = Date.now(),
  expiredAt = null,
}) {
  return {
    orderId,
    phoneNumber,
    service,
    country,
    operator,
    price,
    priceFormatted,
    status,
    otpCode,
    otpMessage,
    createdAt,
    expiredAt,
  };
}

module.exports = { createOrder };
