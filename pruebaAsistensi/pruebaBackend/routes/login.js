const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userController = require('../controllers/userController')
const { validatorLogin } = require('../validations/index')
const config = require('../config')
const {
  SERVER: { JWT_SECRET },
} = config;
const validate = require('../middlewares/validate');
const jwt = require('jsonwebtoken');
const logger = require('morgan');
const { serializeError } = require('serialize-error');

/* POST login */
router.post('/', validatorLogin, validate, async (req, res, next) => {
    try {
        const body = {...req.body};
        let user = await userController.findOne({ email:  body.email });

        if(!user){
            return res.status(404).json({
                success: false,
                error: 'INVALID_CREDENTIAL',
                data: 'Invalid credentials'
            });
        }

        if (user && (await bcrypt.compare(body.password, user.password))) {
            // Create token
            const token = jwt.sign(
              { user: user._id, email: user.email },
              JWT_SECRET,
              {
                expiresIn: "2h",
              }
            );
      
            console.log('user: ', user)
            return res.status(200).json({ email: user.email, token });
        }


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
