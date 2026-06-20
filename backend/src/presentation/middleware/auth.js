const jwt = require('jsonwebtoken');
const env = require('../../config/env');

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Token tidak ada' });
  }

  const token = header.slice(7);
  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = decoded; // { id, username, role }
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Token tidak valid atau expired' });
  }
}

module.exports = authMiddleware;
