const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        fullName: {
            type: String,
            required: true
        }
    }
);

UserSchema.pre('save', async function (next) {
    const user = this;
    if (!this.isPasswordEncripted) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
    }
    this.set('isPasswordEncripted', undefined);
    next();
});

UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    // Hashes the password sent by the user for login and checks if the hashed password stored in the
    // database matches the one sent. Returns true if it does else false.
    const compare = await bcrypt.compare(password, user.password);
    return compare;
};

module.exports = mongoose.model('user', UserSchema);
