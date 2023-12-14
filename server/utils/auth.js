const jwt = require('jsonwebtoken');

// Token secret
const secret = 'mydirtylittlesecret';
// Token expiration time
const expiration = '3h';

module.exports = {
    // Function for authenticated routes
    authMiddleware: function (req, res, next) {
      // Allows token to be sent via  req.query or headers
      let token = req.query.token || req.headers.authorization;
  
      if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
      }
  
      if (!token) {
        return res.status(400).json({ message: 'You have no token!' });
      }
  
      // Verify Token
      // Get user credentials
      try {
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        req.user = data;
      } catch {
        console.log('Invalid token');
        return res.status(400).json({ message: 'invalid token!' });
      }
  
      // send to next endpoint
      next();
    },
    signToken: function ({ username, email, _id }) {
      const payload = { username, email, _id };
  
      return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
  };