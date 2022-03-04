

module.exports.createExpressCrud = (
    send, 
    ModelRepository, 
    codes = { create: 1000, update: 1001, get: 1002, delete: 1003 }
) => {
    return {
        fetch: async (req, res) => {
            try {
                const { id } = req.params;
                const response = await ModelRepository.fetch(id);
                if (response)
                    return send(req, res, codes.get, response); 
                return send(req, res, 404, response); 
            } catch (error) {
                console.error(error);
                if (error.responseCode)
                    return send(req, res, error.responseCode, { error: error.message }); 
                return send(req, res, 500, { error: error.message }); 
            }
        },
        list: async (req, res)  => {
            try {
                const { page, size } = req.query;
                const pageSize = Number(size) > 50 ? 50 : size;
                const list = await ModelRepository.list(page, pageSize);
                const total = await ModelRepository.count();
                return send(req, res, codes.get, { list, total }); 
            } catch (error) {
                console.error(error);
                return send(req, res, 500, { error: error.message }); 
            }
        },
        create: async (req, res) => {
            try {
                const { body } = req;
                const response = await ModelRepository.create(body);
                return send(req, res, codes.create, response); 
            } catch (error) {
                console.error(error);
                if (error.responseCode)
                    return send(req, res, error.responseCode, { error: error.message }); 
                return send(req, res, 500, { error: error.message }); 
            }
        },
        update: async (req, res) => {
            try {
                const { body, params: { id } } = req;
                const response = await ModelRepository.update(id, body);
                return send(req, res, codes.update, response); 
            } catch (error) {
                console.error(error);
                if (error.responseCode)
                    return send(req, res, error.responseCode, { error: error.message }); 
                return send(req, res, 500, { error: error.message }); 
            }
        },
        delete: async (req, res) => {
            try {
                const { id } = req.params;
                const response = await ModelRepository.delete(id);
                return send(req, res, codes.delete, response); 
            } catch (error) {
                console.error(error);
                if (error.responseCode)
                    return send(req, res, error.responseCode, { error: error.message }); 
                return send(req, res, 500, { error: error.message }); 
            }
        },
        count: async (req, res)  => {
            try {
                const total = await ModelRepository.count();
                return send(req, res, codes.get, { total }); 
            } catch (error) {
                console.error(error);
                return send(req, res, 500, { error: error.message }); 
            }
        },

    }
};

module.exports.createRepository = (Model) => {
    return {
        fetch: async (id) => {
            return await Model.findById(id).lean();
        },
        list: async (page, size) => {
            return await Model.find().lean().skip(page * size).limit(size);
        },
        create: async (data) => {
            const obj = new Model(data);
            return await obj.save();
        },
        update: async (id, data) => {
            let obj = await Model.findById(id);
            if (!obj) throw ({ responseCode: 404, message: id + " not found" });
            obj.set(data);
            return await obj.save();
        },
        delete: async (id) => {
            const obj = await Model.findById(id);
            if (!obj) throw ({ responseCode: 404, message: id + " not found" });
            obj.deletedAt = new Date();
            return await obj.save();
        },
        count: async () => {
            return await Model.countDocuments().lean();
        },
    }
};