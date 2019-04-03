const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * Schema
 */
const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    hash_password: String,
    salt: String
});

/**
 * Virtual property
 */
userSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.saltGenerator();
        this.hash_password = this.encrypt();
    })
    .get(function () {
        return this._password;
    });


userSchema.methods = {

    /**
     * Check if passwords from user and database are equals
     *
     * @param password
     * @returns {boolean}
     */
    checkPassword: function(password) {
        return this.encryptPassword(password) === this.hash_password;
    },

    /**
     * Generate random string
     *
     * @returns {string}
     */
    saltGenerator: function () {
        return crypto.randomBytes(10).toString('hex');
    },

    /**
     * Encrypt password with sha1 algorithm
     *
     * @param password
     * @returns {string}
     */
    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');

        } catch (err) {
            return '';
        }
    }
};

mongoose.model('User', userSchema);
