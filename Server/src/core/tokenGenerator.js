const jwt = require('jwt');

function TokenGenerator (secret, options) {
  this.secret = secret;
  this.options = options; //algorithm + keyid + noTimestamp + expiresIn + notBefore
}

TokenGenerator.prototype.sign = function(payload) {
  return jwt.sign(payload, this.secret, this.options);
}

// refreshOptions.verify = options you would use with verify function
// refreshOptions.jwtid = contains the id for the new token
TokenGenerator.prototype.refresh = function(token, refreshOptions) {
  const payload = jwt.verify(token, this.secret, refreshOptions.verify);
  delete payload.iat;
  delete payload.exp;
  delete payload.nbf;
  delete payload.jti; //We are generating a new token, if you are using jwtid during signing, pass it in refreshOptions
  const jwtSignOptions = Object.assign({ }, this.options, { jwtid: refreshOptions.jwtid });
  // The first signing converted all needed options into claims, they are already in the payload
  return jwt.sign(payload, this.secret, jwtSignOptions);
}

module.exports = TokenGenerator;
