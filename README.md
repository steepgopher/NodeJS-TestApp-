# Cleveroad
Cleveroad simple NodeJS server with ExpressJS.

## Instruction

```javascript
npm i
node_modules/.bin/sequelize db:create
npm start
```

## Databases

+-------------------------------------------------------------------+
| PRODUCT                                                           |
+-----------+---------------+------+-----+---------+----------------+
| Field     | Type          | Null | Key | Default | Extra          |
+-----------+---------------+------+-----+---------+----------------+
| id        | int(11)       | NO   | PRI | NULL    | auto_increment |
| image     | char(255)     | YES  |     | NULL    |                |
| title     | varchar(255)  | NO   |     | NULL    |                |
| price     | decimal(10,0) | NO   |     | NULL    |                |
| user_id   | int(11)       | YES  | MUL | NULL    |                |
| createdAt | datetime      | NO   |     | NULL    |                |
| updatedAt | datetime      | NO   |     | NULL    |                |
+-----------+---------------+------+-----+---------+----------------+

+------------------------------------------------------------------+
| PROFILE                                                          |
+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| id        | int(11)      | NO   | PRI | NULL    | auto_increment |
| name      | varchar(255) | NO   |     | NULL    |                |
| phone     | varchar(255) | YES  |     | NULL    |                |
| user_id   | int(11)      | YES  | UNI | NULL    |                |
| createdAt | datetime     | NO   |     | NULL    |                |
| updatedAt | datetime     | NO   |     | NULL    |                |
+-----------+--------------+------+-----+---------+----------------+

+------------------------------------------------------------------+
| USER                                                             |
+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| id        | int(11)      | NO   | PRI | NULL    | auto_increment |
| email     | varchar(255) | NO   | UNI | NULL    |                |
| password  | char(32)     | NO   |     | NULL    |                |
| createdAt | datetime     | NO   |     | NULL    |                |
| updatedAt | datetime     | NO   |     | NULL    |                |
+-----------+--------------+------+-----+---------+----------------+