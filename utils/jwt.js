const jwt = require('jwt-simple');
const { auth: { JWT_SECRET, JWT_SESSION, EXP_MILLIS, JWT_API }  } = require("config/index");
 
// HS256 secrets are typically 128-bit random strings, for example hex-encoded:
 
// encode
module.exports.encode = (payload) => {
    payload.expiresIn = new Date().getTime() + Number(EXP_MILLIS);
    return jwt.encode(payload, JWT_SECRET);
}
 
// decode
module.exports.decode = (token) => {
    const data = jwt.decode(token, JWT_SECRET);
    if (!data.expiresIn)
        throw new Error('Auth error');

    if (data.expiresIn < new Date().getTime())
        throw new Error('Expired token');

    return data;
}

module.exports.encodeAPI = (payload) => {
    return jwt.encode(payload, JWT_API);
}

module.exports.decodeAPI = (token) => {
    return jwt.decode(token, JWT_API);
}

module.exports.authenticateJWT = (req, res, next) => {
    try {
        if (!req.headers || !req.headers['authorization'])
            throw new Error('Bearer authorization not found');

        const token = req.headers['authorization'].split(' ')[1];
        const payload = this.decode(token);
        req.user = payload;
        return next();
    } catch(error) {
        res.status(401);
        res.send({ error: error.message });
    }
}

module.exports.authenticateAPI = (req, res, next) => {
    try {
        if (!req.headers || !req.headers['authorization'])
            throw new Error('Bearer authorization not found');

        const token = req.headers['authorization'].split(' ')[1];
        const payload = this.decodeAPI(token);
        req.user = payload;
        return next();
    } catch(error) {
        res.status(401);
        res.send({ error: error.message });
    }
}
