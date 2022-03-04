const CODES = {
    401: {
        message: {
            pt: "Não autorizado",
        },
        httpStatus: 401,
    },
    403: {
        message: {
            pt: "Proibido",
        },
        httpStatus: 403,
    },
    200: {
        message: {
            pt: "Sucesso",
        },
        httpStatus: 200,
    },
    404: {
        message: {
            pt: "Não encontrado.",
        },
        httpStatus: 404,
    },
    500: {
        message: {
            pt: "Ocorreu um erro inesperado.",
        },
        httpStatus: 500,
    },
    1000: {
        message: {
            pt: `Criado com sucesso!`,
        },
        httpStatus: 200,
    },
    1001: {
        message: {
            pt: `Atualizado com sucesso!`,
        },
        httpStatus: 200,
    },
    1002: {
        message: {
            pt: `Encontrado com sucesso!`,
        },
        httpStatus: 200,
    },
    1003: {
        message: {
            pt: `Removido com sucesso!`,
        },
        httpStatus: 200,
    },
};


module.exports.createResponder = (ResourceName) => {
    return {
        /**
         *
         * @param {object} req express req object
         * @param {object} res express res object
         * @param {number} code code
         * @param {object} body response body
         * @param {object} headers key value headers
         */
        send(req, res, code, body, headers) {
            try {
                if (!code) code = 200;

                const lang = 'pt';
                res.append("Content-Type", "application/json; charset=UTF-8");
                if (headers) {
                    for (const key in headers) {
                        res.append(key, headers[key]);
                    }
                }
                if (CODES[String(code)]) {
                    res.status(CODES[code].httpStatus);
                    if (body)
                        return res.send({
                            code,
                            body,
                            message: `${CODES[code].message[lang]}`,
                        });
                    return res.send({
                        code,
                        message: `${CODES[code].message[lang]}`,
                    });
                }
                return res.status(code).send({ code });
            } catch (err) {
                console.error(err);
                res.status(500);
                return res.send({ code: 500, message: "Erro ao responder" });
            }
        }
    }
};
