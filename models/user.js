const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    deletedAt: {
        type: Date,
        required: false,
        default: null
    },
    createdAt: {
        type: Date,
        required: false,
        default: new Date
    }
});

UserSchema.pre('save', function(next) {
    let user = this;
    if (!user.isModified('password')) return next();
    /*
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        const password = String(user.password).trim();
        bcrypt.hash(password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
    */
});

UserSchema.post('save', function (doc, next) {
    doc.password = undefined;
    next();
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    /*
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return callback(err, false);
        }
        if (isMatch) {
            return callback(null, isMatch);
        }
        return callback(new Error('Senha inválida'));
    });
    */
};

const Model = mongoose.model('Users', UserSchema);

module.exports = Model;