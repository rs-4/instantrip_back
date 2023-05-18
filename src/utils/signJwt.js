var jwt = require('jsonwebtoken');

const signJwt = (body) => {
  
  return jwt.sign({
    body
  }, process.env.JWT_SECRET);
    
}

module.exports = signJwt;