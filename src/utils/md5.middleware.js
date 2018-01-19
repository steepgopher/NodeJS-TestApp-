'use strict';

const crypto = require('crypto'),
      AccountHelper = require('./accountHelper');

module.exports = {
    generatePassword: (req, res, next) => {
        const password = req.body.password;
        if (password) {
            let accountHelper = new AccountHelper();
            req.body.password = accountHelper.generateMd5(password);
        }
        next();
    }
};