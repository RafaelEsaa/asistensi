const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const { validatorUserCreate, validatorUserUpdate, validatorParamId } = require('../validations/index')
const config = require('../config')
const {
  SERVER: { JWT_SECRET },
} = config;
const validate = require('../middlewares/validate');
const jwt = require('jsonwebtoken');
const logger = require('morgan');
const { serializeError } = require('serialize-error');
const { verifyToken } = require('../middlewares/validateToken')

/* GET users listing. */
router.get('/', verifyToken, async (req, res, next) => {
    try {
        const users = await userController.getAllLean();

        if (!users) {
            return res.status(404).json({
                success: false,
                error: 'NOT_FOUND',
                data: 'User not found'
            });
        }

        res.status(200).send(users)
    } catch (error) {
        logger(serializeError(error));
        res.status(500).send({
            success: false,
            error: 'BAD_REQUEST',
            data: error.message
        }); 
    }
});

/* POST create user. */
router.post('/create', verifyToken, validatorUserCreate, validate, async (req, res) => {
    try {
        const user = { ...req.body };
        console.log('req.body: ', user)
        const users = await userController.findOne({ email: user.email });

        if (users) {
            return res.status(404).json({
                success: false,
                error: 'NOT_FOUND',
                data: 'User is already exist'
            });
        }

        const token = jwt.sign(
            { user },
            JWT_SECRET,
            {
              expiresIn: "2h",
            }
        );

        const newUser = await userController.create(user);
        newUser.token
        res.status(200).send(newUser);
    } catch (error) {
        // logger(serializeError(error));
        res.status(500).send({
            success: false,
            error: 'BAD_REQUEST',
            data: error.message
        });
    }
});

/* UPDATE create user. */
router.put('/update', verifyToken, validatorUserUpdate, validate, async (req, res, next) => {
    try {
        const user = { ...req.body };
        const updateUser = await userController.findOneAndUpdate({ email: user.email }, user);

        if (!updateUser) {
            return res.status(404).json({
                success: false,
                error: 'NOT_FOUND',
                data: 'User not found'
            });
        }

        res.status(200).send(updateUser);
    } catch (error) {
        logger(serializeError(error));
        res.status(500).send({
            success: false,
            error: 'BAD_REQUEST',
            data: error.message
        });
    }
});

/* DELETE create user. */
router.delete('/delete:Id', verifyToken, validatorParamId, validate, async (req, res, next) => {
    try {
        const body = { Id } = req.body.params;
        const deleteUser = await userController.remove({ _id: body.Id });

        if (!users) {
            return res.status(404).json({
                success: false,
                error: 'NOT_FOUND',
                data: 'User not found'
            });
        }

        res.status(200).send(deleteUser);
    } catch (error) {
        logger(serializeError(error));
        res.status(500).send({
            success: false,
            error: 'BAD_REQUEST',
            data: error.message
        });
    }
});

module.exports = router;
