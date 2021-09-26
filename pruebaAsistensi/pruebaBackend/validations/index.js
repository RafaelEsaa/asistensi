const { check, param } = require('express-validator');

const validatorUserCreate = [
    check('fullName').exists().isString(),
    check('email').exists().isEmail().normalizeEmail(),
    check('password').exists().isString()
];

const validatorUserUpdate = [
    check('_id').exists(),
    check('fullName').exists().isString(),
    check('email').exists().isEmail().normalizeEmail(),
    check('password').exists().isString()
];

const validatorParamId = [param('Id').exists()];

const validatorLogin = [
    check('email').exists().isEmail().normalizeEmail({ gmail_remove_dots: false }),
    check('password').exists().isString()
];

module.exports = {
    validatorUserCreate,
    validatorUserUpdate,
    validatorParamId,
    validatorLogin
};
