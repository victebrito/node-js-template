const UserModel = require("models/user");
const { ObjectId } = require("mongoose").Types;
const { createRepository } =  require("utils/factories");

module.exports = createRepository(UserModel);


module.exports.getAuthByEmailAndPws = async (email, password) => {
    const user = await UserModel.findOne({
        email: email
    }).select(['_id', 'email', 'password', 'name']).exec()
    if (!user)
        throw new Error('Nenhum usuário encontrado')

    password = String(password).trim();
    return new Promise((resolve, reject) => {
        user.comparePassword(password, (err, result) => {
            if (err) {
                console.error(err);
                return reject({ responseCode: 401, message: 'Senha inválida' });
            }
            if (result) {
                user.password = undefined;
                return resolve(user.toObject());
            }
        })
    });
}
