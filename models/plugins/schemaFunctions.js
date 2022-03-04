module.exports = function modifiers(schema, options) {
    schema.pre(['find', 'findOne'], function (next) {
        if (!this.getQuery().deletedAt)
            this.where({ deletedAt: null });
        next();
    });

    schema.statics.findDeleted = function (query) {
        if (!query)
            query = {};
        query.deletedAt = { $ne: null };
        return this.find(query);
    };
};