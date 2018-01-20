'use strict';

module.exports = (db) => {
    return db.Product.create({
        user_id: 1,
        title:   'Book',
        price:   100
    }).catch(e => console.log(e));
};