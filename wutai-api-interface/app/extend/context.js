const crypto = require('crypto');
module.exports = {
  setPassword(password) {
    const Signture = crypto.createHmac('sha1', 'hutshop'); // SecrectKey 秘钥
    Signture.update(password);
    const d = Signture.digest('hex');
    return d.toString();
  },
};
