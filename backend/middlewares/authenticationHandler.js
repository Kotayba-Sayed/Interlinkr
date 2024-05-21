const { verify } = require('jsonwebtoken');

const authenticationHandler = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = verify(token, 'secretkey');
    req.user = decoded;

    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    } else {
      req.user = decoded;
      next();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const adminAccessHandler = (req, res, next) => {
  if (req.user.username === 'admin') {
    return next();
  }
  next();
};

module.exports = { authenticationHandler, adminAccessHandler };
