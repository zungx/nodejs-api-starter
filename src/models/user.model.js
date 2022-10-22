const db = require('../database/db');

class User {
    constructor(user) {
        this.username = user.username;
        this.password = user.password;
    }
}

User.create = (data) => db.insert('INSERT INTO users SET ?', data);
User.findOne = (username) => db.selectRow(`SELECT * FROM users WHERE username = '${username}'`);
User.findAll = () => db.selectAll(`SELECT * FROM users`);

module.exports = User;
