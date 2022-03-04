const service = require("services/user.service");
const { createResponder } = require("utils/responder");
const { createExpressCrud } = require("utils/factories");
const UserRepository = require("repositories/user.repository");

const UserReponder = createResponder('Usuário');
const crud = createExpressCrud(UserReponder.send, UserRepository);
const jwt = require('utils/jwt');

module.exports = crud;

module.exports.auth = async (req, res) => {
    try {
        const user = await UserRepository.getAuthByEmailAndPws(req.body.email, req.body.password);
        if (!user) throw new Error('Email ou senha inválidos');

        return UserReponder.send(req, res, 200, {
            token: jwt.encode(user)
        }); 
    } catch(error) {
        console.error(error);
        if (error.responseCode)
            return UserReponder.send(req, res, error.responseCode, { error: error.message }); 
        return UserReponder.send(req, res, 500, { error: error.message }); 
    }
}
