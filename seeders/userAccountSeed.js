'use strict';

module.exports = (db) => {
    return db.User.create({
        email: 'andrew@mail.com',
        password: 'e10adc3949ba59abbe56e057f20f883e'
    }).then(user => {
        return db.Profile.create({
            user_id: user.id,
            phone: '+380431242356',
            name: 'Andrew'
        }).catch(e => console.log(e));
    }).catch(e => console.log(e));
};