const service = require("services/service");
const { createResponder } = require("utils/responder");
const APIReponder = createResponder('API');


module.exports.dummy = async (req, res) => {
    try {

        const response = await service.get(req.params.email);

        return APIReponder.send(req, res, 200, response); 
    } catch(error) {
        console.error(error);
        if (error.response && error.response.status)
            return APIReponder.send(req, res, error.response.status, { error: error.response.statusText }); 

        if (error.responseCode)
            return APIReponder.send(req, res, error.responseCode, { error: error.message }); 
        return APIReponder.send(req, res, 500, { error: error.message }); 
    }
}
