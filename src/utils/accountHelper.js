'use strict';

const crypto = require('crypto'),
      _      = require('lodash');

class AccountHelper {

    constructor() {
        this._profile   = {};
        this._user      = {};
    }

    get profile() {
        return _.pickBy(this._profile, _.identity);
    }

    set profile(data) {
        this._profile = data;
    }

    get user() {
        return _.pickBy(this._user, _.identity);
    }

    set user(data) {
        this._user = data;
    }

    generateMd5(value) {
        if (value) {
            return crypto.createHash('md5').update(value).digest("hex");
        } else {
            return null;
        }
    }

}

module.exports = AccountHelper;
