/**
 * Entity Balance - representasi saldo akun RumahOTP.
 */
function createBalance({ amount, formatted, username, firstName, lastName, email }) {
  return { amount, formatted, username, firstName, lastName, email };
}

module.exports = { createBalance };
