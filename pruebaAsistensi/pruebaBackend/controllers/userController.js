const User = require('../models/userModel');

const create = async (data) => {
    const newUser = new User(data);
    return newUser.save();
};

const getAllLean = async (criteria = {}) => {
    return User.find(criteria).lean();
};

const findOne = async (criteria = {}) => {
    return User.findOne(criteria, (error, item) => {
        if (error) return error;
        return item;
    });
};

const findOneByEmail = async (criteria = {}) => {
    return User.findOne(criteria, (error, item) => {
        if (error) return error;
        return item;
    });
};

const update = async (user) => {
    return user.save();
};

const findOneAndUpdate = async (criteria = {}, values = {}) => {
    return User.findOneAndUpdate(criteria, values, { new: true }, (error, item) => {
        if (error) return error;
        return item;
    });
};

const remove = async (criteria = {}) => {
    return User.deleteOne(criteria, function (error) {
        if (error) return error;
        return true;
    });
};

module.exports = {
    create,
    getAllLean,
    findOne,
    findOneByEmail,
    update,
    findOneAndUpdate,
    remove,
}; ;
