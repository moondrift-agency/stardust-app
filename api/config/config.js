require('dotenv').config();
module.exports = {
    "development": {
        "username": process.env.BDD_USERNAME,
        "password": process.env.BDD_PASSWORD,
        "database": "database_development",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "test": {
        "username": process.env.BDD_USERNAME,
        "password": process.env.BDD_PASSWORD,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": process.env.BDD_USERNAME,
        "password": process.env.BDD_PASSWORD,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
};